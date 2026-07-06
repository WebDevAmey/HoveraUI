"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import RevealSection from "@/components/docs/RevealSection";
import { CARD_HOVER_TRANSITION } from "@/lib/motion";
import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";
import AnimatedTabs from "@/components/tabs/AnimatedTabs";
import BorderBeamDemo from "@/components/cards/BorderBeamDemo";
import TiltCardDemo from "@/components/cards/TiltCardDemo";

const TILES: { slug: string; label: string; span?: string; render: React.ReactNode }[] = [
  {
    slug: "spotlight-card",
    label: "Spotlight Card",
    render: <SpotlightCardDemo />,
  },
  {
    slug: "animated-tabs",
    label: "Animated Tabs",
    render: <AnimatedTabs className="pointer-events-auto" />,
  },
  {
    slug: "border-beam",
    label: "Border Beam",
    render: <BorderBeamDemo />,
  },
  {
    slug: "tilt-card",
    label: "Tilt Card",
    render: <TiltCardDemo />,
  },
];

export default function NewArrivals() {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <RevealSection id="new-arrivals" className="border-b border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">New arrivals</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Cards, tabs, text effects, sections and a real command menu — every one CLI-installable,
              reduced-motion safe, and animated on transforms only.
            </p>
          </div>
          <Link
            href="/docs"
            className="shrink-0 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Browse all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TILES.map((tile) => (
            <motion.div
              key={tile.slug}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              transition={CARD_HOVER_TRANSITION}
              className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-6"
            >
              <div className="flex min-h-40 items-center justify-center">{tile.render}</div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-medium text-foreground">{tile.label}</span>
                <Link
                  href={"/docs/" + tile.slug}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  View docs →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
