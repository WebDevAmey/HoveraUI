"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { MAGNETIC_SPRING } from "@/lib/motion";

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
}

/** Shared CTA link with a magnetic hover/tap scale, used by Hero and FinalCTA. */
export default function MagneticLink({ href, children, primary, external }: MagneticLinkProps) {
  const prefersReducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={MAGNETIC_SPRING}
      className="inline-block"
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className={
          primary
            ? "inline-flex items-center justify-center gap-2 rounded-md bg-hovera px-5 py-2.5 text-sm font-medium text-hovera-foreground shadow-[var(--shadow-glow)] transition-colors hover:bg-hovera/90"
            : "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        }
      >
        {children}
      </Link>
    </motion.div>
  );
}
