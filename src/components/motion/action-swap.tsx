"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { EASE_OUT } from "@/lib/ease";
import { cn } from "@/lib/utils";

export interface ActionSwapIconProps {
  value: string;
  children: ReactNode;
  animation?: "blur" | "roll" | "cascade";
  className?: string;
}

const ROLL_TRANSITION = { duration: 0.24, ease: EASE_OUT } as const;

const ICON_VARIANTS: Record<string, Variants> = {
  blur: {
    initial: { opacity: 0, scale: 0.25, filter: "blur(8px)" },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.25,
      filter: "blur(8px)",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  },
  roll: {
    initial: { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: ROLL_TRANSITION,
    },
    exit: {
      opacity: 0,
      y: -16,
      filter: "blur(6px)",
      transition: { duration: 0.18, ease: "easeInOut" },
    },
  },
};

export function ActionSwapIcon({
  value,
  children,
  animation = "blur",
  className,
}: ActionSwapIconProps) {
  const reduce = useReducedMotion();
  const coreAnimation = animation === "cascade" ? "roll" : animation;
  const variants = ICON_VARIANTS[coreAnimation] ?? ICON_VARIANTS.blur;

  return (
    <span className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${animation}-${value}`}
          aria-hidden
          variants={variants}
          initial={reduce ? false : "initial"}
          animate={reduce ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : "animate"}
          exit={reduce ? undefined : "exit"}
          className="col-start-1 row-start-1 inline-flex items-center justify-center will-change-[opacity,filter,transform]"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
