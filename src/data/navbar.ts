import type React from "react";
import type { NavbarItem } from "@/types";

import FloatingNavbar from "@/components/navbars/FloatingNavbar";
import Navbar from "@/components/navbars/Navbar";

function generateNavbarCode() {
  return `"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface NavItem {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavbarProps {
  items: (NavItem & { separatorAfter?: boolean })[];
  defaultActive?: string;
  fixed?: boolean;
  className?: string;
}

const SPRING = { type: "spring" as const, stiffness: 360, damping: 32, mass: 0.6 };

export default function Navbar({ items, defaultActive, fixed = true, className }: NavbarProps) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.label);
  const reduce = useReducedMotion();

  return (
    <div
      className={
        (fixed
          ? "fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none"
          : "flex w-full justify-center") + " " + (className ?? "")
      }
    >
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-2xl border border-white/[0.06] bg-neutral-900/80 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-2xl">
        {items.map((item) => {
          const isActive = active === item.label;
          const indicator = isActive ? (
            <motion.span
              layoutId={reduce ? undefined : "navbar-active"}
              transition={reduce ? { duration: 0 } : SPRING}
              className="absolute inset-0.5 -z-10 rounded-xl bg-white/10"
            />
          ) : null;

          const child = (
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-neutral-100">
              {indicator}
              {item.icon}
            </span>
          );

          return (
            <div
              key={item.label}
              className="flex items-center gap-1"
            >
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={() => setActive(item.label)}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                  aria-label={item.label}
                >
                  {child}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActive(item.label);
                    item.onClick?.();
                  }}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/30"
                  aria-label={item.label}
                >
                  {child}
                </button>
              )}
              {item.separatorAfter && (
                <span className="mx-1 h-5 w-px bg-white/[0.06]" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}`;
}

export const navbars: NavbarItem[] = [
  {
    name: "Floating Navbar",
    slug: "floating-navbar",
    category: "primary",
    component: FloatingNavbar as React.ComponentType,
    description: "A scroll-aware pill navbar that hides on scroll down and returns on scroll up.",
    dependencies: ["framer-motion"],
    code: `"use client";

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
          key={\`\${link.href}-\${i}\`}
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
}`,
  },
  {
    name: "Navbar",
    slug: "navbar",
    category: "primary",
    component: Navbar as React.ComponentType,
    description: "A fixed bottom navigation bar with spring-active pill indicator and glass backdrop. Can render in-flow with fixed={false}.",
    dependencies: ["framer-motion"],
    code: generateNavbarCode(),
  },
];
