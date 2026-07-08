"use client";

import { cn } from "@/lib/utils";
import { BorderBeam as MagicBorderBeam } from "@/components/ui/border-beam";

interface BorderBeamProps {
  children?: React.ReactNode;
  duration?: number;
  size?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
}

export default function BorderBeam({
  children = (
    <>
      <p className="text-sm font-medium text-white">Border Beam</p>
      <p className="mt-1 text-sm leading-relaxed text-neutral-400">
        A colorful beam runs laps around the border.
      </p>
    </>
  ),
  duration = 8,
  size = 100,
  className,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
}: BorderBeamProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 p-6", className)}>
      {children}
      <MagicBorderBeam duration={duration} size={size} colorFrom={colorFrom} colorTo={colorTo} />
    </div>
  );
}
