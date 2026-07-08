"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import LightLines from "@/components/backgrounds/LightLines";
import CopyButton from "@/components/CopyButton";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const INSTALL = "npx shadcn@latest add @hovera/displacement-text";

function entrance(delaySeconds: number): React.CSSProperties {
  return { animation: `fadeUp 0.55s var(--ease-flow) ${delaySeconds}s both` };
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={sectionRef}
      className="dark relative overflow-hidden border-b border-white/10 bg-[#09090b]"
    >
      <div aria-hidden className="absolute inset-0 opacity-40">
        <LightLines />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, transparent 30%, rgba(9,9,11,0.9))" }}
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY }}
        className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center md:px-8"
      >
        <div
          style={entrance(0.05)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-neutral-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" aria-hidden="true" />
          Hovera UI
        </div>

        <h1
          style={entrance(0.15)}
          className="mt-10 text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.85] tracking-tighter text-white"
        >
          Hovera UI
        </h1>

        <p
          style={entrance(0.3)}
          className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg"
        >
          Interfaces that respond before you click. Over thirty signature components built around hover, motion, and tasteful color accents.
        </p>

        <div
          style={entrance(0.55)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/components"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white px-7 py-3 text-sm font-medium text-[#09090b] transition-all hover:bg-neutral-100"
          >
            Browse components
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">↗</span>
          </Link>
          <div className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] py-1.5 pr-1.5 pl-4 font-mono text-xs text-neutral-500 backdrop-blur-sm">
            <span className="hidden sm:inline">{INSTALL}</span>
            <span className="sm:hidden">npx shadcn add @hovera/…</span>
            <CopyButton code={INSTALL} label="Copy" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
