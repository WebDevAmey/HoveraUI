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
import styles from "./morph-tabs.module.css";

export type MorphTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export type MorphTabsProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  tabs: MorphTab[];
  /** Selected tab id (controlled). */
  value?: string;
  /** Selected tab id on first render (uncontrolled). Defaults to the first tab. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Accessible name for the tab list. */
  label?: string;
};

const NUMERALS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number) {
  let out = "";
  for (const [value, glyph] of NUMERALS) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Chapter tabs with roman numerals. The ink rule stretches toward the new tab, then its tail catches up. */
export function MorphTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  label = "Chapters",
  className,
  ...props
}: MorphTabsProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const selected = value ?? internal;
  const listRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());
  const lastStart = useRef<number | null>(null);

  const select = useCallback(
    (next: string) => {
      if (value === undefined) setInternal(next);
      if (next !== selected) onValueChange?.(next);
    },
    [value, selected, onValueChange],
  );

  // Writes the ink's edges as custom properties; CSS animates each edge on its own clock.
  const measure = useCallback(
    (animate: boolean) => {
      const list = listRef.current;
      const ink = inkRef.current;
      const tab = selected ? tabRefs.current.get(selected) : undefined;
      if (!list || !ink || !tab) return;
      const start = tab.offsetLeft;
      const end = start + tab.offsetWidth;
      const previous = lastStart.current;
      ink.dataset.dir = previous === null || start === previous ? "none" : start > previous ? "forward" : "back";
      if (!animate) ink.dataset.dir = "none";
      ink.style.setProperty("--track", `${list.scrollWidth}px`);
      ink.style.setProperty("--morph-tabs-start", `${start}px`);
      ink.style.setProperty("--morph-tabs-end", `${end}px`);
      lastStart.current = start;
    },
    [selected],
  );

  useIsoLayoutEffect(() => {
    measure(true);
    const tab = selected ? tabRefs.current.get(selected) : undefined;
    tab?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure(false));
    observer.observe(list);
    for (const tab of tabRefs.current.values()) observer.observe(tab);
    return () => observer.disconnect();
  }, [measure]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === selected);
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    event.preventDefault();
    const target = tabs[next];
    select(target.id);
    tabRefs.current.get(target.id)?.focus();
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <div className={styles.scroller}>
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          aria-orientation="horizontal"
          className={styles.list}
          onKeyDown={onKeyDown}
        >
          {tabs.map((tab, index) => {
            const active = tab.id === selected;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  if (node) tabRefs.current.set(tab.id, node);
                  else tabRefs.current.delete(tab.id);
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${tab.id}`}
                aria-selected={active}
                aria-controls={`${id}-panel-${tab.id}`}
                tabIndex={active ? 0 : -1}
                className={styles.tab}
                onClick={() => select(tab.id)}
              >
                <span className={styles.numeral} aria-hidden="true">
                  {toRoman(index + 1)}
                </span>
                <span className={styles.label}>{tab.label}</span>
              </button>
            );
          })}
          <span ref={inkRef} className={styles.ink} aria-hidden="true" data-dir="none" />
        </div>
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
          tabIndex={0}
          hidden={tab.id !== selected}
          className={styles.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
