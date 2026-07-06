import type React from "react";
import type { ComponentItem } from "@/types";

import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";
import TiltCardDemo from "@/components/cards/TiltCardDemo";
import BorderBeamDemo from "@/components/cards/BorderBeamDemo";

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
    component: BorderBeamDemo as React.ComponentType,
    description: "A light that runs a continuous lap around the card border, violet into cyan.",
    code: `"use client";

interface BorderBeamProps {
  children?: React.ReactNode;
  /** Seconds per full lap around the border. */
  duration?: number;
  /** CSS colors for the beam's head and tail. */
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export default function BorderBeam({
  children,
  duration = 6,
  colorFrom = "#ffffff",
  colorTo = "#737373",
  className = "",
}: BorderBeamProps) {
  return (
    <div className={"relative overflow-hidden rounded-2xl p-px " + className}>
      <style>{"@keyframes hovera-border-spin { to { transform: rotate(360deg); } }"}</style>
      <div
        aria-hidden
        className="absolute -inset-[100%] motion-reduce:[animation-play-state:paused]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 300deg, " +
            colorFrom +
            " 330deg, " +
            colorTo +
            " 360deg)",
          animation: "hovera-border-spin " + duration + "s linear infinite",
        }}
      />
      <div className="relative rounded-[calc(1rem-1px)] border border-white/5 bg-neutral-950 p-6">
        {children}
      </div>
    </div>
  );
}`,
  },
];
