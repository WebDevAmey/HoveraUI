"use client";

import { useEffect, useRef, type CSSProperties, type OlHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./timeline-rail.module.css";

export type TimelineRailItem = {
  /** Display date, e.g. "Oct 2026" or "2026-10-30". */
  date: string;
  /** Machine-readable date for the time element. */
  dateTime?: string;
  title: string;
  body?: string;
  tags?: string[];
  href?: string;
};

export type TimelineRailProps = OlHTMLAttributes<HTMLOListElement> & {
  /** Entries, newest first. The first node is marked as the latest. */
  items: TimelineRailItem[];
  /** Fade entries in as they scroll into view. */
  reveal?: boolean;
};

/** A changelog rail: mono dates on the left, a hairline with nodes, serif headlines on the right. */
export function TimelineRail({ items, reveal = true, className, ...props }: TimelineRailProps) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!reveal || !list || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hiding starts only once JS runs, so entries are never lost without it.
    list.dataset.reveal = "";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const child of Array.from(list.children)) observer.observe(child);
    return () => {
      observer.disconnect();
      delete list.dataset.reveal;
    };
  }, [reveal, items.length]);

  return (
    <ol ref={ref} className={cn(styles.rail, className)} {...props}>
      {items.map((item, index) => (
        <li
          key={`${item.date}-${item.title}`}
          className={styles.entry}
          data-latest={index === 0 || undefined}
          style={{ "--i": index } as CSSProperties}
        >
          <time className={styles.date} dateTime={item.dateTime}>
            {item.date}
          </time>
          <span className={styles.node} aria-hidden="true" />
          <div className={styles.content}>
            <h3 className={styles.title}>
              {item.href ? (
                <a href={item.href} className={styles.link}>
                  {item.title}
                </a>
              ) : (
                item.title
              )}
            </h3>
            {item.body ? <p className={styles.body}>{item.body}</p> : null}
            {item.tags?.length ? (
              <ul className={styles.tags} aria-label="Tags">
                {item.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
