import type React from "react";
import type { ButtonItem } from "@/types";

import GlowButton from "@/components/buttons/GlowButton";
import BorderReveal from "@/components/buttons/BorderReveal";
import RippleButton from "@/components/buttons/RippleButton";
import DButton from "@/components/buttons/DButton";
import NeonSwipe from "@/components/buttons/NeonSwipe";
import SwipeButton from "@/components/buttons/SwipeButton";
import NewButton from "@/components/buttons/NewButton";
import LuminanceFlux from "@/components/buttons/LuminanceFlux";
import FrostedGlass from "@/components/buttons/FrostedGlass";
import Neumorphic from "@/components/buttons/Neumorphic";

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
  } ,
  {
    name: "Neon Swipe Button",
    slug: "neon-swipe-button",
    category: "primary",
    component: NeonSwipe as React.ComponentType,
    code: `<button className="group relative px-8 py-3 text-white bg-indigo-600 rounded-lg overflow-hidden">
  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -translate-x-full group-hover:translate-x-0 transition duration-500"></span>
  <span className="relative z-10">Neon Swipe</span>
</button>`, 
  },
  {
    name: " Swipe Button",
    slug: "swipe-button",
    category: "primary",
    component: SwipeButton as React.ComponentType,
    code: `<button className="group relative px-8 py-3 rounded-lg bg-indigo-600 text-white overflow-hidden hover:scale-105 hover:-translate-y-1 active:translate-y-0 transform transition-all">
    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 -translate-x-full group-hover:translate-x-0 transition duration-500 hover:scale-105"></span>
    <span className="relative z-10">Swipe Me </span>
</button>`
  },
  {
    name: " New Button",
    slug: "new-button",
    category: "primary",
    component: NewButton as React.ComponentType,
    code: `<button className="px-8 py-3 bg-emerald-600 rounded-xl text-white font-semibold hover:-translate-y-1 active:translate-y-0 hover:shadow-xl transform transition-all ">
Button
</button>`
  } ,
    {
    name: " Luminance Flux Button",
    slug: "luminance-flux-button",
    category: "primary",
    component: LuminanceFlux as React.ComponentType,
    code: `<button className="group relative px-14 py-4 rounded-2xl text-white font-semibold 
bg-slate-900 overflow-hidden shadow-[0_0_30px_rgba(120,0,255,0.3)]
transition hover:scale-105">

  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400
               opacity-40 translate-x-[-30%]
               group-hover:translate-x-[30%]
               transition-all duration-1000 ease-out blur-xl"></span>

  <span className="absolute inset-0 bg-white/10 mix-blend-overlay"></span>

  <span className="absolute inset-0 rounded-2xl bg-fuchsia-500/20 blur-2xl opacity-0
               group-hover:opacity-60 group-hover:blur-[40px]
               transition-all duration-700"></span>

  <span className="relative z-10">Luminance Flux</span>
</button>`
  },
  {
    name: " Frosted Glass Button",
    slug: "frosted-glass-button",
    category: "primary",
    component: FrostedGlass as React.ComponentType,
    code: `<button className="relative px-12 py-4 rounded-full text-white font-medium 
bg-white/10 backdrop-blur-xl border border-white/20 
hover:bg-white/20 hover:scale-105 transition">
  Frosted Glass
</button>`
  } ,
  {
    name: " Neumorphic Button",
    slug: "neumorphic-button",
    category: "primary",
    component: Neumorphic as React.ComponentType,
    code: `<button className="px-10 py-4 rounded-full bg-gray-100 text-gray-800 font-semibold 
shadow-[8px_8px_18px_rgba(17,24,39,0.15),-8px_-8px_18px_rgba(255,255,255,0.9)] 
active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] 
transition">
  Neumorphic
</button>`
  }

];