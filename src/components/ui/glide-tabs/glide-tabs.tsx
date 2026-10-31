"use client";

import { useId, useLayoutEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./glide-tabs.module.css";

export type GlideTab = { value: string; label: ReactNode; content?: ReactNode };

export type GlideTabsProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  tabs: GlideTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Accessible name for the tab list. */
  label: string;
};

/**
 * Tabs whose active state is one inked copy of the whole row, clipped down to the chosen tab.
 * Moving the clip moves the fill and the text colour together, so nothing fades out of step.
 */
export function GlideTabs({ tabs, value, defaultValue, onValueChange, label, className, ...props }: GlideTabsProps) {
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.value);
  const active = value ?? inner;
  const id = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);

  // Clip the inked copy to the active tab, in percentages of the row.
  useLayoutEffect(() => {
    const list = listRef.current;
    const ink = inkRef.current;
    const tab = list?.querySelector<HTMLElement>(`[data-value="${CSS.escape(active ?? "")}"]`);
    if (!list || !ink || !tab) return;
    const width = list.offsetWidth;
    const start = tab.offsetLeft - list.offsetLeft;
    const left = (start / width) * 100;
    const right = 100 - ((start + tab.offsetWidth) / width) * 100;
    ink.style.clipPath = `inset(0 ${right.toFixed(3)}% 0 ${left.toFixed(3)}% round 999px)`;
    if (!ink.dataset.ready) requestAnimationFrame(() => (ink.dataset.ready = "true"));
  }, [active, tabs]);

  const select = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = tabs.findIndex((tab) => tab.value === active);
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    let next = index;
    if (step) next = (index + step + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    select(tabs[next].value);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  const current = tabs.find((tab) => tab.value === active);
  const currentIndex = tabs.findIndex((tab) => tab.value === active);

  return (
    <div className={cn(styles.root, className)} {...props}>
      <div className={styles.rail}>
        <div ref={listRef} role="tablist" aria-label={label} className={styles.list}>
          {tabs.map((tab, i) => (
            <button
              key={tab.value}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              data-value={tab.value}
              aria-selected={tab.value === active}
              aria-controls={tab.content !== undefined ? `${id}-panel` : undefined}
              tabIndex={tab.value === active ? 0 : -1}
              onClick={() => select(tab.value)}
              onKeyDown={onKeyDown}
              className={styles.tab}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* The inked copy: same labels, same layout, revealed only under the clip. */}
        <div ref={inkRef} aria-hidden="true" className={styles.ink}>
          {tabs.map((tab) => (
            <span key={tab.value} className={cn(styles.tab, styles.inkTab)}>
              {tab.label}
            </span>
          ))}
        </div>
      </div>
      {current?.content !== undefined && (
        <div
          key={current.value}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${currentIndex}`}
          tabIndex={0}
          className={styles.panel}
        >
          {current.content}
        </div>
      )}
    </div>
  );
}
