"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { CARD_HOVER_TRANSITION } from "@/lib/motion";

interface CursorGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Card wrapper with a radial glow that follows the cursor on hover.
 * Uses useMotionValue + useMotionTemplate so the glow position updates without
 * triggering React re-renders (Framer Motion writes directly to the DOM style).
 * Falls back to a static, non-tracking glow under prefers-reduced-motion.
 */
export default function CursorGlowCard({ children, className }: CursorGlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(220px circle at ${mouseX}% ${mouseY}%, var(--accent-locked-muted), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={CARD_HOVER_TRANSITION}
      className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card ${className ?? ""}`}
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
