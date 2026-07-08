"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { ActionSwapIcon } from "@/components/motion/action-swap";
import { cn } from "@/lib/utils";

export type ThemeVariant = "rectangle" | "circle" | "circle-blur";
export type RectStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "bottom-up";

export interface ThemeToggleProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> {
  variant?: ThemeVariant;
  start?: RectStart;
  iconClassName?: string;
}

export function ThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
  className,
  iconClassName,
  ...rest
}: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";

    if (reduce || !("startViewTransition" in document)) {
      setTheme(next);
      return;
    }

    const root = document.documentElement;
    root.dataset.beuiVt = "rect";

    const vt = (
      document as Document & {
        startViewTransition(cb: () => void): { finished: Promise<void> };
      }
    ).startViewTransition(() => setTheme(next));

    vt.finished.finally(() => {
      delete root.dataset.beuiVt;
    });
  };

  return (
    <button
      type="button"
      aria-label={mounted && isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn("flex items-center justify-center", className)}
      {...rest}
    >
      {mounted ? (
        <ActionSwapIcon
          value={isDark ? "dark" : "light"}
          animation="blur"
          className={iconClassName}
        >
          {isDark ? (
            <Sun className={iconClassName} />
          ) : (
            <Moon className={iconClassName} />
          )}
        </ActionSwapIcon>
      ) : (
        <span className={iconClassName} aria-hidden="true" />
      )}
    </button>
  );
}
