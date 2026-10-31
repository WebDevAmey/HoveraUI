"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./dither-field.module.css";

export type DitherFieldProps = HTMLAttributes<HTMLDivElement> & {
  /** Colour of the lit dither cells. Any CSS colour, including var(). */
  ink?: string;
  /** Colour of the ground. Any CSS colour, including var(). */
  paper?: string;
  /** Size of one dither cell in CSS px. */
  pixelSize?: number;
  /** Drift speed multiplier. 0 holds a still frame. */
  speed?: number;
};

// 8×8 Bayer matrix, normalised to (0, 1).
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3,
  35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

/** Resolves any CSS colour (var(), color-mix, oklch…) to packed RGBA through a 1×1 canvas. */
function resolveColor(probe: HTMLElement, ctx: CanvasRenderingContext2D, littleEndian: boolean) {
  const css = getComputedStyle(probe).color;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return littleEndian ? ((a << 24) | (b << 16) | (g << 8) | r) >>> 0 : ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
}

/**
 * A slow gradient field quantised through an 8×8 Bayer matrix into two tones.
 * Rendered at 1/pixelSize resolution and scaled up with crisp pixels.
 */
export function DitherField({
  ink,
  paper,
  pixelSize = 3,
  speed = 1,
  className,
  style,
  children,
  ...props
}: DitherFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const paperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const inkProbe = inkRef.current;
    const paperProbe = paperRef.current;
    if (!root || !canvas || !inkProbe || !paperProbe) return;
    const ctx = canvas.getContext("2d");
    const swatch = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx || !swatch) return;
    swatch.canvas.width = swatch.canvas.height = 1;

    const littleEndian = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cell = Math.max(1, Math.round(pixelSize));

    let cols = 0;
    let rows = 0;
    let image: ImageData | null = null;
    let pixels: Uint32Array | null = null;
    let inkRGBA = 0;
    let paperRGBA = 0;
    let colorsDirty = true;
    let visible = false;
    let raf = 0;
    let last = 0;
    // Field time advances only while drawing, so pausing never causes a jump.
    let t = 7.3;

    const resize = () => {
      const { width, height } = root.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      image = ctx.createImageData(cols, rows);
      pixels = new Uint32Array(image.data.buffer);
    };

    const draw = () => {
      if (!image || !pixels) return;
      if (colorsDirty) {
        inkRGBA = resolveColor(inkProbe, swatch, littleEndian);
        paperRGBA = resolveColor(paperProbe, swatch, littleEndian);
        colorsDirty = false;
      }
      // Three soft masses on slow Lissajous paths over a ground that thickens toward the bottom.
      const aspect = cols / rows;
      const ax = 0.5 + 0.34 * Math.sin(t * 0.11), ay = 0.42 + 0.22 * Math.cos(t * 0.13);
      const bx = 0.28 + 0.24 * Math.cos(t * 0.07 + 1.9), by = 0.7 + 0.2 * Math.sin(t * 0.09 + 0.6);
      const cx = 0.78 + 0.18 * Math.sin(t * 0.05 + 4.1), cy = 0.3 + 0.26 * Math.sin(t * 0.08 + 2.3);
      const swirl = t * 0.04;
      const invRows = 1 / rows;
      for (let y = 0; y < rows; y++) {
        const ny = y * invRows;
        const row = y * cols;
        const by8 = (y & 7) << 3;
        for (let x = 0; x < cols; x++) {
          const nx = (x * invRows) / aspect;
          let dx = (nx - ax) * aspect, dy = ny - ay;
          let v = 0.62 / (1 + 7 * (dx * dx + dy * dy));
          dx = (nx - bx) * aspect; dy = ny - by;
          v += 0.5 / (1 + 11 * (dx * dx + dy * dy));
          dx = (nx - cx) * aspect; dy = ny - cy;
          v += 0.42 / (1 + 14 * (dx * dx + dy * dy));
          v = v * 0.7 + 0.42 * ny * ny + 0.08 * Math.sin(nx * 2.2 - ny * 1.4 + swirl);
          v -= 0.24;
          pixels[row + x] = v > BAYER[by8 | (x & 7)] ? inkRGBA : paperRGBA;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || motion.matches || speed === 0) return;
      raf = requestAnimationFrame(loop);
      // ~20 fps is plenty for a drift this slow, and keeps the CPU quiet.
      if (now - last < 48) return;
      t += (last ? Math.min(now - last, 100) : 48) * 0.001 * speed;
      last = now;
      draw();
    };

    const start = () => {
      if (raf || !visible || document.hidden || motion.matches || speed === 0) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    const refresh = () => {
      colorsDirty = true;
      draw();
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(root);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(root);

    // Theme scopes are attributes on ancestors; re-read colours when any changes.
    const mo = new MutationObserver(refresh);
    mo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["data-theme", "class"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", refresh);

    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);
    const onMotion = () => {
      draw();
      start();
    };
    motion.addEventListener("change", onMotion);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      scheme.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, [pixelSize, speed, ink, paper]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.field, className)}
      style={
        {
          ...(ink ? { "--df-ink": ink } : null),
          ...(paper ? { "--df-paper": paper } : null),
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <span ref={inkRef} className={styles.probeInk} aria-hidden="true" />
      <span ref={paperRef} className={styles.probePaper} aria-hidden="true" />
      {children != null && <div className={styles.content}>{children}</div>}
    </div>
  );
}
