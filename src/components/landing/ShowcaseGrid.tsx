"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { docEntries } from "@/data/docs";
import LazyMount from "@/components/LazyMount";
import RevealSection from "@/components/docs/RevealSection";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { CARD_HOVER_TRANSITION } from "@/lib/motion";

const FEATURED_SLUGS = [
  "glow-button",
  "x-ray-scanner-button",
  "spotlight-card",
  "animated-tabs",
  "meteors",
  "liquid-text",
  "mercury-loader",
  "floating-navbar",
  "bento-grid",
  "border-beam",
  "command-menu",
];

export default function ShowcaseGrid() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotionSafe();
  const entries = FEATURED_SLUGS
    .map((slug) => docEntries.find((e) => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <RevealSection id="showcase" className="border-b border-border px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Components</span>
            <h2 className="mt-3 text-[length:var(--text-display-sm)] font-semibold tracking-tight text-foreground">
              Featured work
            </h2>
          </div>
          <Link
            href="/components"
            className="hidden font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            View all ↗
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry, i) => {
            const Preview = entry.Preview;
            return (
              <motion.div
                key={entry.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                whileHover={prefersReducedMotion ? undefined : { y: -4, transition: CARD_HOVER_TRANSITION }}
                onClick={() => router.push(`/components/${entry.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push(`/components/${entry.slug}`);
                }}
                role="link"
                tabIndex={0}
                className="group cursor-pointer overflow-hidden rounded-[var(--radius-card)] border border-border bg-card"
              >
                <div
                  className={`relative flex h-44 items-center justify-center overflow-hidden p-4 ${
                    entry.needsLightPreview ? "bg-white" : "bg-[#0f0f13]"
                  }`}
                >
                  <LazyMount>
                    <Preview />
                  </LazyMount>
                  <div className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm">
                    {entry.category}
                  </div>
                </div>
                <div className="border-t border-border px-4 py-3">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-[var(--accent-locked)]">
                    {entry.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/components"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            View all components ↗
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}
