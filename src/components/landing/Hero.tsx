"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroGlowCanvas from "@/components/landing/HeroGlowCanvas";
import HoveraFlagshipCard from "@/components/landing/HoveraFlagshipCard";
import { MAGNETIC_SPRING } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const HEADLINE = ["Interfaces", "that", "respond", "before", "you", "click."];

function entrance(delaySeconds: number): React.CSSProperties {
  // CSS-driven entrance: hydration-identical markup, and the global
  // prefers-reduced-motion kill-switch makes it effectively instant.
  return {
    animation: `fadeUp 0.55s var(--ease-flow) ${delaySeconds}s both`,
  };
}

/**
 * Cinematic hero: a self-contained dark glow panel in both themes (the inner
 * `dark` class re-scopes the monochrome tokens, so the flagship preview keeps
 * its dark styling even in light mode). The WebGL glow renders behind the
 * headline; the headline itself is plain DOM text and paints first (LCP).
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="dark relative overflow-hidden border-b border-border bg-[#09090b]"
    >
      <HeroGlowCanvas />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl px-4 pt-20 pb-24 md:px-8 md:pt-28 md:pb-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div
              style={entrance(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-neutral-300 backdrop-blur-sm"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--gradient-brand)" }}
                aria-hidden="true"
              />
              Hover-first component library
            </div>

            <h1
              className="mt-6 text-[length:var(--text-display-md)] font-semibold leading-[1.02] tracking-tight text-white sm:text-[length:var(--text-display-lg)]"
              aria-label={HEADLINE.join(" ")}
            >
              {HEADLINE.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                  aria-hidden
                >
                  <span
                    className="inline-block will-change-transform"
                    style={{
                      animation: `wordUp 0.6s var(--ease-flow) ${0.08 + i * 0.07}s both`,
                    }}
                  >
                    {word === "respond" ? (
                      <span
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: "var(--gradient-brand)" }}
                      >
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    &nbsp;
                  </span>
                </span>
              ))}
            </h1>

            <p
              style={entrance(0.5)}
              className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg"
            >
              Hovera UI is a shadcn-compatible library of buttons, loaders, navbars and
              backgrounds built around the moment a cursor arrives, not just the moment
              it clicks. Preview every interaction live, copy the code, or install it
              straight from the registry.
            </p>

            <div style={entrance(0.62)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={MAGNETIC_SPRING}
                className="inline-block"
              >
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_32px_var(--glow-soft)] transition-opacity hover:opacity-90"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  Browse components
                  <span aria-hidden="true">↗</span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={MAGNETIC_SPRING}
                className="inline-block"
              >
                <Link
                  href="https://github.com/WebDevAmey/HoveraUI"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/[0.08]"
                >
                  Star on GitHub
                </Link>
              </motion.div>
            </div>
          </div>

          <div
            style={entrance(0.45)}
            className="relative flex min-h-[28rem] items-center justify-center rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px rounded-[var(--radius-card)] opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.25), transparent 40%, transparent 60%, rgba(34,211,238,0.18))",
              }}
            />
            <HoveraFlagshipCard />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
