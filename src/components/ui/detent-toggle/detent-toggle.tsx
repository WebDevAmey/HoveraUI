"use client";

import { useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./detent-toggle.module.css";

export type DetentToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label; also the switch's accessible name. */
  label?: ReactNode;
};

/** A switch whose knob climbs a detent ridge in the middle of its groove and settles past it. */
export function DetentToggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  className,
  onClick,
  ...props
}: DetentToggleProps) {
  const [inner, setInner] = useState(defaultChecked);
  // The climb animation only runs after a real change, never on first paint.
  const [moved, setMoved] = useState(false);
  const on = checked ?? inner;

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const next = !on;
    if (checked === undefined) setInner(next);
    setMoved(true);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      data-on={on || undefined}
      data-moved={moved || undefined}
      className={cn(styles.root, className)}
      onClick={toggle}
      {...props}
    >
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.switch} aria-hidden="true">
        <span className={cn(styles.mark, styles.off)}>O</span>
        <span className={styles.track}>
          <span className={styles.ridge} />
          <span className={styles.knob}>
            <span className={styles.cap} />
          </span>
        </span>
        <span className={cn(styles.mark, styles.on)}>I</span>
      </span>
    </button>
  );
}
