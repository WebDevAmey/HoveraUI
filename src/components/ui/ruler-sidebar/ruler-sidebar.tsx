"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./ruler-sidebar.module.css";

export type RulerSidebarItem = {
  href: string;
  label: string;
  /** Marks the row with a small accent dot, read out as "New". */
  isNew?: boolean;
};

export type RulerSidebarProps = Omit<HTMLAttributes<HTMLDivElement>, "onToggle" | "title"> & {
  items: RulerSidebarItem[];
  /** Controlled active href. */
  activeHref?: string;
  /** Initial active href when uncontrolled. */
  defaultActiveHref?: string;
  /** Called on every row click. Call event.preventDefault() to route client-side. */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  /** Heading shown beside the toggle, with the row count after it. */
  title?: string;
  /** Minor ticks drawn between two rows. 0 leaves only the row ticks. */
  subdivisions?: number;
  /** Ticks and labels near the pointer swell, like a loupe passing over the ruler. */
  magnify?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible name for the navigation landmark. Defaults to the title. */
  label?: string;
};

/** How far, in px, the loupe reaches above and below the pointer. */
const REACH = 64;
/** Time constant of the loupe's easing, in ms. Shorter follows tighter. */
const TAU = 70;

/**
 * A ruler sidebar: rows hang off major ticks with minor ticks between them, an accent marker glides
 * to the active row, and a loupe swells the ticks and labels under the pointer.
 */
export function RulerSidebar({
  items,
  activeHref,
  defaultActiveHref,
  onNavigate,
  title,
  subdivisions = 2,
  magnify = true,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  label,
  className,
  style,
  ...props
}: RulerSidebarProps) {
  const id = useId();
  const [innerActive, setInnerActive] = useState(defaultActiveHref);
  const active = activeHref ?? innerActive;
  const activeIndex = items.findIndex((item) => item.href === active);
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = openProp ?? innerOpen;

  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const firstPaint = useRef(true);

  const minor = Math.max(0, Math.floor(subdivisions));
  const span = minor + 1;
  const tickCount = items.length > 0 ? (items.length - 1) * span + 1 : 0;

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  };

  // Fade an edge only while there is more list hidden past it.
  const updateFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.toggleAttribute("data-fade-top", el.scrollTop > 1);
    el.toggleAttribute("data-fade-bottom", el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFade();
    const observer = new ResizeObserver(updateFade);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateFade, items.length]);

  // Keep the active row in view, near the middle. Only the panel scrolls, never the page.
  useEffect(() => {
    const scroller = scrollRef.current;
    const link = listRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
    const marker = markerRef.current;
    if (!scroller || !link) return;
    const top = link.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    const target = top - scroller.clientHeight / 2 + link.offsetHeight / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offset = top - scroller.scrollTop;
    const inView = offset > 40 && offset < scroller.clientHeight - 40;
    if (firstPaint.current || !inView) {
      scroller.scrollTo({ top: target, behavior: firstPaint.current || reduce ? "instant" : "smooth" });
    }
    // The marker lands without a slide on first paint, then glides from then on.
    if (marker && firstPaint.current) requestAnimationFrame(() => (marker.dataset.ready = ""));
    firstPaint.current = false;
  }, [active]);

  // The loupe. Every tick eases toward a swell set by its distance from the pointer (or the
  // focused row), so it follows smoothly and settles back when the pointer leaves.
  const focusY = useRef<number | null>(null);
  const loupe = useRef({ y: null as number | null, current: [] as number[], frame: 0, last: 0 });

  const run = useCallback(() => {
    const state = loupe.current;
    if (state.frame) return;
    const list = listRef.current;
    if (!list) return;
    const ticks = Array.from(list.querySelectorAll<HTMLElement>("[data-tick]"));
    const labels = Array.from(list.querySelectorAll<HTMLElement>("[data-label]"));
    state.last = performance.now();
    const step = (now: number) => {
      const k = 1 - Math.exp(-(now - state.last) / TAU);
      state.last = now;
      const y = state.y ?? focusY.current;
      let moving = false;
      ticks.forEach((tick, i) => {
        const d = y === null ? REACH : Math.abs(y - tick.offsetTop);
        const target = d < REACH ? (1 + Math.cos((Math.PI * d) / REACH)) / 2 : 0;
        const prev = state.current[i] ?? 0;
        const next = Math.abs(target - prev) < 0.002 ? target : prev + (target - prev) * k;
        if (next !== target) moving = true;
        if (next !== prev) {
          state.current[i] = next;
          tick.style.setProperty("--m", next.toFixed(3));
          if (i % span === 0) labels[i / span]?.style.setProperty("--m", next.toFixed(3));
        }
      });
      state.frame = moving ? requestAnimationFrame(step) : 0;
    };
    state.frame = requestAnimationFrame(step);
  }, [span]);

  useEffect(() => {
    const state = loupe.current;
    return () => cancelAnimationFrame(state.frame);
  }, []);

  const loupeOn = () =>
    magnify &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    if (!loupeOn()) return;
    loupe.current.y = event.clientY - event.currentTarget.getBoundingClientRect().top;
    run();
  };

  const onPointerLeave = () => {
    loupe.current.y = null;
    run();
  };

  // Arrow keys walk the rows; Home and End jump to the ends.
  const onNavKey = (event: KeyboardEvent<HTMLElement>) => {
    const links = Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;
    const keys: Record<string, number> = {
      ArrowDown: Math.min(index + 1, links.length - 1),
      ArrowUp: Math.max(index - 1, 0),
      Home: 0,
      End: links.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    links[keys[event.key]].focus();
  };

  return (
    <div
      className={cn(styles.root, className)}
      data-open={open || undefined}
      style={{ "--rs-span": span, ...style } as CSSProperties}
      {...props}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? "Hide sidebar" : "Show sidebar"}
        onClick={() => setOpen(!open)}
        className={styles.toggle}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2.5" y="3.5" width="19" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="5.5" y="6.5" height="11" rx="1.2" fill="currentColor" className={styles.toggleFill} />
        </svg>
      </button>

      <div id={`${id}-panel`} className={styles.panel} inert={!open}>
        <div className={styles.header}>
          {title && <span className={styles.title}>{title}</span>}
          <span className={styles.count} aria-hidden="true">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>

        <div ref={scrollRef} className={styles.scroll} onScroll={updateFade}>
          <nav aria-label={label ?? title ?? "Pages"} onKeyDown={onNavKey}>
            <ul
              ref={listRef}
              className={styles.list}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onFocus={(event) => {
                const link = (event.target as HTMLElement).closest("a");
                if (!link || !magnify || !event.currentTarget.matches(":has(:focus-visible)")) return;
                const box = event.currentTarget.getBoundingClientRect();
                const rect = link.getBoundingClientRect();
                focusY.current = rect.top - box.top + rect.height / 2;
                run();
              }}
              onBlur={() => {
                focusY.current = null;
                run();
              }}
            >
              <span aria-hidden="true" className={styles.ruler}>
                {Array.from({ length: tickCount }, (_, k) => (
                  <span
                    key={k}
                    data-tick=""
                    data-major={k % span === 0 || undefined}
                    className={styles.tick}
                    style={{ "--k": k } as CSSProperties}
                  />
                ))}
                <span
                  ref={markerRef}
                  className={styles.marker}
                  data-shown={activeIndex >= 0 || undefined}
                  style={{ "--i": Math.max(activeIndex, 0) } as CSSProperties}
                />
              </span>

              {items.map((item, i) => {
                const current = i === activeIndex;
                return (
                  <li key={item.href} className={styles.row}>
                    <a
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      onClick={(event) => {
                        onNavigate?.(item.href, event);
                        if (activeHref === undefined) setInnerActive(item.href);
                      }}
                      className={styles.link}
                    >
                      <span className={styles.shift}>
                        <span data-label="" className={styles.label}>
                          <span className={styles.text}>{item.label}</span>
                          {item.isNew && (
                            <span className={styles.dot}>
                              <span className={styles.srOnly}> (New)</span>
                            </span>
                          )}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
