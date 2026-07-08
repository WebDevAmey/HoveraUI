"use client";

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
}
