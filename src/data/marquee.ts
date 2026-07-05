import type React from "react";
import type { ComponentItem } from "@/types";

import MarqueeDemo from "@/components/marquee/MarqueeDemo";

export const marquees: ComponentItem[] = [
  {
    name: "Marquee",
    slug: "marquee",
    category: "marquee",
    component: MarqueeDemo as React.ComponentType,
    description: "An infinite, seamless content marquee with hover-pause and reverse direction.",
    code: `"use client";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div className={"group relative overflow-hidden " + className}>
      <style>{"@keyframes hovera-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }"}</style>
      <div
        className={
          "flex w-max gap-6 motion-reduce:[animation-play-state:paused]" +
          (pauseOnHover ? " group-hover:[animation-play-state:paused]" : "")
        }
        style={{
          animation: "hovera-marquee " + speed + "s linear infinite",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-6">{children}</div>
        <div className="flex shrink-0 items-center gap-6" aria-hidden>
          {children}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-950 to-transparent"
      />
    </div>
  );
}`,
  },
];
