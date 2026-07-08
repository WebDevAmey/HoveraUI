"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
}

interface FloatingNavbarProps {
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Set false to render in-flow (e.g. inside a preview container). */
  fixed?: boolean;
  className?: string;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Components", href: "#" },
  { label: "Docs", href: "#" },
];

// Minimum accumulated scroll (px) in one direction before flipping visibility.
// Without this, tiny scroll jitter (trackpads, momentum scroll) flickers the navbar in/out.
const DIRECTION_THRESHOLD = 12;
// Always show the navbar while within this many px of the top.
const REVEAL_ZONE = 120;

export default function FloatingNavbar({
  links = DEFAULT_LINKS,
  ctaLabel = "Get started",
  ctaHref = "#",
  fixed = true,
  className = "",
}: FloatingNavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const accumulatedDelta = useRef(0);
  const lastDirection = useRef<"up" | "down" | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    const delta = latest - previous;
    if (delta === 0) return;

    const direction = delta > 0 ? "down" : "up";

    // Reset the accumulator whenever direction flips, so a brief wobble
    // doesn't get added to a real scroll in the opposite direction.
    if (direction !== lastDirection.current) {
      accumulatedDelta.current = 0;
      lastDirection.current = direction;
    }
    accumulatedDelta.current += Math.abs(delta);

    if (latest < REVEAL_ZONE) {
      setHidden(false);
      return;
    }

    if (accumulatedDelta.current < DIRECTION_THRESHOLD) return;

    setHidden(direction === "down");
  });

  return (
    <motion.nav
      aria-label="Primary"
      animate={hidden ? "hidden" : "visible"}
      initial="visible"
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -24, opacity: 0 },
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 30, mass: 0.5 }
      }
      style={{ willChange: "transform, opacity" }}
      className={
        (fixed ? "fixed inset-x-0 top-4 z-50 mx-auto " : "relative mx-auto ") +
        "flex w-max items-center gap-1 rounded-full border border-white/10 bg-neutral-900/80 px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md " +
        className
      }
    >
      {links.map((link, i) => (
        <a
          key={`${link.href}-${i}`}
          href={link.href}
          className="rounded-full px-3 py-1 text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
        >
          {link.label}
        </a>
      ))}
      <a
        href={ctaHref}
        className="ml-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-neutral-950 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        {ctaLabel}
      </a>
    </motion.nav>
  );
}
