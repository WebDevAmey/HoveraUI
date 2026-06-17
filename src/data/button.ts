import type React from "react";
import type { ButtonItem } from "@/types";

import GlowButton from "@/components/buttons/GlowButton";
import BorderReveal from "@/components/buttons/BorderReveal";

export const buttons: ButtonItem[] = [
  {
    name: "Glow Button",
    slug: "glow-button",
    category: "primary",
    component: GlowButton as React.ComponentType,
    code: `<button
  className="
    px-6
    py-3
    rounded-xl
    bg-violet-600
    text-white
    font-medium

    shadow-[0_0_30px_rgba(139,92,246,0.5)]

    hover:scale-105
    transition-all
    duration-300
  "
>
  Glow Button
</button>`,
  },
  {
    name: "Border Reveal",
    slug: "border-reveal",
    category: "primary",
    component: BorderReveal as React.ComponentType,
    code: `<button className="relative rounded-lg bg-black px-8 py-3 text-white group">
  <span className="absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-white" />
  <span className="relative">Border Reveal</span>
</button>`,
  },
];