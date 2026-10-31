"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import styles from "./sky-cutout.module.css";

export type SkyCutoutShape = "arch" | "window" | "circle" | "keyhole" | "bird";

export type SkyCutoutProps = HTMLAttributes<HTMLDivElement> & {
  /** Silhouette cut through the card. */
  shape?: SkyCutoutShape;
  /** Height of the opening in px. Its width follows the shape. */
  holeHeight?: number;
};

/** viewBox width, height and the SVG markup of each opening. */
const SHAPES: Record<SkyCutoutShape, [number, number, string]> = {
  arch: [80, 100, '<path d="M0 100V40a40 40 0 0 1 80 0v60z"/>'],
  window: [
    100,
    100,
    '<rect width="47" height="47" rx="2"/><rect x="53" width="47" height="47" rx="2"/><rect y="53" width="47" height="47" rx="2"/><rect x="53" y="53" width="47" height="47" rx="2"/>',
  ],
  circle: [100, 100, '<circle cx="50" cy="50" r="50"/>'],
  keyhole: [60, 100, '<circle cx="30" cy="27" r="25"/><path d="M21 42h18l9 58H12z"/>'],
  bird: [
    120,
    68,
    '<path d="M64 28c-1-7-7-7-8 0C46 14 30 6 2 10c22 6 34 16 44 30 4 6 6 13 6 22l8-5 8 5c0-9 2-16 6-22 10-14 22-24 44-30-28-4-44 4-54 18z"/>',
  ],
};

const maskFor = (shape: SkyCutoutShape) => {
  const [w, h, body] = SHAPES[shape];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${body}</svg>`;
  return { url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, ratio: `${w} / ${h}` };
};

/**
 * An ordinary card with a shape cut through it. Behind the opening a daytime
 * sky drifts by, and it slides against the pointer so the hole reads as deep.
 */
export function SkyCutout({
  shape = "arch",
  holeHeight = 136,
  className,
  style,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: SkyCutoutProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useRef(false);
  const mask = maskFor(shape);

  useEffect(() => {
    const root = rootRef.current;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduced.current = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    // Clouds stop drifting while the card is off-screen.
    const observer = new IntersectionObserver(([entry]) => {
      if (!root) return;
      if (entry.isIntersecting) delete root.dataset.offscreen;
      else root.dataset.offscreen = "";
    });
    if (root) observer.observe(root);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const lean = (x: number, y: number, active: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (active) {
        root.style.setProperty("--px", x.toFixed(3));
        root.style.setProperty("--py", y.toFixed(3));
        root.dataset.tracking = "";
      } else {
        root.style.removeProperty("--px");
        root.style.removeProperty("--py");
        delete root.dataset.tracking;
      }
    });
  };

  return (
    <div
      ref={rootRef}
      data-shape={shape}
      className={cn(styles.root, className)}
      style={{ "--shape": mask.url, "--ratio": mask.ratio, "--hole-h": `${holeHeight}px`, ...style } as CSSProperties}
      onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event);
        if (reduced.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        lean(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)), true);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        lean(0, 0, false);
      }}
      {...props}
    >
      <div className={styles.opening} aria-hidden="true">
        <div className={styles.hole}>
          <div className={styles.sky} />
          <div className={styles.far}>
            <span className={styles.cloud} />
            <span className={styles.cloud} />
          </div>
          <div className={styles.near}>
            <span className={styles.cloud} />
            <span className={styles.cloud} />
            <span className={styles.cloud} />
          </div>
          <span className={styles.rim} data-rim="shade" />
          <span className={styles.rim} data-rim="lip" />
        </div>
      </div>
      {children}
    </div>
  );
}
