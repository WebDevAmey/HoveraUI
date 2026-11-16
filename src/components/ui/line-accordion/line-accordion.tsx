"use client";

import { useId, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./line-accordion.module.css";

export type LineAccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  /** Short note set in small caps beside the title, such as a date or a count. */
  meta?: ReactNode;
};

export type LineAccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  items: LineAccordionItem[];
  /** "single" keeps at most one row open; "multiple" lets rows open independently. */
  type?: "single" | "multiple";
  defaultValue?: string[];
  /** Open rows (controlled). */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Heading element that wraps each row's button. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Show a two-digit index before each title. */
  numbered?: boolean;
};

/**
 * A typographic accordion. Rows are set in serif between hairlines; opening one draws
 * an ink rule across its divider while the text settles in beneath.
 */
export function LineAccordion({
  items,
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  headingLevel = 3,
  numbered = true,
  className,
  ...props
}: LineAccordionProps) {
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
    <div className={cn(styles.root, className)} {...props}>
      {items.map((item, i) => {
        const isOpen = open.includes(item.id);
        const trigger = `${uid}-t${i}`;
        const panel = `${uid}-p${i}`;
        return (
          <div
            key={item.id}
            className={styles.item}
            data-state={isOpen ? "open" : "closed"}
            style={{ "--i": i } as CSSProperties}
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
                {numbered && (
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
                <span className={styles.title}>{item.title}</span>
                {item.meta !== undefined && <span className={styles.meta}>{item.meta}</span>}
                <span className={styles.mark} aria-hidden="true" />
              </button>
            </Heading>
            <div id={panel} role="region" aria-labelledby={trigger} className={styles.panel} inert={!isOpen}>
              <div className={styles.clip}>
                <div className={styles.body}>{item.content}</div>
              </div>
            </div>
            <span className={styles.rule} aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}
