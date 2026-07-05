"use client";

import SpotlightCard from "@/components/cards/SpotlightCard";

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-72">
      <p className="text-sm font-medium text-white">Spotlight Card</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
        Move your cursor across the card, the glow follows it, the card lifts to meet you.
      </p>
    </SpotlightCard>
  );
}
