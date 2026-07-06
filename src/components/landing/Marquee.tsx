"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
    useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

// Placeholder example feedback, not real attributed quotes. Swap in real
// testimonials once Hovera UI has them.
const QUOTES = [
  { quote: "The hover states feel intentional instead of decorative.", role: "Example feedback, frontend developer" },
  { quote: "Copy, paste, done. The registry install just works.", role: "Example feedback, indie hacker" },
  { quote: "First component library where the motion doesn't fight the layout.", role: "Example feedback, design engineer" },
  { quote: "Props tables that actually match the code. Refreshing.", role: "Example feedback, open source maintainer" },
];

const BASE_SPEED = 2.6; // % of half-belt per second at rest

/**
 * Velocity-coupled marquee: the belt drifts at a calm base speed and picks up
 * pace with scroll velocity, so the page's momentum carries into it. The belt
 * is duplicated and wraps at -50% for a seamless loop, transform-only.
 * Reduced motion renders a static, scrollable row.
 */
export default function Marquee() {
  const prefersReducedMotion = useReducedMotionSafe();
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 380 });

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    const velocityBoost = Math.min(Math.abs(smoothVelocity.get()) / 700, 2.5);
    const moveBy = BASE_SPEED * (delta / 1000) * (1 + velocityBoost);
    const next = baseX.get() + moveBy;
    baseX.set(next >= 50 ? next - 50 : next);
  });

  const x = useTransform(baseX, (v) => -v + "%");

  const loop = [...QUOTES, ...QUOTES];

  if (prefersReducedMotion) {
    return (
      <div className="border-b border-border bg-secondary/10 py-12">
        <div className="flex gap-6 overflow-x-auto px-4" aria-label="Example feedback">
          {QUOTES.map((item) => (
            <figure
              key={item.role}
              className="w-72 shrink-0 rounded-[var(--radius-card)] border border-border bg-card p-5"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs text-muted-foreground">{item.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border bg-secondary/10 py-12">
      <div className="relative overflow-hidden" aria-label="Example feedback">
        <motion.div style={{ x }} className="flex w-max gap-6 px-4 will-change-transform">
          {loop.map((item, i) => (
            <figure
              key={`${item.role}-${i}`}
              aria-hidden={i >= QUOTES.length}
              className="w-72 shrink-0 rounded-[var(--radius-card)] border border-border bg-card p-5"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-xs text-muted-foreground">{item.role}</figcaption>
            </figure>
          ))}
        </motion.div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </div>
  );
}
