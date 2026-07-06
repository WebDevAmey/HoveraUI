"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "hovera-preloader-shown";

/**
 * Once-per-session intro: the wordmark reveals through a clip wipe, then the
 * whole veil slides up and unmounts. Total on-screen time ~1.1s; content
 * renders and streams behind it the whole time. Skipped entirely under
 * prefers-reduced-motion and on any navigation after the first.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const frame = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || sessionStorage.getItem(SESSION_KEY)) {
        setPhase("done");
        return;
      }
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("playing");
      timeout = setTimeout(() => setPhase("done"), 1100);
    });
    return () => {
      cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-surface-0"
          aria-hidden
        >
          <div className="relative overflow-hidden">
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="block text-3xl font-semibold tracking-tight text-foreground"
            >
              Hovera UI
            </motion.span>
            <motion.span
              initial={{ x: "-110%" }}
              animate={{ x: "110%" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent, rgba(255,255,255,0.25), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
