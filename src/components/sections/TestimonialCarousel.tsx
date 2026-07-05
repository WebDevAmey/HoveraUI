"use client";

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
}
