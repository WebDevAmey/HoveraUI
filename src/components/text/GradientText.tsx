"use client";

interface GradientTextProps {
  children?: React.ReactNode;
  /** CSS gradient the text is clipped to. */
  gradient?: string;
  /** Seconds per shimmer pass. Set 0 to disable the sweep. */
  speed?: number;
  className?: string;
}

export default function GradientText({
  children = "Gradient in motion",
  gradient = "linear-gradient(90deg, #8b5cf6, #22d3ee, #e879f9, #8b5cf6)",
  speed = 5,
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={
        "inline-block bg-clip-text text-2xl font-semibold text-transparent motion-reduce:[animation-play-state:paused] " +
        className
      }
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
        animation: speed > 0 ? "hovera-gradient-pan " + speed + "s linear infinite" : undefined,
      }}
    >
      <style>{"@keyframes hovera-gradient-pan { to { background-position: -200% 0; } }"}</style>
      {children}
    </span>
  );
}
