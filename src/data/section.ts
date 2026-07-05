import type React from "react";
import type { ComponentItem } from "@/types";

import BentoGrid from "@/components/sections/BentoGrid";
import Timeline from "@/components/sections/Timeline";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";

export const sections: ComponentItem[] = [
  {
    name: "Bento Grid",
    slug: "bento-grid",
    category: "sections",
    component: BentoGrid as React.ComponentType,
    description: "A staggered-entrance bento layout with per-card hover lift.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { motion, useReducedMotion } from "framer-motion";

interface BentoItem {
  title: string;
  description: string;
  /** Tailwind col/row span classes, e.g. "md:col-span-2". */
  className?: string;
}

interface BentoGridProps {
  items?: BentoItem[];
  className?: string;
}

const DEFAULT_ITEMS: BentoItem[] = [
  { title: "Copy-paste native", description: "Every component is a single file you own after install.", className: "md:col-span-2" },
  { title: "Motion built in", description: "Springs and staggers tuned per component." },
  { title: "Reduced-motion safe", description: "Every animation has a calm fallback." },
  { title: "Registry powered", description: "Install over the shadcn CLI from any host.", className: "md:col-span-2" },
];

export default function BentoGrid({ items = DEFAULT_ITEMS, className = "" }: BentoGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: 0.08 }}
      className={"grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3 " + className}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          className={
            "group rounded-2xl border border-white/10 bg-neutral-950 p-5 transition-colors duration-300 hover:border-white/20 " +
            (item.className ?? "")
          }
        >
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}`,
  },
  {
    name: "Timeline",
    slug: "timeline",
    category: "sections",
    component: Timeline as React.ComponentType,
    description: "A vertical timeline whose entries slide into place as they enter the viewport.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items?: TimelineItem[];
  className?: string;
}

const DEFAULT_ITEMS: TimelineItem[] = [
  { date: "Day 1", title: "Install", description: "One CLI command, the file is yours." },
  { date: "Day 2", title: "Customize", description: "Change the props, the springs, the colors." },
  { date: "Day 3", title: "Ship", description: "No library lock-in to unwind later." },
];

export default function Timeline({ items = DEFAULT_ITEMS, className = "" }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={"relative w-full max-w-md " + className}>
      <div aria-hidden className="absolute top-1 bottom-1 left-[7px] w-px bg-white/10" />
      <ol className="space-y-6">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8"
          >
            <span
              aria-hidden
              className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-2 border-violet-500 bg-neutral-950"
            />
            <p className="text-xs tracking-wide text-neutral-500 uppercase">{item.date}</p>
            <p className="mt-1 text-sm font-medium text-white">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}`,
  },
  {
    name: "Testimonial Carousel",
    slug: "testimonial-carousel",
    category: "sections",
    component: TestimonialCarousel as React.ComponentType,
    description: "A directional fade-slide testimonial carousel, hand-rolled on Motion with no carousel dependency.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  className?: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: "The hover states feel intentional instead of decorative.", author: "A. Rivera", role: "Frontend developer" },
  { quote: "Copy, paste, done. The registry install just works.", author: "M. Chen", role: "Indie hacker" },
  { quote: "First library where the motion doesn't fight the layout.", author: "S. Okafor", role: "Design engineer" },
];

export default function TestimonialCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
}: TestimonialCarouselProps) {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);
  const prefersReducedMotion = useReducedMotion();
  const current = testimonials[index];

  function paginate(dir: number) {
    setIndex([(index + dir + testimonials.length) % testimonials.length, dir]);
  }

  return (
    <div className={"w-full max-w-md " + className}>
      <div className="relative min-h-32 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={index}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -32 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
          >
            <blockquote className="text-sm leading-relaxed text-white">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs text-neutral-400">
              {current.author} · {current.role}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden>
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (i === index ? "w-5 bg-violet-400" : "w-1.5 bg-white/20")
              }
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="rounded-full border border-white/10 px-3 py-1 text-sm text-neutral-300 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="rounded-full border border-white/10 px-3 py-1 text-sm text-neutral-300 transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}`,
  },
];
