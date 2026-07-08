import type React from "react";
import type { BackgroundItem } from "@/types";
import Spotlight from "@/components/backgrounds/Spotlight";
import AuroraFlow from "@/components/backgrounds/AuroraFlow";
import Beams from "@/components/backgrounds/Beams";

export const backgrounds: BackgroundItem[] = [
  {
    name: "Spotlight",
    slug: "spotlight",
    category: "gradient",
    component: Spotlight as React.ComponentType,
    code: `<div className="relative h-screen bg-black overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: \`
        radial-gradient(
          80% 80% at 50% 0%,
          rgba(247,247,247,.4),
          transparent 60%
        ),
        radial-gradient(
          80% 80% at 50% 100%,
          rgba(246,246,246,.4),
          transparent 60%
        )
      \`,
    }}
  />
</div>`,
  },
  {
    name: "Aurora Flow",
    slug: "aurora-flow",
    category: "gradient",
    component: AuroraFlow as React.ComponentType,
    description: "Three drifting aurora blobs in continuous motion, transform-only and reduced-motion safe.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AuroraFlow() {
  const prefersReducedMotion = useReducedMotion();

  const drift = (xs: number[], ys: number[], duration: number) =>
    prefersReducedMotion
      ? undefined
      : {
          x: xs,
          y: ys,
          transition: { duration, ease: "easeInOut" as const, repeat: Infinity, repeatType: "mirror" as const },
        };

  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <motion.div
        aria-hidden
        animate={drift([0, 120, -60], [0, -80, 40], 18)}
        className="absolute -top-1/4 left-1/4 h-[60vh] w-[60vh] rounded-full bg-neutral-600/30 blur-[120px] will-change-transform"
      />
      <motion.div
        aria-hidden
        animate={drift([0, -100, 80], [0, 60, -50], 22)}
        className="absolute top-1/3 right-1/5 h-[50vh] w-[50vh] rounded-full bg-neutral-500/25 blur-[110px] will-change-transform"
      />
      <motion.div
        aria-hidden
        animate={drift([0, 70, -90], [0, -50, 70], 26)}
        className="absolute bottom-0 left-1/3 h-[45vh] w-[45vh] rounded-full bg-neutral-500/20 blur-[100px] will-change-transform"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.7))]" />
    </div>
  );
}`,
  },
  {
    name: "Beams",
    slug: "beams",
    category: "gradient",
    component: Beams as React.ComponentType,
    description: "Falling light beams on a dark field, pure CSS keyframes with a paused reduced-motion state.",
    code: `"use client";

const BEAMS = [
  { left: "10%", delay: "0s", duration: "7s", width: "2px", color: "rgba(246,246,246,0.5)" },
  { left: "30%", delay: "2.2s", duration: "9s", width: "1px", color: "rgba(238,238,238,0.45)" },
  { left: "52%", delay: "1.1s", duration: "8s", width: "2px", color: "rgba(249,249,249,0.4)" },
  { left: "72%", delay: "3.4s", duration: "10s", width: "1px", color: "rgba(246,246,246,0.45)" },
  { left: "88%", delay: "0.6s", duration: "7.5s", width: "2px", color: "rgba(238,238,238,0.4)" },
];

export default function Beams() {
  return (
    <div className="relative h-screen overflow-hidden bg-neutral-950">
      <style>{"@keyframes hovera-beam { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }"}</style>
      {BEAMS.map((beam, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute top-0 h-2/5 motion-reduce:[animation-play-state:paused]"
          style={{
            left: beam.left,
            width: beam.width,
            background: "linear-gradient(to bottom, transparent, " + beam.color + ", transparent)",
            animation: "hovera-beam " + beam.duration + " linear " + beam.delay + " infinite",
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(246,246,246,0.12), transparent 60%)",
        }}
      />
    </div>
  );
}`,
  },
];
