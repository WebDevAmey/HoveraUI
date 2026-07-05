"use client";

import Marquee from "@/components/marquee/Marquee";

const ITEMS = ["Next.js", "React", "Tailwind", "Motion", "TypeScript", "Radix"];

export default function MarqueeDemo() {
  return (
    <Marquee className="w-80" speed={18}>
      {ITEMS.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-300"
        >
          {item}
        </span>
      ))}
    </Marquee>
  );
}
