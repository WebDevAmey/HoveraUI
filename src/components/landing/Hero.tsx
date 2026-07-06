"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import LightLines from "@/components/backgrounds/LightLines";
import DisplacementText from "@/components/text/DisplacementText";
import CopyButton from "@/components/CopyButton";
import { MAGNETIC_SPRING } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const INSTALL = "npx shadcn@latest add @hovera/displacement-text";

function entrance(delaySeconds: number): React.CSSProperties {
  return { animation: `fadeUp 0.55s var(--ease-flow) ${delaySeconds}s both` };
}

/**
 * Monochrome hero: the headline IS a library component (DisplacementText)
 * over another one (LightLines) — the products demo themselves. Scoped dark
 * in both themes; text paints first, the streak field is pure CSS behind it.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="dark relative overflow-hidden border-b border-border bg-[#09090b]"
    >
      <div aria-hidden className="absolute inset-0 opacity-60">
        <LightLines />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, rgba(9,9,11,0.85))" }}
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center md:px-8"
      >
        <div
          style={entrance(0.05)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
          The monochrome effect library
        </div>

        <div style={entrance(0.15)} className="mt-8">
          <DisplacementText
            text="HOVERA"
            strength={30}
            radius={160}
            className="text-[clamp(4rem,14vw,11rem)] leading-none tracking-tighter"
          />
        </div>

        <h1 className="mt-4 max-w-2xl text-xl font-medium leading-snug text-neutral-300 sm:text-2xl">
          Interfaces that respond before you click — every effect in pure black and white.
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          No color, no gradients, no glow palettes. Thirty-six signature interactions built from
          light, shadow, displacement and motion — each one a single file you install and own.
        </p>

        <div style={entrance(0.6)} className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            transition={MAGNETIC_SPRING}
            className="inline-block"
          >
            <Link
              href="/components"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-medium text-neutral-950 shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-opacity hover:opacity-90"
            >
              Browse the effects
              <span aria-hidden="true">↗</span>
            </Link>
          </motion.div>
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] py-1.5 pr-1.5 pl-4 font-mono text-xs text-neutral-400 backdrop-blur-sm">
            <span className="hidden sm:inline">{INSTALL}</span>
            <span className="sm:hidden">npx shadcn add @hovera/…</span>
            <CopyButton code={INSTALL} label="Copy" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
