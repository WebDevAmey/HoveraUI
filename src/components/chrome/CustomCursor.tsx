"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], [data-cursor='hover'], summary, label";

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

function useMediaMatch(query: string) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * Replacement cursor: a solid dot that tracks 1:1 plus a trailing ring on a
 * spring; the ring swells over interactive elements. Mounted only for fine
 * pointers with motion allowed — touch devices and reduced-motion users keep
 * the native cursor (the `custom-cursor-active` class is never added).
 */
export default function CustomCursor() {
  const finePointer = useMediaMatch("(pointer: fine)");
  const reducedMotion = useMediaMatch("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest(INTERACTIVE)));
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[190]">
      <motion.div
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            scale: hovering ? 2.1 : 1,
            borderColor: hovering ? "var(--glow-1)" : "var(--foreground)",
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border opacity-40"
        />
      </motion.div>
      <motion.div
        style={{ x, y, opacity: visible ? 1 : 0 }}
        className="absolute top-0 left-0"
      >
        <div
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
          style={{ background: hovering ? "var(--glow-1)" : "var(--foreground)" }}
        />
      </motion.div>
    </div>
  );
}
