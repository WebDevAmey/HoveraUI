"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./morph-button.module.css";

export type MorphButtonState = "idle" | "loading" | "done";

export type MorphButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Which label is showing. The width never jumps: every label shares one grid cell. */
  state?: MorphButtonState;
  /** Shown with a spinner while state is "loading". */
  loadingLabel?: ReactNode;
  /** Shown with a check when state is "done". */
  doneLabel?: ReactNode;
  /** Optional leading icon for the idle label. */
  icon?: ReactNode;
};

/**
 * A button that changes its mind in place. Labels for idle, loading and done are stacked in one
 * cell; the outgoing one lifts and blurs away while the next settles in, so the button keeps its
 * size and the eye never has to look for the result.
 */
export function MorphButton({
  variant = "solid",
  size = "md",
  state = "idle",
  loadingLabel = "Working",
  doneLabel = "Done",
  icon,
  className,
  children,
  disabled,
  ...props
}: MorphButtonProps) {
  return (
    <button
      type="button"
      data-variant={variant}
      data-size={size}
      data-state={state}
      aria-busy={state === "loading" || undefined}
      disabled={disabled}
      className={cn(styles.root, className)}
      {...props}
    >
      <span className={styles.stack}>
        <span className={styles.face} data-face="idle" aria-hidden={state !== "idle"}>
          {icon}
          {children}
        </span>
        <span className={styles.face} data-face="loading" aria-hidden={state !== "loading"}>
          <svg className={styles.spinner} viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="6" />
          </svg>
          {loadingLabel}
        </span>
        <span className={styles.face} data-face="done" aria-hidden={state !== "done"}>
          <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true">
            <path d="m3.5 8.5 3 3 6-7" />
          </svg>
          {doneLabel}
        </span>
      </span>
      <span className={styles.status} role="status">
        {state === "loading" ? loadingLabel : state === "done" ? doneLabel : null}
      </span>
    </button>
  );
}
