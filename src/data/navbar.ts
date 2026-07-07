import type React from "react";
import type { NavbarItem } from "@/types";

import FloatingNavbar from "@/components/navbars/FloatingNavbar";
import Dock from "@/components/docks/Dock";

export const navbars: NavbarItem[] = [
  {
    name: "Floating Navbar",
    slug: "floating-navbar",
    category: "primary",
    component: FloatingNavbar as React.ComponentType,
    description: "A scroll-aware pill navbar that hides on scroll down and returns on scroll up.",
    dependencies: ["framer-motion"],
    code: `"use client";

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
}`,
  },
  {
    name: "Dock",
    slug: "dock",
    category: "primary",
    component: Dock as React.ComponentType,
    description: "A macOS-style bottom dock with spring-active pill animation and glass backdrop.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { type ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockItem {
  icon: ReactNode;
  label: string;
}

interface DockProps {
  items: (DockItem & { separatorAfter?: boolean })[];
  defaultActive?: string;
  className?: string;
}

export default function Dock({ items, defaultActive, className }: DockProps) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.label);
  const prefersReducedMotion = useReducedMotion();
  const spring = { type: "spring" as const, stiffness: 360, damping: 32, mass: 0.6 };

  return (
    <div
      className={cn(
        "mx-auto flex w-max items-end gap-1.5 rounded-2xl border border-white/10 bg-neutral-900/70 px-3 pb-2 pt-2.5 shadow-lg shadow-black/20 backdrop-blur-xl",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex items-end gap-1.5">
          <button
            type="button"
            onClick={() => setActive(item.label)}
            className="group relative flex flex-col items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label={item.label}
          >
            <motion.div
              layout
              layoutId={prefersReducedMotion ? undefined : "dock-active"}
              transition={prefersReducedMotion ? { duration: 0 } : spring}
              className={cn(
                "flex items-center justify-center rounded-xl p-2.5 transition-colors",
                active === item.label
                  ? "bg-white text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-200",
              )}
            >
              {item.icon}
            </motion.div>
            <span className="pointer-events-none text-[10px] font-medium opacity-0 transition-all group-hover:opacity-100">
              {item.label}
            </span>
          </button>
          {item.separatorAfter && <div className="h-8 w-px bg-white/10" />}
        </div>
      ))}
    </div>
  );
}`,
  },
];
