"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./pixel-wipe.module.css";

export type PixelWipeProps = HTMLAttributes<HTMLDivElement> & {
  /** Change this value to run a wipe. The new children appear once the screen is covered. */
  trigger: string | number;
  /** Size of one block in CSS px. */
  cell?: number;
  /** Duration of each half (cover, then reveal) in ms. */
  duration?: number;
  /** Block colour. Any CSS colour. */
  color?: string;
  children: ReactNode;
};

// 4×4 Bayer ranks roughen the diagonal front so it reads as pixels, not a slide.
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/**
 * A transition wrapper. When `trigger` changes, stepped blocks cover the old
 * content along a dithered diagonal, the content swaps, and the blocks clear.
 */
export function PixelWipe({
  trigger,
  cell = 28,
  duration = 360,
  color,
  className,
  style,
  children,
  ...props
}: PixelWipeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const latest = useRef(children);
  const [grid, setGrid] = useState({ cols: 12, rows: 8 });
  const [shown, setShown] = useState({ key: trigger, content: children });
  const [revealing, setRevealing] = useState(false);
  const pending = trigger !== shown.key;
  const phase = pending ? "cover" : revealing ? "reveal" : "idle";

  useEffect(() => {
    latest.current = children;
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setGrid({ cols: Math.max(1, Math.ceil(width / cell)), rows: Math.max(1, Math.ceil(height / cell)) });
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [cell]);

  // Cover, then swap in the latest children and reveal.
  useEffect(() => {
    if (!pending) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const swap = window.setTimeout(() => {
      setShown({ key: trigger, content: latest.current });
      setRevealing(!reduced);
    }, reduced ? 0 : duration + 40);
    return () => window.clearTimeout(swap);
  }, [pending, trigger, duration]);

  useEffect(() => {
    if (!revealing) return;
    const done = window.setTimeout(() => setRevealing(false), duration + 40);
    return () => window.clearTimeout(done);
  }, [revealing, duration]);

  const span = grid.cols + grid.rows;
  const cells = [];
  if (phase !== "idle") {
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        const o = (x + y + (BAYER4[(y % 4) * 4 + (x % 4)] / 16) * 3) / (span + 2);
        cells.push(<span key={y * grid.cols + x} style={{ "--o": o.toFixed(3) } as CSSProperties} />);
      }
    }
  }

  return (
    <div
      ref={rootRef}
      data-phase={phase}
      className={cn(styles.wipe, className)}
      style={
        {
          "--cell": `${cell}px`,
          "--cols": grid.cols,
          "--half": `${duration}ms`,
          ...(color ? { "--block": color } : null),
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className={styles.content} inert={pending || undefined}>
        {pending ? shown.content : children}
      </div>
      {phase !== "idle" && (
        <div key={phase} className={styles.blocks} aria-hidden="true">
          {cells}
        </div>
      )}
    </div>
  );
}
