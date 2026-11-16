"use client";

import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./shelf-accordion.module.css";

export type ShelfAccordionItem = {
  id: string;
  /** Set along the spine and as the heading of the open panel. */
  title: string;
  content: ReactNode;
};

export type ShelfAccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> & {
  items: ShelfAccordionItem[];
  /** The open item (controlled). One item is always open. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Height of the shelf in px. Below 520px wide the shelf stacks vertically. */
  height?: number;
};

/**
 * Panels stand side by side like spines on a shelf. Choosing one widens it to show its
 * contents while the others narrow back to their spines.
 */
export function ShelfAccordion({
  items,
  value,
  defaultValue,
  onValueChange,
  height = 340,
  className,
  style,
  ...props
}: ShelfAccordionProps) {
  const [inner, setInner] = useState(defaultValue ?? items[0]?.id);
  const open = value ?? inner;
  const uid = useId();
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = (id: string) => {
    if (id === open) return;
    if (value === undefined) setInner(id);
    onValueChange?.(id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const map: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in map)) return;
    event.preventDefault();
    triggers.current[map[event.key]]?.focus();
  };

  return (
    <div className={cn(styles.root, className)} style={{ "--h": `${height}px`, "--n": items.length, ...style } as CSSProperties} {...props}>
      <div className={styles.shelf}>
        {items.map((item, i) => {
          const isOpen = item.id === open;
          const trigger = `${uid}-t${i}`;
          const panel = `${uid}-p${i}`;
          return (
            <div key={item.id} className={styles.item} data-state={isOpen ? "open" : "closed"}>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                id={trigger}
                className={styles.spine}
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => choose(item.id)}
                onKeyDown={(event) => onKeyDown(event, i)}
              >
                <span className={styles.index} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.spineTitle}>{item.title}</span>
              </button>
              <div id={panel} role="region" aria-labelledby={trigger} className={styles.panel} inert={!isOpen}>
                <div className={styles.inner}>
                  <p className={styles.title} aria-hidden="true">
                    {item.title}
                  </p>
                  <div className={styles.body}>{item.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
