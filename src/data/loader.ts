import type React from "react";
import type { LoaderItem } from "@/types";

import SpinnerLoader from "@/components/loaders/SpinnerLoader";
import BouncingDotsLoader from "@/components/loaders/BouncingDotsLoader";
import MercuryLoader from "@/components/loaders/MercuryLoader";
import SkeletonLoader from "@/components/loaders/SkeletonLoader";

export const loaders: LoaderItem[] = [
  {
    name: "Spinner Loader",
    slug: "spinner-loader",
    category: "primary",
    component: SpinnerLoader as React.ComponentType,
    code: `<div className="flex flex-col items-center justify-center space-y-2">
  <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
  <p className="text-sm font-medium tracking-wide text-slate-500">Loading data...</p>
</div>`,
    needsLightPreview: true,
  },
  {
    name: "Bouncing Dots Loader",
    slug: "bouncing-dots-loader",
    category: "primary",
    component: BouncingDotsLoader as React.ComponentType,
    code: `<div className="flex items-center space-x-2 py-4">
  <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.3s]" />
  <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500 [animation-delay:-0.15s]" />
  <div className="h-3 w-3 animate-bounce rounded-full bg-emerald-500" />
</div>`,
  },
  {
    name: "Mercury Loader",
    slug: "mercury-loader",
    category: "primary",
    component: MercuryLoader as React.ComponentType,
    code: `<svg className="absolute h-0 w-0 pointer-events-none hidden" aria-hidden="true">
  <defs>
    <filter id="mercury-melt">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
        result="goo"
      />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>

<div className="flex flex-col items-center justify-center space-y-4">
  <div
    className="relative flex h-24 w-48 items-center justify-center bg-transparent [filter:url(#mercury-melt)]"
    role="status"
    aria-live="polite"
  >
    <div className="absolute h-8 w-8 animate-[mercury-left_2s_infinite_cubic-bezier(0.77,0,0.17,1)] rounded-full bg-zinc-800 blur-[6px]" />
    <div className="absolute h-8 w-8 animate-[mercury-center_2s_infinite_ease-in-out] rounded-full bg-zinc-800 blur-[6px]" />
    <div className="absolute h-8 w-8 animate-[mercury-right_2s_infinite_cubic-bezier(0.77,0,0.17,1)] rounded-full bg-zinc-800 blur-[6px] [animation-delay:0.15s]" />
  </div>

  <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">Connecting...</p>
</div>`,
    needsLightPreview: true,
  },
  {
    name: "Skeleton Loader",
    slug: "skeleton-loader",
    category: "primary",
    component: SkeletonLoader as React.ComponentType,
    description: "A shimmering card skeleton with configurable lines and avatar.",
    code: `"use client";

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
}`,
  },
];
