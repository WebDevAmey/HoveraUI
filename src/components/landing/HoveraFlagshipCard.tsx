"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_FLOW } from "@/lib/motion";

const FEATURES = [
  {
    icon: ChatIcon,
    title: "Live Chat Support",
    description: "Talk to our team in real time",
  },
  {
    icon: SparkleIcon,
    title: "AI-Powered Suggestions",
    description: "Smart recommendations as you build",
  },
  {
    icon: LayersIcon,
    title: "Reusable Layouts",
    description: "Stack and compose components easily",
  },
  {
    icon: PaletteIcon,
    title: "Custom Theming",
    description: "Match any brand with full control",
  },
];

/**
 * Flagship hero demo: a dark card whose contents only reveal on hover,
 * the same "respond before you click" idea as the rest of Hovera UI.
 */
export default function HoveraFlagshipCard() {
  const [open, setOpen] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: EASE_FLOW }}
          className="flex h-[26rem] w-72 flex-col rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-white shadow-[var(--shadow-glow)]"
        >
          <h2 className="text-[11px] font-bold">Hovera UI Components</h2>
          <p className="mt-2 text-[11px] text-zinc-400">
            A collection of beautiful UI components.
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={() => setOpen(false)}
              aria-label="Dismiss card"
              className="mt-4 flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-[10px] text-zinc-300 transition-colors hover:bg-zinc-800"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-hovera text-[8px] font-bold text-hovera-foreground">
                H
              </span>
              Hovera
              <XIcon className="h-3 w-3 text-zinc-500" />
            </button>
          </div>

          <div className="relative mt-4 flex-1 rounded-lg border border-dashed border-zinc-800 bg-zinc-900/40">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, scale: 1.03, filter: "blur(0px)" }
              }
              transition={{ duration: 0.5, ease: EASE_FLOW }}
              className="absolute inset-0 h-full w-full divide-y divide-zinc-800 rounded-lg border border-zinc-800 bg-zinc-950"
            >
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-2 p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900">
                    <feature.icon className="h-4 w-4 text-zinc-300" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[8px] font-bold text-zinc-200">{feature.title}</p>
                    <p className="mt-1 text-[8px] text-zinc-500">{feature.description}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center gap-2 p-4">
                <p className="text-[8px] font-bold text-zinc-200">Create Project</p>
                <button className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800 text-[10px] leading-none text-zinc-300 hover:bg-zinc-700">
                  +
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 22a10 10 0 1 1 0-20c5 0 9 3.6 9 8 0 2.2-1.8 4-4 4h-2.2c-1 0-1.8.8-1.8 1.8 0 .5.2.9.5 1.2.3.3.5.7.5 1.2A2.8 2.8 0 0 1 11.3 22z" />
      <circle cx="6.5" cy="11.5" r="1.5" />
      <circle cx="9.5" cy="7.5" r="1.5" />
      <circle cx="14.5" cy="7.5" r="1.5" />
      <circle cx="17.5" cy="11.5" r="1.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
