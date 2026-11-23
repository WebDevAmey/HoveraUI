"use client";

import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./hairline-accordion.module.css";

export type HairlineAccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

export type HairlineAccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  items: HairlineAccordionItem[];
  /** "single" keeps at most one row open; "multiple" lets rows open independently. */
  type?: "single" | "multiple";
  defaultValue?: string[];
  /** Open rows (controlled). */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Heading element that wraps each row's button. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/**
 * A quiet FAQ list. Rows sit between hairlines; opening one flattens its plus into a
 * minus while the answer eases down and lifts into place.
 */
export function HairlineAccordion({
  items,
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  headingLevel = 3,
  className,
  ...props
}: HairlineAccordionProps) {
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
          <div key={item.id} className={styles.item} data-state={isOpen ? "open" : "closed"}>
            <Heading className={styles.heading}>
              <button
                type="button"
                id={trigger}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(item.id)}
              >
                <span className={styles.title}>{item.title}</span>
                <span className={styles.sign} aria-hidden="true" />
              </button>
            </Heading>
            <div id={panel} role="region" aria-labelledby={trigger} className={styles.panel} inert={!isOpen}>
              <div className={styles.clip}>
                <div className={styles.body}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
