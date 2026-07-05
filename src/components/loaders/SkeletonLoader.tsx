"use client";

interface SkeletonLoaderProps {
  /** Number of text lines below the header row. */
  lines?: number;
  showAvatar?: boolean;
  className?: string;
}

function ShimmerBlock({ className = "" }: { className?: string }) {
  return (
    <div className={"relative overflow-hidden rounded-md bg-white/[0.06] " + className}>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent motion-reduce:hidden"
        style={{ animation: "hovera-shimmer 1.6s ease-in-out infinite" }}
      />
    </div>
  );
}

export default function SkeletonLoader({
  lines = 3,
  showAvatar = true,
  className = "",
}: SkeletonLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={"w-72 rounded-2xl border border-white/10 bg-neutral-950 p-5 " + className}
    >
      <style>{"@keyframes hovera-shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }"}</style>
      <div className="flex items-center gap-3">
        {showAvatar && <ShimmerBlock className="h-10 w-10 shrink-0 rounded-full" />}
        <div className="flex-1 space-y-2">
          <ShimmerBlock className="h-3 w-1/2" />
          <ShimmerBlock className="h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <ShimmerBlock key={i} className={"h-3 " + (i === lines - 1 ? "w-2/3" : "w-full")} />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
