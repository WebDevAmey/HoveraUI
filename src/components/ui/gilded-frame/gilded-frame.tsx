"use client";

import { useRef, type HTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./gilded-frame.module.css";

export type GildedFrameProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  /** Small caps line above the numeral. */
  eyebrow?: ReactNode;
  /** Large serif numeral, set in gilt. */
  numeral?: ReactNode;
  title?: ReactNode;
  /** Small caps line below a gilt rule. */
  footer?: ReactNode;
};

/** Where the bright band sits across the card when nothing is pointing at it (0 = left edge). */
const REST = 0.15;

/**
 * A card inside a double gilt hairline. A foil highlight runs along the frame,
 * follows the pointer across it and settles back when it leaves.
 */
export function GildedFrame({
  eyebrow,
  numeral,
  title,
  footer,
  className,
  children,
  onPointerMove,
  onPointerDown,
  onPointerLeave,
  ...props
}: GildedFrameProps) {
  const rootRef = useRef<HTMLElement>(null);

  // The foil is a 300%-wide gradient; this maps a point across the card to the background position that puts its highlight there.
  const place = (fraction: number, tracking: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    root.style.setProperty("--gf-x", `${((1.5 - fraction) / 2) * 100}%`);
    if (tracking) root.dataset.tracking = "";
    else delete root.dataset.tracking;
  };

  const follow = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const across = (event.clientX - rect.left) / rect.width;
    const down = (event.clientY - rect.top) / rect.height;
    // The band is diagonal, so lean it with the pointer's height too.
    place(across + (down - 0.5) * 0.35, true);
  };

  return (
    <article
      ref={rootRef}
      className={cn(styles.frame, className)}
      onPointerMove={(event) => {
        follow(event);
        onPointerMove?.(event);
      }}
      onPointerDown={(event) => {
        follow(event);
        onPointerDown?.(event);
      }}
      onPointerLeave={(event) => {
        place(REST, false);
        onPointerLeave?.(event);
      }}
      {...props}
    >
      <span className={styles.rule} data-ring="outer" aria-hidden="true" />
      <span className={styles.rule} data-ring="inner" aria-hidden="true" />
      <div className={styles.body}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        {numeral && <p className={styles.numeral}>{numeral}</p>}
        {title && <h3 className={styles.title}>{title}</h3>}
        {children && <div className={styles.text}>{children}</div>}
        {footer && <p className={styles.footer}>{footer}</p>}
      </div>
    </article>
  );
}
