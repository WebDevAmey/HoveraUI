"use client";

import { useEffect, useRef, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./halftone-trail.module.css";

export type HalftoneTrailProps = HTMLAttributes<HTMLDivElement> & {
  /** Dot colour. Any CSS colour, including var(). */
  color?: string;
  /** Distance between dot centres in CSS px. */
  cell?: number;
  /** Screen angle in degrees. Print screens avoid 0 and 45; 15 is classic. */
  angle?: number;
  /** Brush radius in CSS px. */
  radius?: number;
  /** How long a dot takes to fade out, in ms. */
  fade?: number;
};

/**
 * A surface the pointer prints on. Movement leaves dots on an angled halftone
 * screen; each dot's size is its ink, and the ink fades with time.
 */
export function HalftoneTrail({
  color,
  cell = 10,
  angle = 15,
  radius = 44,
  fade = 1100,
  className,
  style,
  children,
  ...props
}: HalftoneTrailProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const theta = (angle * Math.PI) / 180;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    let width = 0;
    let height = 0;
    let dpr = 1;
    // The screen lives in rotated (u, v) space; we keep the lattice that covers the box.
    let u0 = 0;
    let v0 = 0;
    let cols = 0;
    let rows = 0;
    let ink = new Float32Array(0);
    let fill = "";
    let raf = 0;
    let lastTime = 0;
    let last: { x: number; y: number } | null = null;

    // The canvas element's own `color` is set to the ink, so the browser resolves var() for us.
    const readColor = () => {
      fill = getComputedStyle(canvas).color;
    };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const corners = [
        [0, 0],
        [width, 0],
        [0, height],
        [width, height],
      ].map(([x, y]) => [x * cos + y * sin, -x * sin + y * cos]);
      const us = corners.map((c) => c[0]);
      const vs = corners.map((c) => c[1]);
      u0 = Math.floor(Math.min(...us) / cell) - 1;
      v0 = Math.floor(Math.min(...vs) / cell) - 1;
      cols = Math.ceil(Math.max(...us) / cell) - u0 + 2;
      rows = Math.ceil(Math.max(...vs) / cell) - v0 + 2;
      ink = new Float32Array(cols * rows);
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fill;
      ctx.beginPath();
      let any = false;
      const max = cell * 0.56;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = ink[j * cols + i];
          if (a < 0.02) continue;
          any = true;
          const u = (i + u0) * cell;
          const v = (j + v0) * cell;
          const x = u * cos - v * sin;
          const y = u * sin + v * cos;
          // Dot area tracks ink, so radius follows its square root.
          const r = max * Math.sqrt(a);
          ctx.moveTo(x + r, y);
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      return any;
    };

    const stamp = (x: number, y: number) => {
      const u = x * cos + y * sin;
      const v = -x * sin + y * cos;
      const reach = Math.ceil(radius / cell);
      const ci = Math.round(u / cell) - u0;
      const cj = Math.round(v / cell) - v0;
      for (let j = cj - reach; j <= cj + reach; j++) {
        if (j < 0 || j >= rows) continue;
        for (let i = ci - reach; i <= ci + reach; i++) {
          if (i < 0 || i >= cols) continue;
          const du = (i + u0) * cell - u;
          const dv = (j + v0) * cell - v;
          const d = Math.sqrt(du * du + dv * dv) / radius;
          if (d >= 1) continue;
          const value = (1 - d * d) ** 1.5;
          const k = j * cols + i;
          if (value > ink[k]) ink[k] = value;
        }
      }
    };

    const tick = (now: number) => {
      const dt = lastTime ? now - lastTime : 16;
      lastTime = now;
      const decay = Math.exp(-dt / (fade / 3));
      for (let k = 0; k < ink.length; k++) ink[k] *= decay;
      // Stop the loop as soon as nothing is left to fade.
      if (draw()) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        lastTime = 0;
      }
    };

    const kick = () => {
      if (raf || document.hidden) return;
      lastTime = 0;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (motion.matches) {
        // A single still patch where the pointer last was.
        ink.fill(0);
        stamp(x, y);
        draw();
        return;
      }
      // Fill the gap between events so fast strokes stay continuous.
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const steps = Math.min(24, Math.ceil(Math.hypot(dx, dy) / (cell * 0.8)));
        for (let s = 1; s < steps; s++) stamp(last.x + (dx * s) / steps, last.y + (dy * s) / steps);
      }
      stamp(x, y);
      last = { x, y };
      kick();
    };

    const onLeave = () => {
      last = null;
    };

    readColor();
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    const mo = new MutationObserver(() => {
      readColor();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ["data-theme", "class"] });
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointercancel", onLeave);
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (ink.some((a) => a > 0.02)) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointercancel", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [cell, angle, radius, fade, color]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.trail, className)}
      style={{ ...(color ? { "--ht-ink": color } : null), ...style } as CSSProperties}
      {...props}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      {children != null && <div className={styles.content}>{children}</div>}
    </div>
  );
}
