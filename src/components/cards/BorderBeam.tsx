"use client";

interface BorderBeamProps {
  children?: React.ReactNode;
  /** Seconds per full lap around the border. */
  duration?: number;
  /** CSS colors for the beam's head and tail. */
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export default function BorderBeam({
  children,
  duration = 6,
  colorFrom = "#8b5cf6",
  colorTo = "#22d3ee",
  className = "",
}: BorderBeamProps) {
  return (
    <div className={"relative overflow-hidden rounded-2xl p-px " + className}>
      <style>{"@keyframes hovera-border-spin { to { transform: rotate(360deg); } }"}</style>
      <div
        aria-hidden
        className="absolute -inset-[100%] motion-reduce:[animation-play-state:paused]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg 300deg, " +
            colorFrom +
            " 330deg, " +
            colorTo +
            " 360deg)",
          animation: "hovera-border-spin " + duration + "s linear infinite",
        }}
      />
      <div className="relative rounded-[calc(1rem-1px)] border border-white/5 bg-neutral-950 p-6">
        {children}
      </div>
    </div>
  );
}
