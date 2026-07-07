"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLDivElement | null>;
  fromRef: RefObject<HTMLDivElement | null>;
  toRef: RefObject<HTMLDivElement | null>;
  reverse?: boolean;
  duration?: number;
  className?: string;
  delay?: number;
  index?: number;
  totalBeams?: number;
}

function getCenter(el: HTMLElement, container: HTMLElement) {
  const cr = container.getBoundingClientRect();
  const er = el.getBoundingClientRect();
  return {
    x: er.left + er.width / 2 - cr.left,
    y: er.top + er.height / 2 - cr.top,
  };
}

function orthogonalPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midY = (from.y + to.y) / 2;
  return `M ${from.x},${from.y} L ${from.x},${midY} L ${to.x},${midY} L ${to.x},${to.y}`;
}

export default function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  reverse,
  duration = 2.5,
  className,
  delay = 0,
  index = 0,
  totalBeams = 1,
}: AnimatedBeamProps) {
  const [path, setPath] = useState("");
  const gradientIdRef = useRef(`gradient-${Math.random().toString(36).substr(2, 9)}`);

  // Calculate sequential delay: each beam waits for previous ones + their duration
  const sequentialDelay = index * (duration + 0.3);

  const update = useCallback(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;
    setPath(orthogonalPath(getCenter(from, container), getCenter(to, container)));
  }, [containerRef, fromRef, toRef]);

  useEffect(() => {
    update();
    const ro = new ResizeObserver(update);
    [containerRef.current, fromRef.current, toRef.current]
      .filter(Boolean)
      .forEach((el) => ro.observe(el!));
    return () => ro.disconnect();
  }, [update, containerRef, fromRef, toRef]);

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      fill="none"
      width="100%"
      height="100%"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradientIdRef.current} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Static dashed trail */}
      <path
        d={path}
        stroke="#d1d5db"
        strokeWidth="1.5"
        opacity="0.3"
        strokeDasharray="4,4"
        strokeLinecap="round"
      />

      {/* Animated gradient beam - only one visible at a time */}
      <motion.path
        d={path}
        stroke={`url(#${gradientIdRef.current})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8,4"
        filter="drop-shadow(0 0 6px rgba(99, 102, 241, 0.6))"
        initial={{ pathLength: reverse ? 1 : 0, opacity: 0 }}
        animate={{
          pathLength: reverse ? 0 : 1,
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          pathLength: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: totalBeams * (duration + 0.3) - duration + 0.3,
            delay: sequentialDelay,
          },
          opacity: {
            times: [0, 0.02, 0.98, 1],
            duration: duration + 0.3,
            repeat: Infinity,
            repeatDelay: totalBeams * (duration + 0.3) - duration - 0.3,
            delay: sequentialDelay,
          },
        }}
      />
    </svg>
  );
}
