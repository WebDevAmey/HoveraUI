"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import RevealSection from "@/components/docs/RevealSection";
import LazyMount from "@/components/LazyMount";
import { CARD_HOVER_TRANSITION } from "@/lib/motion";
import LiquidText from "@/components/text/LiquidText";
import DisplacementText from "@/components/text/DisplacementText";
import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";
import BorderBeamDemo from "@/components/cards/BorderBeamDemo";
import TiltCardDemo from "@/components/cards/TiltCardDemo";
import AnimatedTabs from "@/components/tabs/AnimatedTabs";
import Meteors from "@/components/backgrounds/Meteors";
import PixelTrail from "@/components/backgrounds/PixelTrail";

interface Tile {
  slug: string;
  label: string;
  span?: string;
  fill?: boolean;
  render: React.ReactNode;
}

const TILES: Tile[] = [
  {
    slug: "liquid-text",
    label: "Liquid Text",
    span: "md:col-span-2",
    render: <LiquidText text="LIQUID" className="scale-110" />,
  },
  {
    slug: "spotlight-card",
    label: "Spotlight Card",
    render: <SpotlightCardDemo />,
  },
  {
    slug: "pixel-trail",
    label: "Pixel Trail",
    fill: true,
    render: <PixelTrail className="!h-full" />,
  },
  {
    slug: "displacement-text",
    label: "Displacement Text",
    span: "md:col-span-2",
    render: <DisplacementText text="DISPLACE" className="text-5xl" />,
  },
  {
    slug: "border-beam",
    label: "Border Beam",
    render: <BorderBeamDemo />,
  },
  {
    slug: "animated-tabs",
    label: "Animated Tabs",
    render: <AnimatedTabs className="pointer-events-auto" />,
  },
  {
    slug: "meteors",
    label: "Meteors",
    fill: true,
    render: <Meteors />,
  },
  {
    slug: "tilt-card",
    label: "Tilt Card",
    render: <TiltCardDemo />,
  },
];

/** The centerpiece: a bento of live signature effects, each linking to its page. */
export default function SignatureShowcase() {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <RevealSection id="signature" className="border-b border-border px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[length:var(--text-display-sm)] font-semibold tracking-tight text-foreground">
          Signature effects, live.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Nothing here is a video. Hover, press, and move your cursor — then install the exact
          file you just played with.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {TILES.map((tile) => (
            <motion.div
              key={tile.slug}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={CARD_HOVER_TRANSITION}
              className={
                "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card " +
                (tile.span ?? "")
              }
            >
              <LazyMount
                className={
                  tile.fill
                    ? "relative min-h-56 flex-1 overflow-hidden"
                    : "flex min-h-56 flex-1 items-center justify-center p-6"
                }
              >
                {tile.fill ? (
                  <div className="absolute inset-0">{tile.render}</div>
                ) : (
                  tile.render
                )}
              </LazyMount>
              <div className="relative z-10 flex items-center justify-between border-t border-border bg-card px-4 py-3">
                <span className="text-sm font-medium text-foreground">{tile.label}</span>
                <Link
                  href={`/components/${tile.slug}`}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  View →<span className="sr-only"> {tile.label} documentation</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
