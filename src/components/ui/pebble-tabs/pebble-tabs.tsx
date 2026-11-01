"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./pebble-tabs.module.css";

export type PebbleTab = { value: string; label: ReactNode; content?: ReactNode };

export type PebbleTabsProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  tabs: PebbleTab[];
  /** Accessible name for the tab list. */
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "sm" | "md";
  /** Spring stiffness of the pill. Higher is snappier. */
  stiffness?: number;
  /** Spring damping of the pill. Higher settles with less overshoot. */
  damping?: number;
};

type Span = { left: number; right: number };
type Edge = { pos: number; vel: number; to: number };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Segmented tabs in a soft inset track. The raised pill rides a spring on both edges,
 * so it can be redirected mid-flight without a jolt, and every label is inked by how
 * much of the pill is over it, so text colour and pill move as one.
 */
export function PebbleTabs({
  tabs,
  label,
  value,
  defaultValue,
  onValueChange,
  size = "md",
  stiffness = 420,
  damping = 34,
  className,
  ...props
}: PebbleTabsProps) {
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.value);
  const active = value ?? inner;
  const index = Math.max(
    0,
    tabs.findIndex((tab) => tab.value === active),
  );
  const id = useId();

  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const spans = useRef<Span[]>([]);
  const edges = useRef<{ l: Edge; r: Edge } | null>(null);
  const frame = useRef<number | null>(null);
  const last = useRef(0);
  const reduced = useRef(false);
  const indexRef = useRef(index);

  // Writes the pill and the label inks straight to the DOM; React never re-renders mid-glide.
  const paint = useCallback(() => {
    const e = edges.current;
    const pill = pillRef.current;
    if (!e || !pill) return;
    const l = e.l.pos;
    const r = Math.max(e.r.pos, l);
    pill.style.transform = `translate3d(${l}px, 0, 0)`;
    pill.style.width = `${r - l}px`;
    spans.current.forEach((span, i) => {
      const tab = tabRefs.current[i];
      if (!tab) return;
      const width = span.right - span.left || 1;
      const cover = Math.max(0, Math.min(r, span.right) - Math.max(l, span.left)) / width;
      tab.style.setProperty("--pt-ink", cover.toFixed(3));
    });
  }, []);

  const step = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    step.current = (now: number) => {
      // Clamp dt so a backgrounded tab does not fling the pill on return.
      const dt = Math.min((now - last.current) / 1000, 1 / 30);
      last.current = now;
      const e = edges.current;
      if (!e) return;
      let moving = false;
      for (const edge of [e.l, e.r]) {
        // Two half-steps per frame keep the spring stable on slow frames.
        for (let k = 0; k < 2; k++) {
          const h = dt / 2;
          edge.vel += ((edge.to - edge.pos) * stiffness - edge.vel * damping) * h;
          edge.pos += edge.vel * h;
        }
        if (Math.abs(edge.to - edge.pos) > 0.05 || Math.abs(edge.vel) > 0.05) moving = true;
        else {
          edge.pos = edge.to;
          edge.vel = 0;
        }
      }
      paint();
      frame.current = moving ? requestAnimationFrame((t) => step.current(t)) : null;
    };
  }, [damping, paint, stiffness]);

  const glideTo = useCallback(
    (i: number, animate: boolean) => {
      const span = spans.current[i];
      if (!span) return;
      if (!edges.current || !animate || reduced.current) {
        edges.current = {
          l: { pos: span.left, vel: 0, to: span.left },
          r: { pos: span.right, vel: 0, to: span.right },
        };
        if (frame.current !== null) cancelAnimationFrame(frame.current);
        frame.current = null;
        paint();
        return;
      }
      // Only the targets change: velocity carries over, so a second click mid-glide just bends the path.
      edges.current.l.to = span.left;
      edges.current.r.to = span.right;
      if (frame.current === null) {
        last.current = performance.now();
        frame.current = requestAnimationFrame((t) => step.current(t));
      }
    },
    [paint],
  );

  // Scrolls the row (never the page) so a tab is fully in view on narrow screens.
  const reveal = useCallback((i: number, smooth: boolean) => {
    const list = listRef.current;
    const span = spans.current[i];
    if (!list || !span || list.scrollWidth <= list.clientWidth) return;
    const left = list.scrollLeft;
    const right = left + list.clientWidth;
    let to = left;
    if (span.left < left) to = span.left - 8;
    else if (span.right > right) to = span.right - list.clientWidth + 8;
    if (to !== left) list.scrollTo({ left: to, behavior: smooth && !reduced.current ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduced.current = query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, []);

  // Measure every tab; on resize or font load the pill snaps to its tab instead of gliding.
  useIsoLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      spans.current = tabRefs.current.map((el) =>
        el ? { left: el.offsetLeft, right: el.offsetLeft + el.offsetWidth } : { left: 0, right: 0 },
      );
      glideTo(indexRef.current, false);
      list.dataset.ready = "true";
    };
    measure();
    reveal(indexRef.current, false);
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    tabRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [tabs.length, glideTo, reveal]);

  const first = useRef(true);
  useIsoLayoutEffect(() => {
    indexRef.current = index;
    if (first.current) {
      first.current = false;
      return;
    }
    glideTo(index, true);
  }, [index, glideTo]);

  const select = (i: number, focus = false) => {
    const tab = tabs[i];
    if (!tab) return;
    if (focus) tabRefs.current[i]?.focus({ preventScroll: true });
    reveal(i, true);
    if (tab.value === active) return;
    if (value === undefined) setInner(tab.value);
    onValueChange?.(tab.value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    select(next[event.key], true);
  };

  const current = tabs[index];

  return (
    <div className={cn(styles.root, className)} data-size={size} {...props}>
      <div className={styles.track}>
        <div ref={listRef} role="tablist" aria-label={label} className={styles.list} onKeyDown={onKeyDown}>
          <span ref={pillRef} className={styles.pill} aria-hidden="true" />
          {tabs.map((tab, i) => (
            <button
              key={tab.value}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls={tab.content !== undefined ? `${id}-panel` : undefined}
              tabIndex={i === index ? 0 : -1}
              className={styles.tab}
              onClick={() => select(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {current?.content !== undefined && (
        <div
          key={current.value}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
          tabIndex={0}
          className={styles.panel}
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
