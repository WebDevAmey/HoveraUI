"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";
import AnimatedTabs from "@/components/tabs/AnimatedTabs";

const BEATS = [
  {
    index: "01",
    title: "It notices the cursor arrive.",
    copy: "Every Hovera component treats hover as the first frame of the interaction, not a color swap. Light follows the pointer; surfaces lift to meet it.",
  },
  {
    index: "02",
    title: "It responds before the click.",
    copy: "Springs, staggers and shared elements answer intent immediately — the pill slides to the tab you're about to choose, not the one you left.",
  },
  {
    index: "03",
    title: "It ships as code you own.",
    copy: "One CLI command drops the exact file into your project, dependencies resolved. No wrapper library, no lock-in, nothing to unwind later.",
  },
];

function Beat({
  beat,
  visual,
  progress,
  range,
}: {
  beat: (typeof BEATS)[number];
  visual: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [start, end] = range;
  const mid = (start + end) / 2;
  const fadeSpan = (end - start) * 0.22;

  // Each beat owns a band of the pin: fade/slide in at the band's start,
  // hold through the middle, hand off at the end (last beat holds).
  const opacity = useTransform(
    progress,
    [start, start + fadeSpan, end - (end === 1 ? 0 : fadeSpan), end],
    [start === 0 ? 1 : 0, 1, 1, end === 1 ? 1 : 0]
  );
  const y = useTransform(progress, [start, mid], [start === 0 ? 0 : 36, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 grid items-center gap-10 lg:grid-cols-2"
    >
      <div>
        <span
          className="font-mono text-sm bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          {beat.index}
        </span>
        <h2 className="mt-3 text-[length:var(--text-display-sm)] font-semibold tracking-tight text-foreground">
          {beat.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{beat.copy}</p>
      </div>
      <div className="hidden items-center justify-center lg:flex">{visual}</div>
    </motion.div>
  );
}

/**
 * The anticipatory-UI story in three pinned beats: a 300vh runway with a
 * sticky viewport panel; copy and live component visuals crossfade against
 * scroll progress. Reduced motion unpins everything into a static stack.
 */
export default function AnticipatoryScenes() {
  const prefersReducedMotion = useReducedMotionSafe();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const visuals = [
    <SpotlightCardDemo key="v1" />,
    <AnimatedTabs key="v2" />,
    <div
      key="v3"
      className="w-full max-w-sm rounded-xl border border-border bg-surface-1 p-4 font-mono text-xs leading-relaxed text-muted-foreground"
    >
      <p className="text-glow-2">$ npx shadcn@latest add @hovera/spotlight-card</p>
      <p className="mt-2">✔ Checking registry.</p>
      <p>✔ Installing dependencies.</p>
      <p>
        ✔ Created 1 file: <span className="text-foreground">components/ui/spotlight-card.tsx</span>
      </p>
    </div>,
  ];

  if (prefersReducedMotion) {
    return (
      <section className="border-b border-border px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl space-y-16">
          {BEATS.map((beat, i) => (
            <div key={beat.index} className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="font-mono text-sm text-muted-foreground">{beat.index}</span>
                <h2 className="mt-3 text-[length:var(--text-display-sm)] font-semibold tracking-tight text-foreground">
                  {beat.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{beat.copy}</p>
              </div>
              <div className="hidden items-center justify-center lg:flex">{visuals[i]}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-border">
      <div ref={trackRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 md:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="relative mx-auto h-[24rem] w-full max-w-6xl">
            <Beat beat={BEATS[0]} visual={visuals[0]} progress={scrollYProgress} range={[0, 0.38]} />
            <Beat beat={BEATS[1]} visual={visuals[1]} progress={scrollYProgress} range={[0.38, 0.72]} />
            <Beat beat={BEATS[2]} visual={visuals[2]} progress={scrollYProgress} range={[0.72, 1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
