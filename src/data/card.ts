import type React from "react";
import type { ComponentItem } from "@/types";

import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";
import TiltCardDemo from "@/components/cards/TiltCardDemo";
import BorderBeam from "@/components/cards/BorderBeam";

export const cards: ComponentItem[] = [
  {
    name: "Spotlight Card",
    slug: "spotlight-card",
    category: "cards",
    component: SpotlightCardDemo as React.ComponentType,
    description: "A card with a cursor-tracking radial spotlight and a subtle hover lift.",
    dependencies: ["framer-motion"],
    code: `"use client";

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
  spotlightColor = "rgba(255,255,255,0.16)",
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
}`,
  },
  {
    name: "Tilt Card",
    slug: "tilt-card",
    category: "cards",
    component: TiltCardDemo as React.ComponentType,
    description: "A 3D perspective card that banks toward the cursor on springs and stays flat on touch devices.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children?: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
}

export default function TiltCard({ children, className = "", maxTilt = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), { stiffness: 260, damping: 24 });

  // Mouse-only by design: on touch devices (no hover) the card stays flat.
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          prefersReducedMotion
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        className={
          "relative rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-xl shadow-black/30 " +
          className
        }
      >
        <div style={{ transform: "translateZ(24px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}`,
  },
  {
    name: "Border Beam",
    slug: "border-beam",
    category: "cards",
    component: BorderBeam as React.ComponentType,
    description: "A colorful beam runs laps around the card border, built on magicui's offset-path animation.",
    code: `"use client";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

export default function BorderBeamCard({
  children,
  duration = 8,
  size = 100,
  className,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
}: {
  children?: React.ReactNode;
  duration?: number;
  size?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 p-6", className)}>
      {children}
      <BorderBeam duration={duration} size={size} colorFrom={colorFrom} colorTo={colorTo} />
    </div>
  );
}`,
  },
];
