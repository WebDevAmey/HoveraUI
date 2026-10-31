"use client";

import {
  createContext,
  use,
  useCallback,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./plus-minus-accordion.module.css";

type AccordionContextValue = {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  headingLevel: 2 | 3 | 4 | 5 | 6;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue"> & {
  /** "single" keeps at most one row open; "multiple" lets rows open independently. */
  type?: "single" | "multiple";
  /** Rows open on first render (uncontrolled). */
  defaultValue?: string | string[];
  /** Open rows (controlled). */
  value?: string[];
  onValueChange?: (value: string[]) => void;
  /** Heading level that wraps each row's button. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

const toArray = (value: string | string[] | undefined) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

/** A list of disclosure rows. The round toggle folds its plus into a minus while its fill drains. */
export function Accordion({
  type = "single",
  defaultValue,
  value,
  onValueChange,
  headingLevel = 3,
  className,
  children,
  ...props
}: AccordionProps) {
  const [internal, setInternal] = useState<string[]>(() => toArray(defaultValue));
  const open = value ?? internal;

  const toggle = useCallback(
    (item: string) => {
      const isOpen = open.includes(item);
      const next = isOpen
        ? open.filter((v) => v !== item)
        : type === "single"
          ? [item]
          : [...open, item];
      if (value === undefined) setInternal(next);
      onValueChange?.(next);
    },
    [open, type, value, onValueChange],
  );

  const context = useMemo<AccordionContextValue>(
    () => ({ isOpen: (item) => open.includes(item), toggle, headingLevel }),
    [open, toggle, headingLevel],
  );

  return (
    <div className={cn(styles.accordion, className)} {...props}>
      <AccordionContext value={context}>{children}</AccordionContext>
    </div>
  );
}

export type AccordionItemProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** Unique key used by `defaultValue` and `value`. */
  value: string;
  /** The question or row label. */
  title: ReactNode;
};

export function AccordionItem({ value, title, className, children, ...props }: AccordionItemProps) {
  const context = use(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used inside Accordion");
  const id = useId();
  const open = context.isOpen(value);
  const Heading = `h${context.headingLevel}` as const;
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className={cn(styles.item, className)} data-state={open ? "open" : "closed"} {...props}>
      <Heading className={styles.heading}>
        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => context.toggle(value)}
        >
          <span className={styles.title}>{title}</span>
          <span className={styles.toggle} aria-hidden="true">
            <svg viewBox="0 0 16 16" className={styles.glyph}>
              <path className={styles.bar} d="M3 8h10" />
              <path className={styles.stem} d="M8 3v10" />
            </svg>
          </span>
        </button>
      </Heading>
      {/* The panel stays in the DOM for the height animation; inert hides it from AT and Tab. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.panel}
        inert={!open}
      >
        <div className={styles.clip}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
