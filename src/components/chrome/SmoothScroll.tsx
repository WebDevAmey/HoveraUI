"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * App-wide Lenis smooth scroll. Root mode animates the real window scroll,
 * so native scroll events (Framer Motion useScroll, the docs scroll-spy TOC)
 * keep working unchanged. Disabled entirely under prefers-reduced-motion and
 * left off for touch input (Lenis default), where native scrolling wins.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.115,
      wheelMultiplier: 1,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
