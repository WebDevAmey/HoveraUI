import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./dither-fill.module.css";

export type DitherFillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Ink follows the text colour; accent uses --hv-accent. */
  variant?: "ink" | "accent";
  /** Size of one dither cell in px. */
  cell?: number;
};

/** A button filled through a 4×4 Bayer matrix, one threshold at a time, and drained in reverse. */
export function DitherFill({
  variant = "ink",
  cell = 3,
  className,
  style,
  children,
  ...props
}: DitherFillProps) {
  return (
    <button
      type="button"
      data-variant={variant}
      className={cn(styles.button, className)}
      style={{ ["--cell" as string]: `${cell}px`, ...style }}
      {...props}
    >
      <span className={styles.face}>{children}</span>
      <span className={styles.fill} aria-hidden="true">
        {children}
      </span>
    </button>
  );
}
