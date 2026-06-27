"use client";

import { motion, useReducedMotion } from "framer-motion";
import HoveraFlagshipCard from "@/components/landing/HoveraFlagshipCard";
import MagneticLink from "@/components/MagneticLink";
import { heroItemVariants, heroItemVariantsReduced } from "@/lib/motion";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? heroItemVariantsReduced : heroItemVariants;

  return (
    <section className="relative overflow-hidden border-b border-border px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-hovera" aria-hidden="true" />
              Hover-first component library
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="mt-5 text-[var(--text-display-md)] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[var(--text-display-lg)]"
            >
              Interfaces that respond before you click.
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              Hovera UI is a shadcn-compatible library of buttons, loaders, navbars and
              backgrounds built around the moment a cursor arrives, not just the moment
              it clicks. Preview every interaction live, copy the code, or install it
              straight from the registry.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={variants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <MagneticLink href="/docs" primary>
                Browse components
                <span aria-hidden="true">↗</span>
              </MagneticLink>
              <MagneticLink href="https://github.com/WebDevAmey/HoveraUI" external>
                Star on GitHub
              </MagneticLink>
            </motion.div>
          </div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="flex min-h-[28rem] items-center justify-center rounded-[var(--radius-card)] border border-border bg-card p-6"
          >
            <HoveraFlagshipCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
