"use client";

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
}
