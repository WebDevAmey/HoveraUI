"use client";

import { useEffect, useRef, useState, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./ascii-resolve.module.css";

export type AsciiResolveProps = HTMLAttributes<HTMLDivElement> & {
  /** Change this value to play the resolve again. */
  replayKey?: string | number;
  /** Glyph colour. Any CSS colour. */
  color?: string;
  /** Colour of the field that hides the content; match what sits behind it. */
  background?: string;
  /** Total length of the resolve in ms. */
  duration?: number;
  /** Glyph ramp from empty to dense. */
  ramp?: string;
};

const FONT_SIZE = 12;
const LINE = 14;

/** Small deterministic hash so glyph noise is stable per cell and tick. */
function hash(a: number, b: number, c: number) {
  let h = (a * 374761393 + b * 668265263 + c * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/**
 * Content that resolves out of a field of monospace glyphs. Columns scramble,
 * then decay down the ramp from dense to empty, left to right.
 */
export function AsciiResolve({
  replayKey,
  color,
  background,
  duration = 1400,
  ramp = " .:-=+*#%@",
  className,
  style,
  children,
  ...props
}: AsciiResolveProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"waiting" | "running" | "done">("waiting");

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setPhase("done"));
      return;
    }

    let raf = 0;
    let start = 0;
    let width = 0;
    let height = 0;
    let charW = 7.2;
    let cols = 0;
    let rows = 0;
    let fg = "";
    let bg = "";
    const glyphs = ramp.length - 1;

    const measure = () => {
      const rect = root.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cs = getComputedStyle(canvas);
      ctx.font = `${FONT_SIZE}px ${cs.fontFamily}`;
      charW = ctx.measureText("M").width || 7.2;
      cols = Math.ceil(width / charW);
      rows = Math.ceil(height / LINE);
      fg = cs.color;
      bg = cs.outlineColor;
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / duration;
      // Glyphs re-roll at ~16 Hz, not every frame: it reads as a terminal, not noise.
      const tick = Math.floor((now - start) / 60);
      ctx.clearRect(0, 0, width, height);
      ctx.textBaseline = "middle";
      let covered = false;
      for (let c = 0; c < cols; c++) {
        // Each column starts clearing at its own time, left to right with a little jitter.
        const open = (c / cols) * 0.62 + hash(c, 7, 1) * 0.12;
        const local = (t - open) / 0.26;
        if (local >= 1) continue;
        covered = true;
        const x = c * charW;
        ctx.fillStyle = bg;
        ctx.fillRect(x, 0, charW + 0.5, height);
        ctx.fillStyle = fg;
        for (let r = 0; r < rows; r++) {
          let level: number;
          if (local < 0) {
            // Scrambling: a slow wave of density with per-cell flicker.
            const wave = 0.5 + 0.35 * Math.sin(c * 0.21 + r * 0.43 + t * 6);
            level = Math.round((wave * 0.7 + hash(c, r, tick) * 0.3) * glyphs);
          } else {
            // Decaying: the cell walks down the ramp toward a space.
            const head = (1 - local) * glyphs + (hash(c, r, 3) - 0.5) * 2;
            level = Math.max(0, Math.min(glyphs, Math.round(head * (0.6 + hash(c, r, tick) * 0.4))));
          }
          if (level > 0) ctx.fillText(ramp[level], x, r * LINE + LINE / 2);
        }
      }
      if (covered) raf = requestAnimationFrame(frame);
      else setPhase("done");
    };

    const run = () => {
      measure();
      setPhase("running");
      start = 0;
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.35 },
    );
    io.observe(root);

    const onVisibility = () => {
      // Finish straight away if the tab is hidden mid-run, rather than stalling.
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        setPhase("done");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [replayKey, duration, ramp]);

  return (
    <div
      ref={rootRef}
      data-phase={phase}
      className={cn(styles.resolve, className)}
      style={
        {
          ...(color ? { "--ar-ink": color } : null),
          ...(background ? { "--ar-bg": background } : null),
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className={styles.content}>{children}</div>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </div>
  );
}
