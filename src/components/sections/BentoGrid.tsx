"use client";

import { motion, useReducedMotion } from "framer-motion";

interface BentoItem {
  title: string;
  description: string;
  /** Tailwind col/row span classes, e.g. "md:col-span-2". */
  className?: string;
}

interface BentoGridProps {
  items?: BentoItem[];
  className?: string;
}

const DEFAULT_ITEMS: BentoItem[] = [
  { title: "Copy-paste native", description: "Every component is a single file you own after install.", className: "md:col-span-2" },
  { title: "Motion built in", description: "Springs and staggers tuned per component." },
  { title: "Reduced-motion safe", description: "Every animation has a calm fallback." },
  { title: "Registry powered", description: "Install over the shadcn CLI from any host.", className: "md:col-span-2" },
];

export default function BentoGrid({ items = DEFAULT_ITEMS, className = "" }: BentoGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: 0.08 }}
      className={"grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-3 " + className}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
          }}
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          className={
            "group rounded-2xl border border-white/10 bg-neutral-950 p-5 transition-colors duration-300 hover:border-white/20 " +
            (item.className ?? "")
          }
        >
          <p className="text-sm font-medium text-white">{item.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{item.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
