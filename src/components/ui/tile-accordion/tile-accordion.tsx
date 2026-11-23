"use client";

import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./tile-accordion.module.css";

export type TileAccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

export type TileAccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  items: TileAccordionItem[];
  /** "single" keeps at most one tile open; "multiple" lets tiles open independently. */
  type?: "single" | "multiple";
  defaultValue?: string[];
  /** Open tiles (controlled). */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Heading element that wraps each tile's button. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/**
 * Each question is its own soft tile. Opening one swings its plus round into a cross
 * while the answer grows in and fades up.
 */
export function TileAccordion({
  items,
  type = "single",
  defaultValue = [],
  value,
  onValueChange,
  headingLevel = 3,
  className,
  ...props
}: TileAccordionProps) {
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
          <div key={item.id} className={styles.tile} data-state={isOpen ? "open" : "closed"}>
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
                <svg className={styles.cross} viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 4v12M4 10h12" />
                </svg>
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
