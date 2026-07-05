"use client";

import { useState } from "react";
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

  // Hide when scrolling down past the fold, reveal on any upward scroll.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 120);
  });

  return (
    <motion.nav
      animate={hidden ? "hidden" : "visible"}
      initial="visible"
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -24, opacity: 0 },
      }}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }
      className={
        (fixed ? "fixed inset-x-0 top-4 z-50 mx-auto " : "relative mx-auto ") +
        "flex w-max items-center gap-1 rounded-full border border-white/10 bg-neutral-900/80 px-2 py-1.5 shadow-lg shadow-black/20 backdrop-blur-md " +
        className
      }
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="rounded-full px-3 py-1 text-sm text-neutral-400 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {link.label}
        </a>
      ))}
      <a
        href={ctaHref}
        className="ml-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-neutral-950 transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        {ctaLabel}
      </a>
    </motion.nav>
  );
}
