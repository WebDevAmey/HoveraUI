"use client";

import { useRef } from "react";
import AnimatedBeam from "@/components/ui/animated-beam";

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const r5 = useRef<HTMLDivElement>(null);
  const r6 = useRef<HTMLDivElement>(null);

  return (
    <section className="relative border-b border-neutral-200/50 bg-neutral-50/50 px-4 py-16 dark:border-neutral-800/50 dark:bg-neutral-950/50">
      <div className="mx-auto max-w-5xl">
        <p className="mb-10 text-center font-mono text-xs uppercase tracking-[0.15em] text-neutral-500">
          Built with
        </p>

        <div ref={containerRef} className="relative mx-auto grid w-full max-w-lg grid-cols-3 gap-6 py-8">
          {/* Row 1 */}
          <div ref={r1} className="col-start-1 flex items-center justify-center relative z-10">
            <Pill label="Next.js" />
          </div>
          <div ref={r2} className="col-start-3 flex items-center justify-center relative z-10">
            <Pill label="React" />
          </div>

          {/* Row 2 */}
          <div ref={r3} className="col-start-2 flex items-center justify-center relative z-10">
            <Pill label="TypeScript" highlight />
          </div>

          {/* Row 3 */}
          <div ref={r4} className="col-start-1 flex items-center justify-center relative z-10">
            <Pill label="Tailwind CSS" />
          </div>
          <div ref={r5} className="col-start-3 flex items-center justify-center relative z-10">
            <Pill label="Framer Motion" />
          </div>

          {/* Row 4 */}
          <div ref={r6} className="col-span-3 flex items-center justify-center relative z-10">
            <Pill label="shadcn/ui" />
          </div>

          {/* Animated beams in sequence, one by one */}
          <AnimatedBeam containerRef={containerRef} fromRef={r1} toRef={r3} reverse index={0} totalBeams={6} />
          <AnimatedBeam containerRef={containerRef} fromRef={r2} toRef={r3} reverse index={1} totalBeams={6} />
          <AnimatedBeam containerRef={containerRef} fromRef={r3} toRef={r4} index={2} totalBeams={6} />
          <AnimatedBeam containerRef={containerRef} fromRef={r3} toRef={r5} index={3} totalBeams={6} />
          <AnimatedBeam containerRef={containerRef} fromRef={r4} toRef={r6} index={4} totalBeams={6} />
          <AnimatedBeam containerRef={containerRef} fromRef={r5} toRef={r6} index={5} totalBeams={6} />
        </div>
      </div>
    </section>
  );
}

function Pill({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
        highlight
          ? "border-neutral-800 bg-neutral-800 text-white dark:border-neutral-200 dark:bg-neutral-200 dark:text-neutral-900"
          : "border-neutral-200 bg-white text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
      }`}
    >
      {label}
    </span>
  );
}
