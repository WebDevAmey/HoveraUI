"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./dither-image.module.css";

export type DitherImageProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  src: string;
  alt: string;
  /** Size of one dither cell in CSS px. */
  pixelSize?: number;
  /** The two tones, any CSS colours. Defaults to ink and surface tokens. */
  tones?: [string, string];
  /** Width / height of the frame, as a CSS aspect-ratio. */
  ratio?: string;
  /** Caption shown in the mono row below the image. */
  caption?: ReactNode;
};

// 8×8 Bayer matrix, normalised to (0, 1).
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3,
  35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

const RESOLVE_MS = 560;

function rgbOf(probe: HTMLElement, ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = getComputedStyle(probe).color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b] as const;
}

/**
 * An image drawn through two-tone ordered dither. Hover, focus or tap resolves it
 * to full colour: a dithered front sweeps down and clears the cells it passes.
 */
export function DitherImage({
  src,
  alt,
  pixelSize = 3,
  tones,
  ratio = "4 / 3",
  caption,
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerUp,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: DitherImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const darkRef = useRef<HTMLSpanElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  // Progress of the resolve, 0 dithered → 1 full colour. Lives outside React.
  const progress = useRef(0);
  const redraw = useRef<() => void>(() => {});
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const resolved = hovered || focused || pinned;

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const darkProbe = darkRef.current;
    const lightProbe = lightRef.current;
    if (!frame || !canvas || !darkProbe || !lightProbe) return;
    const ctx = canvas.getContext("2d");
    const work = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx || !work) return;

    const cell = Math.max(1, Math.round(pixelSize));
    let cols = 0;
    let rows = 0;
    let luma: Float32Array | null = null;
    let order: Float32Array | null = null;
    let out: ImageData | null = null;
    let alive = true;

    // Hide the colour image until the first dithered frame covers it. Without
    // script the attribute never appears and the plain image shows.
    frame.dataset.pending = "";
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";

    const sample = () => {
      if (!img.naturalWidth) return;
      const { width, height } = frame.getBoundingClientRect();
      cols = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;

      // Cover-fit the image into the low-resolution grid.
      work.canvas.width = cols;
      work.canvas.height = rows;
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      work.imageSmoothingQuality = "high";
      work.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
      const data = work.getImageData(0, 0, cols, rows).data;

      luma = new Float32Array(cols * rows);
      order = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const r = data[i * 4] / 255, g = data[i * 4 + 1] / 255, b = data[i * 4 + 2] / 255;
          luma[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          // When each cell clears: top to bottom, roughened by the Bayer rank.
          const bayer = BAYER[((y & 7) << 3) | (x & 7)];
          order[i] = (y / rows) * 0.72 + bayer * 0.28;
        }
      }
      // Auto-levels, then a gentle S-curve, so midtones keep their separation.
      let lo = 1;
      let hi = 0;
      for (const l of luma) {
        lo = Math.min(lo, l);
        hi = Math.max(hi, l);
      }
      const span = Math.max(0.05, hi - lo);
      for (let i = 0; i < luma.length; i++) {
        const l = (luma[i] - lo) / span;
        luma[i] = l * l * (3 - 2 * l) * 0.7 + l * 0.3;
      }
      out = ctx.createImageData(cols, rows);
      paint();
    };

    const paint = () => {
      if (!luma || !order || !out) return;
      const a = rgbOf(darkProbe, work);
      const b = rgbOf(lightProbe, work);
      // Map dark pixels to whichever tone is darker, so the image never inverts.
      const swap = a[0] + a[1] + a[2] > b[0] + b[1] + b[2];
      const dark = swap ? b : a;
      const light = swap ? a : b;
      const p = progress.current;
      const px = out.data;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const o = i * 4;
          if (order[i] < p) {
            px[o + 3] = 0;
            continue;
          }
          const tone = luma[i] > BAYER[((y & 7) << 3) | (x & 7)] ? light : dark;
          px[o] = tone[0];
          px[o + 1] = tone[1];
          px[o + 2] = tone[2];
          px[o + 3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);
      delete frame.dataset.pending;
    };

    redraw.current = paint;
    img.onload = () => alive && sample();
    img.src = src;

    const ro = new ResizeObserver(() => sample());
    ro.observe(frame);
    const mo = new MutationObserver(() => paint());
    mo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["data-theme", "class"] });

    return () => {
      alive = false;
      ro.disconnect();
      mo.disconnect();
      redraw.current = () => {};
    };
  }, [src, pixelSize]);

  const darkTone = tones?.[0];
  const lightTone = tones?.[1];
  useEffect(() => {
    redraw.current();
  }, [darkTone, lightTone]);

  // Step the resolve toward its target. Quantised to 24 steps for a stepped feel.
  useEffect(() => {
    const target = resolved ? 1 : 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progress.current = target;
      redraw.current();
      return;
    }
    let raf = 0;
    let last = performance.now();
    let raw = progress.current;
    const tick = (now: number) => {
      const step = (now - last) / RESOLVE_MS;
      last = now;
      raw = target > raw ? Math.min(target, raw + step) : Math.max(target, raw - step);
      progress.current = Math.round(raw * 24) / 24;
      redraw.current();
      if (raw !== target) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [resolved]);

  const toneVars = tones ? ({ "--di-dark": darkTone, "--di-light": lightTone } as CSSProperties) : null;

  return (
    <figure
      tabIndex={0}
      data-resolved={resolved || undefined}
      className={cn(styles.figure, className)}
      style={{ ...toneVars, ...style }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setHovered(false);
        onPointerLeave?.(e);
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") setPinned((v) => !v);
        onPointerUp?.(e);
      }}
      onFocus={(e) => {
        if (e.target === e.currentTarget && e.currentTarget.matches(":focus-visible")) setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setFocused(false);
          setPinned(!resolved);
        }
        onKeyDown?.(e);
      }}
      {...props}
    >
      <div ref={frameRef} className={styles.frame} style={{ aspectRatio: ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- the component must stay framework-free */}
        <img className={styles.image} src={src} alt={alt} draggable={false} />
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <span ref={darkRef} className={styles.probeDark} aria-hidden="true" />
        <span ref={lightRef} className={styles.probeLight} aria-hidden="true" />
      </div>
      {caption != null && (
        <figcaption className={styles.caption}>
          <span className={styles.captionText}>{caption}</span>
          <span className={styles.state} aria-hidden="true">
            {resolved ? "Full colour" : "8×8 · 2 tone"}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
