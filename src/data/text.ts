import type React from "react";
import type { ComponentItem } from "@/types";

import TextReveal from "@/components/text/TextReveal";
import Typewriter from "@/components/text/Typewriter";
import DisplacementText from "@/components/text/DisplacementText";
import LiquidText from "@/components/text/LiquidText";

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
        className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-neutral-400 motion-reduce:opacity-100"
        style={{ animation: reduced ? undefined : "hovera-caret 1s steps(1) infinite" }}
      />
    </span>
  );
}`,
  },
  {
    name: "Displacement Text",
    slug: "displacement-text",
    category: "text",
    component: DisplacementText as React.ComponentType,
    description: "Glyphs lift, tilt and stretch under the cursor with gaussian falloff, like type pressed through a field.",
    code: `"use client";

import { useEffect, useRef } from "react";

interface DisplacementTextProps {
  text?: string;
  /** Max lift in px at the cursor's center. */
  strength?: number;
  /** Falloff radius in px. */
  radius?: number;
  className?: string;
}

export default function DisplacementText({
  text = "DISPLACEMENT",
  strength = 22,
  radius = 120,
  className = "",
}: DisplacementTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  // Direct style writes on pointer move — zero React re-renders. Each glyph
  // lifts and thins by gaussian falloff from the cursor; a transform
  // transition smooths the field as the cursor travels. Mouse-only by
  // design; touch and reduced-motion get static text.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const glyphs = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-glyph]"));

    function onMove(e: MouseEvent) {
      for (const glyph of glyphs) {
        const rect = glyph.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        const force = Math.exp(-(dist * dist) / (2 * radius * radius));
        const lift = -strength * force;
        const tilt = (dx / radius) * -14 * force;
        glyph.style.transform =
          "translateY(" + lift.toFixed(1) + "px) rotate(" + tilt.toFixed(1) + "deg) scaleY(" + (1 + 0.28 * force).toFixed(3) + ")";
        glyph.style.opacity = String(0.55 + 0.45 * Math.min(1, force * 2));
      }
    }

    function onLeave() {
      for (const glyph of glyphs) {
        glyph.style.transform = "";
        glyph.style.opacity = "";
      }
    }

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return (
    <span
      ref={containerRef}
      className={
        "inline-flex cursor-default select-none py-6 text-4xl font-bold tracking-tight text-white " +
        className
      }
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-glyph
          aria-hidden
          className="inline-block opacity-55 will-change-transform"
          style={{ transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1), opacity 0.28s" }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}`,
  },
  {
    name: "Liquid Text",
    slug: "liquid-text",
    category: "text",
    component: LiquidText as React.ComponentType,
    description: "Type melts under the cursor via an animated SVG turbulence displacement, then sets solid again.",
    code: `"use client";

import { useEffect, useId, useRef, useState } from "react";

interface LiquidTextProps {
  text?: string;
  /** Peak displacement scale while molten. */
  intensity?: number;
  className?: string;
}

export default function LiquidText({
  text = "LIQUID",
  intensity = 26,
  className = "",
}: LiquidTextProps) {
  const rawId = useId();
  const filterId = "hovera-liquid" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const [hot, setHot] = useState(false);

  // The distortion melts in and out on hover via a rAF loop driving the SVG
  // turbulence phase and displacement scale directly — no React re-renders
  // per frame. Reduced motion never starts the loop, so the text stays solid.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let level = 0;
    let phase = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      const target = hot ? 1 : 0;
      level += (target - level) * Math.min(1, dt * 5);
      phase += dt * (0.35 + level * 0.5);

      const turbulence = turbulenceRef.current;
      const displacement = displacementRef.current;
      if (turbulence && displacement) {
        turbulence.setAttribute(
          "baseFrequency",
          (0.012 + 0.004 * Math.sin(phase * 2.1)).toFixed(4) + " " + (0.05 + 0.02 * Math.cos(phase * 1.7)).toFixed(4)
        );
        displacement.setAttribute("scale", (level * intensity).toFixed(2));
      }
      if (level > 0.001 || hot) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hot, intensity]);

  return (
    <span
      className={"relative inline-block cursor-default select-none " + className}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
    >
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
        <defs>
          <filter id={filterId} x="-20%" y="-40%" width="140%" height="180%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.05"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <span
        className="inline-block py-4 text-4xl font-bold tracking-tight text-white"
        style={{ filter: "url(#" + filterId + ")" }}
      >
        {text}
      </span>
    </span>
  );
}`,
  },
];
