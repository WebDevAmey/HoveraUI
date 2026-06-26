"use client";

import { useState } from "react";

export type GlowButtonSize = "sm" | "md" | "lg";

export interface GlowButtonDemoProps {
  label?: string;
  size?: GlowButtonSize;
  glowColor?: string;
  disabled?: boolean;
}

const SIZE_CLASSES: Record<GlowButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Props-driven demo wrapper around GlowButton so the docs Props table has
 * real, exercisable content (the original GlowButton only takes isHovered).
 */
export default function GlowButtonDemo({
  label = "Glow Button",
  size = "md",
  glowColor = "139, 92, 246",
  disabled = false,
}: GlowButtonDemoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-xl bg-violet-600 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 ${SIZE_CLASSES[size]}`}
      style={{
        transition: "transform 300ms, box-shadow 300ms",
        transform: isHovered && !disabled ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered && !disabled ? `0 0 30px rgba(${glowColor}, 0.8)` : "none",
      }}
    >
      {label}
    </button>
  );
}
