"use client";

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
}
