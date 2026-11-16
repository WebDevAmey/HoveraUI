"use client";

import { Children, useId, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./cascade-accordion.module.css";

export type CascadeAccordionItem = {
  id: string;
  title: ReactNode;
  /** Revealed one after another. Pass an array for several steps, or a single node. */
  content: ReactNode | ReactNode[];
};

export type CascadeAccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  items: CascadeAccordionItem[];
  /** "single" keeps at most one row open; "multiple" lets rows open independently. */
  type?: "single" | "multiple";
  defaultValue?: string[];
  /** Open rows (controlled). */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Milliseconds between consecutive steps. */
  stagger?: number;
  /** Heading element that wraps each row's button. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/**
 * Rows whose contents arrive in sequence. A dot beside the title draws a thread down
 * the open row, and each step rises out of a mask as the thread reaches it.
 */
export function CascadeAccordion({
  items,
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  stagger = 70,
  headingLevel = 3,
  className,
  style,
  ...props
}: CascadeAccordionProps) {
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
    <div className={cn(styles.root, className)} style={{ "--stagger": `${stagger}ms`, ...style } as CSSProperties} {...props}>
      {items.map((item, i) => {
        const isOpen = open.includes(item.id);
        const trigger = `${uid}-t${i}`;
        const panel = `${uid}-p${i}`;
        const steps = Children.toArray(item.content);
        return (
          <div
            key={item.id}
            className={styles.item}
            data-state={isOpen ? "open" : "closed"}
            style={{ "--n": steps.length } as CSSProperties}
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
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.title}>{item.title}</span>
                <span className={styles.count} aria-hidden="true">
                  {String(steps.length).padStart(2, "0")}
                </span>
              </button>
            </Heading>
            <div id={panel} role="region" aria-labelledby={trigger} className={styles.panel} inert={!isOpen}>
              <div className={styles.clip}>
                <span className={styles.thread} aria-hidden="true" />
                <div className={styles.steps}>
                  {steps.map((step, k) => (
                    <div key={k} className={styles.step} style={{ "--k": k } as CSSProperties}>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
