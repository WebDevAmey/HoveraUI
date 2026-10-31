import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./grain.module.css";

export type GrainProps = HTMLAttributes<HTMLDivElement> & {
  /** Opacity of the grain, from 0 to 1. */
  intensity?: number;
  /** Any CSS mix-blend-mode. */
  blend?: CSSProperties["mixBlendMode"];
  /** Grain scale. 1 is fine 35mm grain; 2 is coarser. */
  size?: number;
};

// Fractal noise, desaturated, tiled seamlessly. Grey sits at 50% so blend
// modes like overlay and soft-light leave the average tone untouched.
const NOISE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">` +
      `<filter id="n" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">` +
      `<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" stitchTiles="stitch"/>` +
      `<feColorMatrix values="0.75 0.75 0.75 0 -0.62  0.75 0.75 0.75 0 -0.62  0.75 0.75 0.75 0 -0.62  0 0 0 0 1"/>` +
      `</filter>` +
      `<rect width="100%" height="100%" filter="url(#n)"/>` +
      `</svg>`,
  );

/** A static film-grain layer. Place it inside a positioned parent; it covers it and ignores the pointer. */
export function Grain({ intensity = 0.35, blend = "overlay", size = 1, className, style, ...props }: GrainProps) {
  const clamped = Math.min(1, Math.max(0, intensity));
  return (
    <div
      aria-hidden="true"
      className={cn(styles.grain, className)}
      style={
        {
          "--grain-image": `url("${NOISE}")`,
          "--grain-opacity": clamped,
          "--grain-size": `${Math.round(180 * Math.max(0.25, size))}px`,
          mixBlendMode: blend,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
