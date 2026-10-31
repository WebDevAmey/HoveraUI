"use client";

import { useId, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./corner-fold.module.css";

export type CornerFoldProps = HTMLAttributes<HTMLDivElement> & {
  /** What is written on the sheet under the corner. */
  note: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Leg length of the fold when fully open, in px. */
  peek?: number;
  /** Accessible name of the corner button. */
  revealLabel?: string;
};

/**
 * A paper card whose bottom right corner peels back. The flap shows the back
 * of the sheet and a second sheet with a note shows through underneath.
 */
export function CornerFold({
  note,
  open,
  defaultOpen = false,
  onOpenChange,
  peek = 140,
  revealLabel = "Lift the corner",
  className,
  style,
  children,
  ...props
}: CornerFoldProps) {
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const noteId = useId();

  const toggle = () => {
    if (open === undefined) setInner(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <div
      data-open={isOpen || undefined}
      className={cn(styles.root, className)}
      style={{ "--peek": `${peek}px`, ...style } as CSSProperties}
      {...props}
    >
      <div className={styles.under}>
        <span className={styles.crease} aria-hidden="true" />
        <div id={noteId} className={styles.note} aria-hidden={!isOpen}>
          {note}
        </div>
      </div>
      <div className={styles.paper}>{children}</div>
      <span className={styles.flapShadow} aria-hidden="true">
        <span className={styles.flap} />
      </span>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls={noteId}
        aria-label={revealLabel}
        onClick={toggle}
      />
    </div>
  );
}
