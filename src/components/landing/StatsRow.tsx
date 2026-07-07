"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { backgrounds } from "@/data/background";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { cards } from "@/data/card";
import { tabs } from "@/data/tab";
import { marquees } from "@/data/marquee";
import { textEffects } from "@/data/text";
import { sections } from "@/data/section";
import { commands } from "@/data/command";
import { docsNav } from "@/data/docs/nav";

function CountUp({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotionSafe();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const reduced = prefersReducedMotion;
    function tick(now: number) {
      if (reduced) {
        setValue(target);
        return;
      }
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, prefersReducedMotion]);

  return <span ref={ref}>{value}</span>;
}

export default function StatsRow() {
  const total =
    backgrounds.length +
    buttons.length +
    loaders.length +
    navbars.length +
    cards.length +
    tabs.length +
    marquees.length +
    textEffects.length +
    sections.length +
    commands.length;
  const families = docsNav.length;

  return (
    <section className="border-b border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-3">
          <div className="bg-card px-6 py-10 text-center">
            <p className="text-4xl font-bold text-foreground tabular-nums">
              <CountUp target={total} />
            </p>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Components
            </p>
          </div>
          <div className="bg-card px-6 py-10 text-center">
            <p className="text-4xl font-bold text-foreground tabular-nums">
              <CountUp target={families} />
            </p>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Families
            </p>
          </div>
          <div className="bg-card px-6 py-10 text-center">
            <p className="text-4xl font-bold text-foreground">CLI</p>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Registry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
