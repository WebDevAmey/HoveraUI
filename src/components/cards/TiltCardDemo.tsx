"use client";

import TiltCard from "@/components/cards/TiltCard";

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-72">
      <p className="text-sm font-medium text-white">Tilt Card</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
        Move your cursor around — the card banks toward it in 3D, then springs flat when you leave.
      </p>
    </TiltCard>
  );
}
