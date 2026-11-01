"use client";

import { useEffect, useState } from "react";
import { LedMeter } from "./led-meter";

// A deterministic signal: a few slow sines, not real audio.
function level(t: number, phase: number) {
  const body = 0.5 + 0.22 * Math.sin(t * 1.7 + phase) + 0.14 * Math.sin(t * 4.3 + phase * 2);
  const hit = Math.max(0, Math.sin(t * 2.6 + phase)) ** 12 * 0.32;
  return Math.round(Math.min(1, Math.max(0.05, body + hit)) * 100);
}

export default function Demo() {
  const [t, setT] = useState(0.9);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 50 || document.hidden) return;
      last = now;
      setT(now / 1000);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ width: "min(100%, 340px)" }}>
      <LedMeter label="Input" value={level(t, 0)} segments={20} />
    </div>
  );
}
