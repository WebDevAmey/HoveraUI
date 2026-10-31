"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./stack-toast.module.css";

export type ToastTone = "neutral" | "success";

export type ToastOptions = {
  description?: ReactNode;
  tone?: ToastTone;
  /** One inline action, such as Undo. Running it dismisses the toast. */
  action?: { label: string; onClick: () => void };
  /** Milliseconds before it leaves on its own. Infinity keeps it until dismissed. */
  duration?: number;
};

type ToastRecord = ToastOptions & {
  id: number;
  title: ReactNode;
  leaving?: "up" | "left" | "right";
};

export type ToasterStore = {
  toast: (title: ReactNode, options?: ToastOptions) => number;
  dismiss: (id: number, direction?: "up" | "left" | "right") => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => ToastRecord[];
};

const MAX = 6;
const EXIT_MS = 260;
const EMPTY: ToastRecord[] = [];

/** Creates an isolated toast store. Each Toaster reads from one. */
export function createToaster(): ToasterStore {
  let toasts: ToastRecord[] = [];
  let nextId = 1;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());

  const dismiss: ToasterStore["dismiss"] = (id, direction = "up") => {
    if (!toasts.some((t) => t.id === id && !t.leaving)) return;
    toasts = toasts.map((t) => (t.id === id ? { ...t, leaving: direction } : t));
    emit();
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
      emit();
    }, EXIT_MS);
  };

  return {
    toast(title, options = {}) {
      const id = nextId++;
      toasts = [{ id, title, ...options }, ...toasts];
      const live = toasts.filter((t) => !t.leaving);
      if (live.length > MAX) dismiss(live[live.length - 1].id);
      emit();
      return id;
    },
    dismiss,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => toasts,
  };
}

const defaultStore = createToaster();

/** Fires a toast on the default store, shown by any `<Toaster />` without a `toaster` prop. */
export const toast = defaultStore.toast;

/** A store owned by one component, so two toasters on a page never share toasts. */
export function useToaster() {
  const [store] = useState(createToaster);
  return store;
}

export type ToasterProps = HTMLAttributes<HTMLElement> & {
  /** Store to read from. Defaults to the shared store behind `toast()`. */
  toaster?: ToasterStore;
  position?: "bottom-right" | "bottom-center" | "bottom-left";
  /** Position inside the nearest positioned ancestor instead of the viewport. */
  contained?: boolean;
  /** How many cards stay visible in the collapsed stack. */
  visible?: number;
  label?: string;
};

const PEEK = 10;
const GAP = 8;
const FALLBACK_HEIGHT = 56;

/** A glass toast stack: newest in front, older cards recede behind it and fan out on hover or focus. */
export function Toaster({
  toaster = defaultStore,
  position = "bottom-right",
  contained = false,
  visible = 3,
  label = "Notifications",
  className,
  ...props
}: ToasterProps) {
  const toasts = useSyncExternalStore(toaster.subscribe, toaster.getSnapshot, () => EMPTY);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      observer.current?.disconnect();
    };
  }, []);

  const measure = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    observer.current ??= new ResizeObserver((entries) => {
      setHeights((previous) => {
        let next = previous;
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const id = Number(el.dataset.id);
          const height = el.offsetHeight;
          if (previous[id] !== height) next = { ...next, [id]: height };
        }
        return next;
      });
    });
    observer.current.observe(node);
    return () => observer.current?.unobserve(node);
  }, []);

  const live = toasts.filter((t) => !t.leaving);
  const expanded = (hovered || focused) && live.length > 0;
  const heightOf = (id: number) => heights[id] ?? FALLBACK_HEIGHT;
  const front = live[0] ? heightOf(live[0].id) : 0;

  const layout = (index: number, list: ToastRecord[]) => {
    if (expanded) {
      let y = 0;
      for (let j = 0; j < index; j++) y += heightOf(list[j].id) + GAP;
      return { y: -y, scale: 1, clip: 0 };
    }
    // Collapsed: each older card shows a slab the height of the front card, peeking above it.
    const h = heightOf(list[index].id);
    const scale = 1 - index * 0.05;
    return {
      y: -(front - Math.min(h, front) * scale) - index * PEEK,
      scale,
      clip: Math.max(0, h - front),
    };
  };

  const stackHeight = expanded
    ? live.reduce((sum, t, i) => sum + heightOf(t.id) + (i ? GAP : 0), 0)
    : front + PEEK * Math.max(0, Math.min(live.length, visible) - 1);

  return (
    <section
      aria-label={label}
      className={cn(styles.region, className)}
      data-position={position}
      data-contained={contained || undefined}
      data-expanded={expanded || undefined}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && live[0]) toaster.dismiss(live[0].id);
      }}
      {...props}
    >
      <div className={styles.stack} style={{ height: stackHeight }}>
        {toasts.map((record) => {
          const list = record.leaving ? toasts : live;
          const index = list.indexOf(record);
          const { y, scale, clip } = layout(index, list);
          return (
            <ToastCard
              key={record.id}
              record={record}
              index={index}
              hiddenBehind={!expanded && index >= visible}
              front={index === 0 || expanded}
              paused={expanded || pageHidden}
              onDismiss={toaster.dismiss}
              measure={measure}
              style={
                {
                  "--y": `${y}px`,
                  "--s": scale,
                  "--clip": `${clip}px`,
                  zIndex: 100 - index,
                } as CSSProperties
              }
            />
          );
        })}
      </div>
    </section>
  );
}

type ToastCardProps = {
  record: ToastRecord;
  index: number;
  hiddenBehind: boolean;
  front: boolean;
  paused: boolean;
  onDismiss: ToasterStore["dismiss"];
  measure: (node: HTMLElement | null) => (() => void) | undefined;
  style: CSSProperties;
};

function ToastCard({ record, hiddenBehind, front, paused, onDismiss, measure, style }: ToastCardProps) {
  const { id, title, description, tone = "neutral", action, duration = 5000, leaving } = record;
  const remaining = useRef(duration);
  const drag = useRef<{ x: number; pointer: number } | null>(null);

  useEffect(() => {
    if (paused || leaving || !Number.isFinite(duration)) return;
    const started = Date.now();
    const timer = setTimeout(() => onDismiss(id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [paused, leaving, duration, id, onDismiss]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    drag.current = { x: event.clientX, pointer: event.pointerId };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = "";
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointer !== event.pointerId) return;
    event.currentTarget.style.setProperty("--dx", `${event.clientX - drag.current.x}px`);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointer !== event.pointerId) return;
    const dx = event.clientX - drag.current.x;
    drag.current = null;
    delete event.currentTarget.dataset.dragging;
    if (Math.abs(dx) > 72) onDismiss(id, dx > 0 ? "right" : "left");
    else event.currentTarget.style.setProperty("--dx", "0px");
  };

  return (
    <div
      ref={measure}
      data-id={id}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={styles.toast}
      data-tone={tone}
      data-front={front || undefined}
      data-behind={hiddenBehind || undefined}
      data-leaving={leaving}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className={styles.body}>
        {tone === "success" ? <span className={styles.dot} aria-hidden="true" /> : null}
        <div className={styles.text}>
          <p className={styles.title}>{title}</p>
          {description ? <p className={styles.description}>{description}</p> : null}
        </div>
        {action ? (
          <button
            type="button"
            className={styles.action}
            tabIndex={front ? 0 : -1}
            onClick={() => {
              action.onClick();
              onDismiss(id);
            }}
          >
            {action.label}
          </button>
        ) : null}
        <button
          type="button"
          className={styles.close}
          aria-label="Dismiss notification"
          tabIndex={front ? 0 : -1}
          onClick={() => onDismiss(id)}
        >
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
