"use client";

import { useState, type ButtonHTMLAttributes, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import styles from "./depth-key.module.css";

export type DepthKeyProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Keycap material. */
  variant?: "light" | "dark" | "accent";
  size?: "sm" | "md" | "lg";
};

/** A keycap with a visible side wall. Pressing travels the cap down its wall. */
export function DepthKey({
  variant = "light",
  size = "md",
  className,
  onKeyDown,
  onKeyUp,
  onBlur,
  children,
  ...props
}: DepthKeyProps) {
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
      data-variant={variant}
      data-size={size}
      data-pressed={keyDown || undefined}
      className={cn(styles.key, className)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={(event) => {
        setKeyDown(false);
        onBlur?.(event);
      }}
      {...props}
    >
      <span className={styles.cap}>{children}</span>
    </button>
  );
}
