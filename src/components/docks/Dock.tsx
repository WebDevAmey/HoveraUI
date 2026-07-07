"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SPRING_LAYOUT } from "@/lib/motion";

interface DockItem {
  icon: ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DockProps {
  items: (DockItem & { separatorAfter?: boolean })[];
  defaultActive?: string;
  /** Stack items vertically instead of horizontally. */
  vertical?: boolean;
  className?: string;
}

export default function Dock({ items, defaultActive, vertical, className }: DockProps) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.label);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "mx-auto flex items-center gap-1 rounded-2xl border border-white/[0.06] bg-neutral-900/60 shadow-lg shadow-black/20 backdrop-blur-2xl",
        vertical ? "flex-col px-2.5 py-2" : "px-3 py-2",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = active === item.label;
        const shared = (
          <motion.div
            layout
            layoutId={prefersReducedMotion ? undefined : "dock-active"}
            transition={prefersReducedMotion ? { duration: 0 } : SPRING_LAYOUT}
            className={cn(
              "flex items-center justify-center rounded-xl transition-colors",
              vertical ? "p-2" : "p-2.5",
              isActive
                ? "bg-white text-neutral-900"
                : "text-neutral-500 hover:text-neutral-200",
            )}
          >
            {item.icon}
          </motion.div>
        );

        return (
          <div
            key={item.label}
            className={cn("flex items-center gap-1", vertical && "flex-col")}
          >
            {item.href ? (
              <Link
                href={item.href}
                onClick={() => setActive(item.label)}
                className="group relative flex flex-col items-center gap-0.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={item.label}
              >
                {shared}
                <span
                  className={cn(
                    "pointer-events-none text-[10px] font-medium leading-none transition-all",
                    isActive
                      ? "translate-y-0 text-white/80 opacity-100"
                      : "translate-y-0.5 text-white/40 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setActive(item.label);
                  item.onClick?.();
                }}
                className="group relative flex flex-col items-center gap-0.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label={item.label}
              >
                {shared}
                <span
                  className={cn(
                    "pointer-events-none text-[10px] font-medium leading-none transition-all",
                    isActive
                      ? "translate-y-0 text-white/80 opacity-100"
                      : "translate-y-0.5 text-white/40 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                  )}
                >
                  {item.label}
                </span>
              </button>
            )}
            {item.separatorAfter && (
              <div
                className={cn(
                  "bg-white/[0.06]",
                  vertical ? "h-px w-6" : "h-6 w-px",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
