import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./aura.module.css";

export type AuraProps = HTMLAttributes<HTMLDivElement> & {
  /** Diameter in px. Shrinks to fit narrower containers. */
  size?: number;
  /** Overall strength of the glow, 0 to 1. */
  intensity?: number;
  palette?: "ether" | "dusk" | "accent";
  /** Hold the halo still. */
  paused?: boolean;
};

/**
 * A soft halo that breathes at a resting rate, about six breaths a minute.
 * Layered conic and radial gradients; no canvas, no large blur filters.
 */
export function Aura({
  size = 240,
  intensity = 0.8,
  palette = "ether",
  paused = false,
  className,
  style,
  children,
  ...props
}: AuraProps) {
  return (
    <div
      data-palette={palette}
      data-paused={paused || undefined}
      className={cn(styles.root, className)}
      style={{ "--aura-size": `${size}px`, "--aura-k": Math.max(0, Math.min(1, intensity)), ...style } as CSSProperties}
      {...props}
    >
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.halo} aria-hidden="true" />
      <span className={styles.wisp} aria-hidden="true" />
      <span className={styles.line} aria-hidden="true" />
      {children != null && <div className={styles.content}>{children}</div>}
    </div>
  );
}
