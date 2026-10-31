import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./split-label.module.css";

export type SplitLabelProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  /** The resting label, set in sans. Also the accessible name. */
  label: string;
  /** The verb revealed between the halves, set in italic serif. */
  reveal: string;
  variant?: "outline" | "solid";
  shape?: "pill" | "square";
};

/** A label that splits along a hairline on hover or focus to reveal a second verb in italic serif. */
export function SplitLabel({
  label,
  reveal,
  variant = "outline",
  shape = "pill",
  className,
  ...props
}: SplitLabelProps) {
  return (
    <button
      type="button"
      data-variant={variant}
      data-shape={shape}
      className={cn(styles.button, className)}
      {...props}
    >
      <span className={styles.srOnly}>{label}</span>
      {/* Every layer shares one grid cell, so the button is as wide as the longer word and never shifts. */}
      <span className={styles.stage} aria-hidden="true">
        <span className={cn(styles.half, styles.top)}>{label}</span>
        <span className={cn(styles.half, styles.bottom)}>{label}</span>
        <span className={styles.reveal}>
          <span className={styles.rule} />
          <span className={styles.verb}>{reveal}</span>
          <span className={styles.rule} />
        </span>
      </span>
    </button>
  );
}
