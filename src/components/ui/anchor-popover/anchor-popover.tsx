"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./anchor-popover.module.css";

type Active = { id: string; heading?: ReactNode; tip: ReactNode };

type PopoverContextValue = {
  popoverId: string;
  activeId: string | null;
  show: (active: Active, anchor: HTMLElement) => void;
  hide: (delay?: number) => void;
  cancelHide: () => void;
  toggle: (active: Active, anchor: HTMLElement) => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

const GAP = 10;
const EDGE = 8;
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export type AnchorPopoverProps = HTMLAttributes<HTMLDivElement> & {
  /** Popover width in px. Used to keep it inside the container. */
  width?: number;
};

/**
 * One popover shared by every AnchorTerm inside it. Moving between terms glides the card
 * and slides its arrow along the edge instead of closing and reopening.
 */
export function AnchorPopover({ width = 240, className, style, children, ...props }: AnchorPopoverProps) {
  const popoverId = useId();
  const [active, setActive] = useState<Active | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const wasOpen = useRef(false);

  const cancelHide = useCallback(() => window.clearTimeout(hideTimer.current), []);
  const hide = useCallback(
    (delay = 0) => {
      cancelHide();
      if (delay === 0) setActive(null);
      else hideTimer.current = window.setTimeout(() => setActive(null), delay);
    },
    [cancelHide],
  );
  const show = useCallback(
    (next: Active, anchor: HTMLElement) => {
      cancelHide();
      anchorRef.current = anchor;
      setActive(next);
    },
    [cancelHide],
  );
  const toggle = useCallback(
    (next: Active, anchor: HTMLElement) => {
      cancelHide();
      anchorRef.current = anchor;
      setActive((current) => (current?.id === next.id ? null : next));
    },
    [cancelHide],
  );

  // Picks a side and, where CSS anchor positioning is missing, computes the position itself.
  const place = useCallback(() => {
    const root = rootRef.current;
    const pop = popRef.current;
    const anchor = anchorRef.current;
    if (!root || !pop || !anchor) return;
    const rootBox = root.getBoundingClientRect();
    const box = anchor.getBoundingClientRect();
    const popHeight = pop.offsetHeight;
    const side = box.top - popHeight - GAP < EDGE ? "bottom" : "top";
    root.dataset.side = side;
    root.style.setProperty("--ap-anchor", anchor.style.getPropertyValue("--ap-name"));

    if (CSS.supports("anchor-name: --a")) return;
    const popWidth = pop.offsetWidth;
    const center = box.left + box.width / 2 - rootBox.left;
    const x = Math.min(Math.max(center - popWidth / 2, EDGE), rootBox.width - popWidth - EDGE);
    const y = side === "top" ? box.top - rootBox.top - popHeight - GAP : box.bottom - rootBox.top + GAP;
    root.style.setProperty("--ap-x", `${x}px`);
    root.style.setProperty("--ap-y", `${y}px`);
    root.style.setProperty("--ap-ax", `${Math.min(Math.max(center, x + 24), x + popWidth - 24)}px`);
    root.style.setProperty("--ap-ay", `${side === "top" ? y + popHeight : y}px`);
  }, []);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !active) {
      wasOpen.current = false;
      return;
    }
    // Opening from closed jumps into place; only moves between anchors glide.
    if (!wasOpen.current) {
      root.dataset.instant = "";
      place();
      requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.instant));
    } else {
      place();
    }
    wasOpen.current = true;
  }, [active, place]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) hide();
    };
    const onResize = () => place();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true, capture: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, { capture: true });
    };
  }, [active, hide, place]);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  const context = useMemo<PopoverContextValue>(
    () => ({ popoverId, activeId: active?.id ?? null, show, hide, cancelHide, toggle }),
    [popoverId, active, show, hide, cancelHide, toggle],
  );

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      data-open={active ? "" : undefined}
      style={{ ...style, "--ap-width": `${width}px` } as CSSProperties}
      {...props}
    >
      <PopoverContext value={context}>{children}</PopoverContext>
      <div
        ref={popRef}
        id={popoverId}
        role="tooltip"
        className={styles.popover}
        aria-hidden={!active}
        onPointerEnter={cancelHide}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") hide(160);
        }}
      >
        {active ? (
          <div key={active.id} className={styles.content}>
            {active.heading ? <p className={styles.heading}>{active.heading}</p> : null}
            <div className={styles.tip}>{active.tip}</div>
          </div>
        ) : null}
      </div>
      <span className={styles.arrow} aria-hidden="true" />
    </div>
  );
}

export type AnchorTermProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** What the popover says about this term. */
  tip: ReactNode;
  /** Optional title shown above the tip in italic serif. */
  heading?: ReactNode;
};

/** An inline trigger inside AnchorPopover. Hover, focus or tap shows the shared popover here. */
export function AnchorTerm({
  tip,
  heading,
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onFocus,
  onBlur,
  onClick,
  ...props
}: AnchorTermProps) {
  const context = use(PopoverContext);
  if (!context) throw new Error("AnchorTerm must be used inside AnchorPopover");
  const id = useId();
  const name = `--ap-${id.replace(/[^a-zA-Z0-9]/g, "")}`;
  const pointerType = useRef("mouse");
  const active = context.activeId === id;
  const payload = { id, heading, tip };

  return (
    <button
      type="button"
      className={cn(styles.term, className)}
      data-active={active || undefined}
      aria-describedby={active ? context.popoverId : undefined}
      style={{ ...style, "--ap-name": name } as CSSProperties}
      onPointerDown={(event) => {
        pointerType.current = event.pointerType;
        onPointerDown?.(event);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") context.show(payload, event.currentTarget);
        onPointerEnter?.(event);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") context.hide(160);
        onPointerLeave?.(event);
      }}
      onFocus={(event) => {
        if (event.currentTarget.matches(":focus-visible")) context.show(payload, event.currentTarget);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        context.hide(120);
        onBlur?.(event);
      }}
      onClick={(event) => {
        if (pointerType.current === "mouse") context.show(payload, event.currentTarget);
        else context.toggle(payload, event.currentTarget);
        pointerType.current = "mouse";
        onClick?.(event);
      }}
      {...props}
    />
  );
}
