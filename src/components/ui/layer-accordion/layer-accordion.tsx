"use client";

import { useId, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./layer-accordion.module.css";

export type LayerAccordionItem = {
  id: string;
  title: ReactNode;
  /** A short line under the title, visible while closed. */
  summary?: ReactNode;
  content: ReactNode;
};

export type LayerAccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  items: LayerAccordionItem[];
  /** "single" keeps at most one card open; "multiple" lets cards open independently. */
  type?: "single" | "multiple";
  defaultValue?: string[];
  /** Open cards (controlled). */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Heading element that wraps each card's button. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/**
 * Cards stacked like index cards, each tucked under the one below. Opening a card slides
 * an inner sheet out from beneath its header and pushes the rest of the stack down.
 */
export function LayerAccordion({
  items,
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  headingLevel = 3,
  className,
  ...props
}: LayerAccordionProps) {
  const [inner, setInner] = useState<string[]>(defaultValue);
  const open = value ?? inner;
  const uid = useId();
  const Heading = `h${headingLevel}` as const;

  const toggle = (id: string) => {
    const next = open.includes(id) ? open.filter((v) => v !== id) : type === "single" ? [id] : [...open, id];
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn(styles.root, className)} data-any={open.length > 0 || undefined} {...props}>
      {items.map((item, i) => {
        const isOpen = open.includes(item.id);
        const trigger = `${uid}-t${i}`;
        const panel = `${uid}-p${i}`;
        return (
          <div
            key={item.id}
            className={styles.card}
            data-state={isOpen ? "open" : "closed"}
            style={{ "--i": i, zIndex: i + 1 } as CSSProperties}
          >
            <Heading className={styles.heading}>
              <button
                type="button"
                id={trigger}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(item.id)}
              >
                <span className={styles.text}>
                  <span className={styles.title}>{item.title}</span>
                  {item.summary !== undefined && <span className={styles.summary}>{item.summary}</span>}
                </span>
                <span className={styles.chevron} aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="12" height="12">
                    <path d="M3 4.5 6 7.5 9 4.5" />
                  </svg>
                </span>
              </button>
            </Heading>
            <div id={panel} role="region" aria-labelledby={trigger} className={styles.panel} inert={!isOpen}>
              <div className={styles.clip}>
                <div className={styles.sheet}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
