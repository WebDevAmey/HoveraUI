import type React from "react";
import type { LoaderItem } from "@/types";

import MercuryLoader from "@/components/loaders/MercuryLoader";

export const loaders: LoaderItem[] = [
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
];
