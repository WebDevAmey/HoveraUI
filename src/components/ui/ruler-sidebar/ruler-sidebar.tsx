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
} from "react";
import { cn } from "@/lib/cn";
import styles from "./ruler-sidebar.module.css";

export type RulerSidebarItem = {
  href: string;
  label: string;
  /** Marks the row with a small accent dot, read out as "New". */
  isNew?: boolean;
};

export type RulerSidebarProps = Omit<HTMLAttributes<HTMLDivElement>, "onToggle"> & {
  items: RulerSidebarItem[];
  /** Controlled active href. */
  activeHref?: string;
  /** Initial active href when uncontrolled. */
  defaultActiveHref?: string;
  /** Called on every row click. Call event.preventDefault() to route client-side. */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  /** Minor ticks drawn between two rows. 0 leaves only the row ticks. */
  subdivisions?: number;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible name for the navigation landmark. */
  label?: string;
};

/**
 * A ruler sidebar: every row hangs off a tick on a fine ruler, minor ticks fill the gaps, the active
 * row's tick reaches further out, and the whole panel slides away to a hairline behind one button.
 */
export function RulerSidebar({
  items,
  activeHref,
  defaultActiveHref,
  onNavigate,
  subdivisions = 2,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  label = "Pages",
  className,
  style,
  ...props
}: RulerSidebarProps) {
  const id = useId();
  const [innerActive, setInnerActive] = useState(defaultActiveHref);
  const active = activeHref ?? innerActive;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const open = openProp ?? innerOpen;

  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const firstPaint = useRef(true);

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

  // Keep the active row near the middle of the panel. Only the panel scrolls, never the page.
  useEffect(() => {
    const scroller = scrollRef.current;
    const link = navRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!scroller || !link) return;
    const top = link.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    const target = top - scroller.clientHeight / 2 + link.offsetHeight / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visible = top - scroller.scrollTop > 48 && top - scroller.scrollTop < scroller.clientHeight - 48;
    if (firstPaint.current || !visible) {
      scroller.scrollTo({ top: target, behavior: firstPaint.current || reduce ? "instant" : "smooth" });
    }
    firstPaint.current = false;
  }, [active]);

  // Arrow keys walk the rows; Home and End jump to the ends.
  const onNavKey = (event: KeyboardEvent<HTMLElement>) => {
    const links = Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;
    const next =
      event.key === "ArrowDown"
        ? Math.min(index + 1, links.length - 1)
        : event.key === "ArrowUp"
          ? Math.max(index - 1, 0)
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? links.length - 1
              : -1;
    if (next === -1) return;
    event.preventDefault();
    links[next].focus();
  };

  const minor = Math.max(0, Math.floor(subdivisions));

  return (
    <div
      className={cn(styles.root, className)}
      data-open={open || undefined}
      style={{ "--rs-subdivisions": minor, ...style } as CSSProperties}
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
          <rect x="2.5" y="3.5" width="19" height="17" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <rect x="5.5" y="6.5" height="11" rx="1.2" fill="currentColor" className={styles.toggleFill} />
        </svg>
      </button>

      <div id={`${id}-panel`} className={styles.panel} inert={!open}>
        <div ref={scrollRef} className={styles.scroll} onScroll={updateFade}>
          <nav ref={navRef} aria-label={label} onKeyDown={onNavKey}>
            <ul className={styles.ruler} data-minor={minor > 0 || undefined}>
              {items.map((item) => {
                const current = item.href === active;
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
                      <span aria-hidden="true" className={styles.tick} />
                      <span className={styles.label}>{item.label}</span>
                      {item.isNew && (
                        <span className={styles.dot}>
                          <span className={styles.srOnly}> (New)</span>
                        </span>
                      )}
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
