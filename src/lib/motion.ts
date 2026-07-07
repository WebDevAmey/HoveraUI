// Shared Framer Motion constants, kept in sync with the CSS motion tokens
// defined in src/app/globals.css (--ease-flow, --duration-fast/base/slow).
// Keep these two sources aligned: if you change one, change the other.
import type { Transition, Variants } from "framer-motion";

export const EASE_FLOW = [0.16, 1, 0.3, 1] as const;

export const DURATION_FAST = 0.15;
export const DURATION_BASE = 0.3;
export const DURATION_SLOW = 0.45;

export const TRANSITION_FLOW: Transition = {
  duration: DURATION_BASE,
  ease: EASE_FLOW,
};

export const TRANSITION_FLOW_SLOW: Transition = {
  duration: DURATION_SLOW,
  ease: EASE_FLOW,
};

/** Clip-path wipe, the Framer Motion equivalent of the clipRevealUp CSS keyframe. */
export const clipRevealVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: TRANSITION_FLOW,
  },
};

/** Reduced-motion fallback: instant, no clip-path animation. */
export const clipRevealVariantsReduced: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/** Hero entrance: fade + rise, staggered via `custom` index * delay. */
export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...TRANSITION_FLOW_SLOW, delay: i * 0.08 },
  }),
};

export const heroItemVariantsReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

/** Magnetic hover spring used on primary CTAs / nav links. */
export const MAGNETIC_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.5,
};

/** Shared-layout spring — morphing pills, indicators between positions. */
export const SPRING_LAYOUT: Transition = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.6,
};

/** Cursor-follow glow card hover scale. */
export const CARD_HOVER_TRANSITION: Transition = {
  duration: DURATION_BASE,
  ease: EASE_FLOW,
};

export function pickVariants(reducedMotion: boolean | null, full: Variants, reduced: Variants): Variants {
  return reducedMotion ? reduced : full;
}
