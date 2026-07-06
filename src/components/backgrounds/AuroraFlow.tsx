"use client";

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
}
