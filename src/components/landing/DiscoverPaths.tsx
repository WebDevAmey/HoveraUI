"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import RevealSection from "@/components/docs/RevealSection";
import { CARD_HOVER_TRANSITION } from "@/lib/motion";

const PATHS = [
  {
    title: "Forge the interaction",
    description: "Buttons that answer the cursor before the click, glows, ripples, sweeps and lifts.",
    href: "/docs/x-ray-scanner-button",
    cta: "Browse buttons",
  },
  {
    title: "Tune the motion",
    description: "Backgrounds and loaders that carry presence on their own, auroras, spotlights, drift.",
    href: "/docs/aurora-flow",
    cta: "Browse motion",
  },
  {
    title: "Ship via registry",
    description: "One CLI command per component, resolved from your own registry URL, no copy paste required.",
    href: "/docs/x-ray-scanner-button#installation",
    cta: "See installation",
  },
];

export default function DiscoverPaths() {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <RevealSection id="discover" className="border-b border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Three ways in</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Start wherever you&apos;re building, the interaction, the motion behind it, or the way it ships.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PATHS.map((path) => (
            <motion.div
              key={path.title}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              transition={CARD_HOVER_TRANSITION}
            >
              <Link
                href={path.href}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-6 transition-colors hover:border-hovera/50"
              >
                <h3 className="text-base font-semibold tracking-tight text-foreground">{path.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-hovera">
                  {path.cta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
