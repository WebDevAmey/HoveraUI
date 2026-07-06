"use client";

import { useEffect, useRef } from "react";

interface PixelTrailProps {
  /** Size of one pixel cell in px. */
  cellSize?: number;
  /** Seconds for a lit cell to fade back to black. */
  fadeSeconds?: number;
  className?: string;
}

export default function PixelTrail({
  cellSize = 22,
  fadeSeconds = 1.1,
  className = "",
}: PixelTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cells light to white where the pointer passes and decay each frame.
  // Under reduced motion the canvas stays dark and the label still reads.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let cols = 0;
    let cells = new Float32Array(0);
    let raf = 0;
    let active = false;

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cellSize);
      cells = new Float32Array(cols * Math.ceil(height / cellSize));
    }

    function light(x: number, y: number) {
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      const index = row * cols + col;
      if (index >= 0 && index < cells.length) cells[index] = 1;
      if (!active) {
        active = true;
        raf = requestAnimationFrame(frame);
      }
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const decay = 1 / (fadeSeconds * 60);
      let alive = false;
      for (let i = 0; i < cells.length; i++) {
        const v = cells[i];
        if (v <= 0) continue;
        alive = true;
        cells[i] = v - decay;
        const col = i % cols;
        const row = (i - col) / cols;
        ctx.fillStyle = "rgba(255,255,255," + (v * 0.9).toFixed(3) + ")";
        ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
      }
      if (alive) raf = requestAnimationFrame(frame);
      else active = false;
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      light(e.clientX - rect.left, e.clientY - rect.top);
    }

    resize();
    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
    };
  }, [cellSize, fadeSeconds]);

  return (
    <div className={"relative h-screen overflow-hidden bg-neutral-950 " + className}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-sm tracking-widest text-neutral-600 uppercase">Move your cursor</p>
      </div>
    </div>
  );
}
