"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CARD_HOVER_TRANSITION } from "@/lib/motion";

interface CursorGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function CursorGlowCard({ children, className }: CursorGlowCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={CARD_HOVER_TRANSITION}
      className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card ${className ?? ""}`}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
