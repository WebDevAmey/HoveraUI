import { useId, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./led-meter.module.css";

export type LedMeterProps = Omit<HTMLAttributes<HTMLDivElement>, "role"> & {
  /** Current value. Leave undefined for an indeterminate scanning meter. */
  value?: number;
  min?: number;
  max?: number;
  /** Number of LED segments. */
  segments?: number;
  /** Fraction (0–1) where segments turn amber. */
  warn?: number;
  /** Fraction (0–1) where segments turn red. */
  peak?: number;
  /** Force every lit segment to one colour instead of the threshold zones. */
  tone?: "zones" | "phosphor" | "amber" | "red";
  /** Visible label; also names the meter for assistive tech. */
  label?: ReactNode;
  /** Show a mono readout of the value as a percentage. */
  readout?: boolean;
};

/** A segmented LED meter. Lit segments glow by zone; with no value it scans as a busy indicator. */
export function LedMeter({
  value,
  min = 0,
  max = 100,
  segments = 16,
  warn = 0.7,
  peak = 0.9,
  tone = "zones",
  label,
  readout = false,
  className,
  style,
  ...props
}: LedMeterProps) {
  const id = useId();
  const indeterminate = value === undefined;
  const fraction = indeterminate ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  const lit = Math.round(fraction * segments);

  const zoneOf = (i: number) => {
    if (tone !== "zones") return tone;
    if (indeterminate) return "phosphor";
    const at = (i + 1) / segments;
    return at > peak ? "red" : at > warn ? "amber" : "phosphor";
  };

  const a11y = indeterminate
    ? { role: "progressbar" as const, "aria-busy": true }
    : {
        role: "meter" as const,
        "aria-valuenow": value,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuetext": `${Math.round(fraction * 100)}%`,
      };

  return (
    <div
      {...a11y}
      aria-labelledby={label ? `${id}-label` : undefined}
      data-indeterminate={indeterminate || undefined}
      className={cn(styles.meter, className)}
      style={{ "--count": segments, ...style } as CSSProperties}
      {...props}
    >
      {(label || readout) && (
        <div className={styles.head}>
          {label && (
            <span id={`${id}-label`} className={styles.label}>
              {label}
            </span>
          )}
          {readout && (
            <span className={styles.readout} aria-hidden="true">
              {indeterminate ? "– – –" : `${String(Math.round(fraction * 100)).padStart(3, " ")}%`}
            </span>
          )}
        </div>
      )}
      <div className={styles.bezel} aria-hidden="true">
        {Array.from({ length: segments }, (_, i) => (
          <span
            key={i}
            className={styles.led}
            data-zone={zoneOf(i)}
            data-lit={(!indeterminate && i < lit) || undefined}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
