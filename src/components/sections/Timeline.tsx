"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items?: TimelineItem[];
  className?: string;
}

const DEFAULT_ITEMS: TimelineItem[] = [
  { date: "Day 1", title: "Install", description: "One CLI command, the file is yours." },
  { date: "Day 2", title: "Customize", description: "Change the props, the springs, the colors." },
  { date: "Day 3", title: "Ship", description: "No library lock-in to unwind later." },
];

export default function Timeline({ items = DEFAULT_ITEMS, className = "" }: TimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={"relative w-full max-w-md " + className}>
      <div aria-hidden className="absolute top-1 bottom-1 left-[7px] w-px bg-white/10" />
      <ol className="space-y-6">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8"
          >
            <span
              aria-hidden
              className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-2 border-violet-500 bg-neutral-950"
            />
            <p className="text-xs tracking-wide text-neutral-500 uppercase">{item.date}</p>
            <p className="mt-1 text-sm font-medium text-white">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">{item.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
