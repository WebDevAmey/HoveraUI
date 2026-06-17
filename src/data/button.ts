import type React from "react";
import type { ButtonItem } from "@/types";

import GlowButton from "@/components/buttons/GlowButton";
import BorderReveal from "@/components/buttons/BorderReveal";
import RippleButton from "@/components/buttons/RippleButton";
import DButton from "@/components/buttons/DButton";

export const buttons: ButtonItem[] = [
  {
    name: "Glow Button",
    slug: "glow-button",
    category: "primary",
    component: GlowButton as React.ComponentType<{ isHovered?: boolean }>,
    code: `<button className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
  Glow Button
</button>`,
  },
  {
    name: "Border Reveal",
    slug: "border-reveal",
    category: "primary",
    component: BorderReveal as React.ComponentType,
    code: `<button className="rounded-lg border-2 border-transparent bg-black px-8 py-3 text-white transition-all duration-300 hover:border-white">
  Border Reveal
</button>`,
  },
  {
    name:"Ripple Button",
    slug:"ripple-button",
    category:"primary",
    component: RippleButton as React.ComponentType,
    code:`<button className="relative overflow-hidden rounded-lg bg-blue-600 px-7 py-3 text-white group">
  <span className="absolute inset-0 scale-0 bg-white opacity-0 transition-transform duration-300 group-active:scale-150 group-active:opacity-20" />
  <span className="relative">
    Click Me
  </span>
</button>`,
  },
  {
    name: "3D Button",
    slug: "3d-button",
    category: "primary",
    component: DButton as React.ComponentType,
    code: `<button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md">
  3D Press
</button>`, 
  }

];