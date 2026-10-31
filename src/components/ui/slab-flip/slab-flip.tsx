"use client";

import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./slab-flip.module.css";

export type SlabFlipProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  front: ReactNode;
  back: ReactNode;
  /** Slab thickness in px. */
  thickness?: number;
  /** Axis the slab turns on: "y" flips left to right, "x" tumbles top over bottom. */
  axis?: "y" | "x";
  /** CSS background for the four edge faces. */
  edge?: string;
  flipped?: boolean;
  defaultFlipped?: boolean;
  onFlippedChange?: (flipped: boolean) => void;
  /** Show the back while a mouse hovers. A click still pins it. */
  flipOnHover?: boolean;
  /** Accessible name of the flip button. */
  label?: string;
};

/**
 * A card with real thickness. It turns on one axis and its edge comes into
 * view mid-turn, darker than the faces, while its shadow narrows on the table.
 */
export function SlabFlip({
  front,
  back,
  thickness = 12,
  axis = "y",
  edge,
  flipped,
  defaultFlipped = false,
  onFlippedChange,
  flipOnHover = false,
  label = "Turn over",
  className,
  style,
  ...props
}: SlabFlipProps) {
  const [inner, setInner] = useState(defaultFlipped);
  const isFlipped = flipped ?? inner;

  const toggle = () => {
    if (flipped === undefined) setInner(!isFlipped);
    onFlippedChange?.(!isFlipped);
  };

  return (
    <div
      data-axis={axis}
      data-flipped={isFlipped || undefined}
      data-hover={flipOnHover || undefined}
      className={cn(styles.root, className)}
      style={{ "--sf-t": `${thickness}px`, ...(edge ? { "--slab-edge": edge } : null), ...style } as CSSProperties}
      {...props}
    >
      <span className={styles.shadow} aria-hidden="true" />
      <div className={styles.slab}>
        <div className={cn(styles.face, styles.front)} aria-hidden={isFlipped || undefined}>
          {front}
        </div>
        <div className={cn(styles.face, styles.back)} aria-hidden={!isFlipped || undefined}>
          {back}
        </div>
        <span className={styles.edge} data-side="left" aria-hidden="true" />
        <span className={styles.edge} data-side="right" aria-hidden="true" />
        <span className={styles.edge} data-side="top" aria-hidden="true" />
        <span className={styles.edge} data-side="bottom" aria-hidden="true" />
      </div>
      <button type="button" className={styles.hit} aria-pressed={isFlipped} aria-label={label} onClick={toggle} />
    </div>
  );
}
