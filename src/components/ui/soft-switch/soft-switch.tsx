"use client";

import { useId, useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./soft-switch.module.css";

export type SoftSwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Visible label; it names the switch. */
  label: ReactNode;
  /** One line under the label, linked as the switch's description. */
  description?: ReactNode;
};

/**
 * A settings row with a switch whose thumb stretches toward where it is going while you press,
 * then slides across when you let go, so the press itself previews the change.
 */
export function SoftSwitch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  className,
  style,
  onClick,
  disabled,
  ...props
}: SoftSwitchProps) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;
  const id = useId();

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (checked === undefined) setInner(!on);
    onCheckedChange?.(!on);
  };

  return (
    <div className={cn(styles.row, className)} style={style} data-disabled={disabled || undefined}>
      <span className={styles.text}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {description ? (
          <span id={`${id}-desc`} className={styles.description}>
            {description}
          </span>
        ) : null}
      </span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-describedby={description ? `${id}-desc` : undefined}
        disabled={disabled}
        data-on={on || undefined}
        className={styles.switch}
        onClick={toggle}
        {...props}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
