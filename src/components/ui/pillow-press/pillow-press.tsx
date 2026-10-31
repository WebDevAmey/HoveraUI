"use client";

import { useState, type ButtonHTMLAttributes, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./pillow-press.module.css";

export type PillowPressProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Colour of the surface the pill is extruded from. Defaults to var(--hv-canvas). */
  surface?: string;
  /** Leading icon, rendered decoratively. */
  icon?: ReactNode;
  /** When set, the pill behaves as a toggle and stays sunk while true. */
  pressed?: boolean;
  size?: "sm" | "md";
};

/** A soft pill extruded from its surface. Pressing sinks it: the light and shade swap sides. */
export function PillowPress({
  surface,
  icon,
  pressed,
  size = "md",
  className,
  style,
  onKeyDown,
  onKeyUp,
  onBlur,
  children,
  ...props
}: PillowPressProps) {
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
      aria-pressed={pressed}
      data-size={size}
      data-down={keyDown || undefined}
      className={cn(styles.pill, className)}
      style={surface ? ({ "--surface": surface, ...style } as CSSProperties) : style}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={(event) => {
        setKeyDown(false);
        onBlur?.(event);
      }}
      {...props}
    >
      <span className={styles.label}>
        {icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {children}
      </span>
    </button>
  );
}
