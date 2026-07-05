import type React from "react";
import type { ComponentItem } from "@/types";

import TextReveal from "@/components/text/TextReveal";
import Typewriter from "@/components/text/Typewriter";
import GradientText from "@/components/text/GradientText";

export const textEffects: ComponentItem[] = [
  {
    name: "Text Reveal",
    slug: "text-reveal",
    category: "text",
    component: TextReveal as React.ComponentType,
    description: "Words rise out of a clipped line one by one as the text scrolls into view.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TextRevealProps {
  text?: string;
  className?: string;
  /** Seconds between each word's entrance. */
  stagger?: number;
  delay?: number;
}

export default function TextReveal({
  text = "Motion that answers the cursor, not the clock.",
  className = "",
  stagger = 0.06,
  delay = 0,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <p className={"text-2xl font-semibold text-white " + className}>{text}</p>;
  }

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={"flex flex-wrap gap-x-[0.3em] text-2xl font-semibold text-white " + className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden" aria-hidden>
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}`,
  },
  {
    name: "Typewriter",
    slug: "typewriter",
    category: "text",
    component: Typewriter as React.ComponentType,
    description: "Cycles through phrases with type-and-delete rhythm and a blinking caret.",
    code: `"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useReducedMotionPreference() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

interface TypewriterProps {
  words?: string[];
  /** Milliseconds per typed character. */
  typingSpeed?: number;
  /** Milliseconds per deleted character. */
  deletingSpeed?: number;
  /** Milliseconds to hold a completed word. */
  holdTime?: number;
  className?: string;
}

export default function Typewriter({
  words = ["hover states", "scroll reveals", "micro-interactions"],
  typingSpeed = 70,
  deletingSpeed = 40,
  holdTime = 1400,
  className = "",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useReducedMotionPreference();

  useEffect(() => {
    if (reduced) return;
    const word = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && length < word.length) {
      timeout = setTimeout(() => setLength(length + 1), typingSpeed);
    } else if (!deleting && length === word.length) {
      timeout = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && length > 0) {
      timeout = setTimeout(() => setLength(length - 1), deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [length, deleting, wordIndex, words, typingSpeed, deletingSpeed, holdTime, reduced]);

  const word = words[wordIndex % words.length];
  const shown = reduced ? words[0] : word.slice(0, length);

  return (
    <span className={"text-2xl font-semibold text-white " + className}>
      <style>{"@keyframes hovera-caret { 0%, 45% { opacity: 1; } 50%, 100% { opacity: 0; } }"}</style>
      {shown}
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-violet-400 motion-reduce:opacity-100"
        style={{ animation: reduced ? undefined : "hovera-caret 1s steps(1) infinite" }}
      />
    </span>
  );
}`,
  },
  {
    name: "Gradient Text",
    slug: "gradient-text",
    category: "text",
    component: GradientText as React.ComponentType,
    description: "Text clipped to a panning gradient, paused automatically under reduced motion.",
    code: `"use client";

interface GradientTextProps {
  children?: React.ReactNode;
  /** CSS gradient the text is clipped to. */
  gradient?: string;
  /** Seconds per shimmer pass. Set 0 to disable the sweep. */
  speed?: number;
  className?: string;
}

export default function GradientText({
  children = "Gradient in motion",
  gradient = "linear-gradient(90deg, #8b5cf6, #22d3ee, #e879f9, #8b5cf6)",
  speed = 5,
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={
        "inline-block bg-clip-text text-2xl font-semibold text-transparent motion-reduce:[animation-play-state:paused] " +
        className
      }
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
        animation: speed > 0 ? "hovera-gradient-pan " + speed + "s linear infinite" : undefined,
      }}
    >
      <style>{"@keyframes hovera-gradient-pan { to { background-position: -200% 0; } }"}</style>
      {children}
    </span>
  );
}`,
  },
];
