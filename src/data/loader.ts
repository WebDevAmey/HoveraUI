import type React from "react";
import type { LoaderItem } from "@/types";

import MercuryLoader from "@/components/loaders/MercuryLoader";
import SkeletonProfile from "@/components/loaders/SkeletonProfile";

export const loaders: LoaderItem[] = [
  {
    name: "Skeleton Profile",
    slug: "skeleton-profile",
    category: "primary",
    component: SkeletonProfile as React.ComponentType,
    code: `<div className="w-[450px] flex gap-6 p-7 bg-[#1e293b] rounded-[20px]">
  <div
    className="w-20 h-20 rounded-full bg-white/5 relative overflow-hidden shrink-0
                before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
  />
  <div className="flex-1">
    <div
      className="w-[70%] h-5 mb-5 rounded-lg bg-white/5 relative overflow-hidden
                  before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
    />
    <div className="space-y-3">
      <div
        className="w-full h-3.5 rounded-lg bg-white/5 relative overflow-hidden
                    before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
      />
      <div
        className="w-full h-3.5 rounded-lg bg-white/5 relative overflow-hidden
                    before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
      />
      <div
        className="w-[60%] h-3.5 rounded-lg bg-white/5 relative overflow-hidden
                    before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent"
      />
    </div>
  </div>
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
    <div className="absolute h-8 w-8 animate-[mercury-left_2s_infinite_cubic-bezier(0.77,0,0.17,1)] rounded-full bg-white blur-[6px]" />
    <div className="absolute h-8 w-8 animate-[mercury-center_2s_infinite_ease-in-out] rounded-full bg-white blur-[6px]" />
    <div className="absolute h-8 w-8 animate-[mercury-right_2s_infinite_cubic-bezier(0.77,0,0.17,1)] rounded-full bg-white blur-[6px] [animation-delay:0.15s]" />
  </div>

  <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">Connecting...</p>
</div>`,
  },
];
