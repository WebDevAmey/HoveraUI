"use client";

import BorderBeam from "@/components/cards/BorderBeam";

export default function BorderBeamDemo() {
  return (
    <BorderBeam className="w-72">
      <p className="text-sm font-medium text-white">Border Beam</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
        A light runs a lap around the card border, violet head, cyan tail.
      </p>
    </BorderBeam>
  );
}
