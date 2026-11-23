"use client";

import { useState, type ButtonHTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./gloss-button.module.css";

export type GlossButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Colour of the glaze. */
  tone?: "blue" | "ink" | "neutral";
  size?: "sm" | "md" | "lg";
  /** Rounded rectangle or full pill. */
  shape?: "rounded" | "pill";
  /** Optional leading icon, hidden from assistive tech. */
  icon?: ReactNode;
};

/** A glazed button: a lit top edge, a deeper rim and a soft cast shadow. Pressing sinks the glaze. */
export function GlossButton({
  tone = "blue",
  size = "md",
  shape = "rounded",
  icon,
  className,
  onKeyDown,
  onKeyUp,
  onBlur,
  children,
  ...props
}: GlossButtonProps) {
  // :active does not fire for Enter in every browser, so mirror key presses.
  const [keyDown, setKeyDown] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") setKeyDown(true);
    onKeyDown?.(event);
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
    setKeyDown(false);
    onKeyUp?.(event);
  };

  return (
    <button
      type="button"
      data-tone={tone}
      data-size={size}
      data-shape={shape}
      data-pressed={keyDown || undefined}
      className={cn(styles.button, className)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={(event) => {
        setKeyDown(false);
        onBlur?.(event);
      }}
      {...props}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
