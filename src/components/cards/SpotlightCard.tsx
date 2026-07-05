"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  /** CSS color for the cursor-following glow. */
  spotlightColor?: string;
  /** Radius of the glow in pixels. */
  spotlightRadius?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(139, 92, 246, 0.22)",
  spotlightRadius = 260,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Written to CSS variables instead of React state so cursor tracking
  // never re-renders the subtree.
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", e.clientX - rect.left + "px");
    el.style.setProperty("--spot-y", e.clientY - rect.top + "px");
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6 " +
        className
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(" +
            spotlightRadius +
            "px circle at var(--spot-x, 50%) var(--spot-y, 50%), " +
            spotlightColor +
            ", transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-colors duration-300 group-hover:border-white/15"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
