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
import ReadMore from "@/components/buttons/ReadMore";
import ShimmerSwipe from "@/components/buttons/ShimmerSwipe";
import LinkButton from "@/components/buttons/LinkButton";
import SlideTextButton from "@/components/buttons/SlideTextButton";
import GradientLinkButton from "@/components/buttons/GradientLinkButton";
import UnderlineHover from "@/components/buttons/UnderlineHover";
import SlideFillButton from "@/components/buttons/SlideFillButton";
import BlobHoverButton from "@/components/buttons/BlobHoverButton";
import LiquidFillButton from "@/components/buttons/LiquidFillButton";
import SplitCurtainButton from "@/components/buttons/SplitCurtainButton";
import RadialBloomButton from "@/components/buttons/RadialBloomButton";
import XRayScannerButton from "@/components/buttons/XRayScannerButton";
import ChamberDoorButton from "@/components/buttons/ChamberDoorButton";
import ShredderButton from "@/components/buttons/ShredderButton";
import OutlineButton from "@/components/buttons/OutlineButton";
import MorseSignalButton from "@/components/buttons/MorseSignalButton";
import ScanRingButton from "@/components/buttons/ScanRingButton";
import EclipseButton from "@/components/buttons/EclipseButton";
import TallyStrikeButton from "@/components/buttons/TallyStrikeButton";
import CompassLockButton from "@/components/buttons/CompassLockButton";

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
  } ,
  {
    name: " Read More Button",
    slug: "read-more-button",
    category: "primary",
    component: ReadMore as React.ComponentType,
    code: ` <button className="group relative px-8 py-3 rounded-full text-white font-semibold 
    bg-white/10 backdrop-blur-xl border border-white/20
    shadow-[0_0_30px_rgba(255,0,150,0.6)] 
    overflow-hidden">

    <span className="absolute inset-0 bg-pink-500 opacity-30 blur-2xl group-hover:blur-3xl transition duration-500"></span>

    <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent 
        translate-x-[-20%] group-hover:translate-x-[20%]
        transition duration-700 ease-out"></span>

    <span className="relative z-10">Read More</span>
</button>`
  } ,

  {
    name: " Shimmer Swipe Button",
    slug: "shimmer-swipe-button",
    category: "primary",
    component: ShimmerSwipe as React.ComponentType,
    code: `<button className="relative px-10 py-4 rounded-xl bg-indigo-600 text-white font-semibold overflow-hidden group shadow-lg hover:shadow-indigo-500/40 transition hover:scale-105">

  
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
               -translate-x-full group-hover:translate-x-full
               transition duration-700 ease-out"></span>

  <span className="relative z-10">Shimmer Swipe</span>
</button>`
  } ,
  {
    name: " Link Button",
    slug: "link-button",
    category: "primary",
    component: LinkButton as React.ComponentType,
    code: `<button
        className="font-bold text-black font-black text-5xl px-4 py-2 rounded underline bg-clip-text bg-gradient-to-r from-black via-blue-600 to-indigo-500 cursor-pointer transition-all duration-500 ease-out  bg-[size:200%_100%] bg-[position:0%_0] hover:bg-[position:100%_0] hover:text-transparent"
      >
        Link
      </button>`,
    needsLightPreview: true,
  },
  {
    name: "Slide Text Button",
    slug: "slide-text-button",
    category: "primary",
    component: SlideTextButton as React.ComponentType,
    code: `<button className="group cursor-pointer rounded-xl border-[1px] border-slate-500 bg-gradient-to-b from-indigo-500 to-pink-600 px-6 py-3 font-medium text-white shadow-[0px_4px_32px_0_rgba(99,102,241,.70)]">
  <div className="relative overflow-hidden">
    <p className="duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-20">
      Button
    </p>
    <p className="absolute top-0 left-20 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-0">
      Button
    </p>
  </div>
</button>`
  },
  {
    name: "Gradient Link Button",
    slug: "gradient-link-button",
    category: "primary",
    component: GradientLinkButton as React.ComponentType,
    code: `<button className="relative inline-block cursor-pointer bg-gradient-to-r from-blue-600 via-blue-600 to-black bg-[size:200%_100%] bg-[position:100%_0] bg-clip-text text-5xl font-black text-transparent transition-all duration-700 ease-out hover:bg-[position:0%_0]">
  Link
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Underline Hover Button",
    slug: "underline-hover-button",
    category: "primary",
    component: UnderlineHover as React.ComponentType,
    code: `<button className="group px-6 py-3 text-lg font-medium text-indigo-600">
  <span className="relative inline-block">
    Hover Me
    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
  </span>
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Slide Fill Button",
    slug: "slide-fill-button",
    category: "primary",
    component: SlideFillButton as React.ComponentType,
    code: `<button className="relative z-10 overflow-hidden rounded border-2 border-black bg-amber-500 px-8 py-3 text-black transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:bg-emerald-500 before:translate-y-full before:transition-transform before:duration-300 hover:text-white hover:before:translate-y-0">
  Get in touch
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Blob Hover Button",
    slug: "blob-hover-button",
    category: "primary",
    component: BlobHoverButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-[4px] border border-[#4f4f4f] px-[24px] py-[12px] text-[19px] font-normal text-black transition-all duration-200 ease-in before:absolute before:left-1/2 before:top-[100%] before:z-[-1] before:block before:h-[180%] before:w-[140%] before:-translate-x-1/2 before:scale-x-[1.25] before:scale-y-[1] before:rounded-full before:bg-black/5 before:transition-all before:duration-500 before:delay-100 before:ease-[cubic-bezier(0.55,0,0.1,1)] before:content-[''] after:absolute after:left-[55%] after:top-[180%] after:z-[-1] after:block after:h-[190%] after:w-[160%] after:-translate-x-1/2 after:scale-x-[1.45] after:scale-y-[1] after:rounded-full after:bg-[#39bda7] after:transition-all after:duration-500 after:delay-100 after:ease-[cubic-bezier(0.55,0,0.1,1)] after:content-[''] hover:border-[#39bda7] hover:text-white hover:before:top-[-35%] hover:before:scale-x-[0.8] hover:before:scale-y-[1.3] hover:before:bg-[#39bda7] hover:after:top-[-45%] hover:after:scale-x-[0.8] hover:after:scale-y-[1.3] hover:after:bg-[#39bda7]">
  Hover Me
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Liquid Fill Button",
    slug: "liquid-fill-button",
    category: "primary",
    component: LiquidFillButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-indigo-600 bg-transparent px-6 py-3 text-lg font-semibold text-indigo-600 transition-colors duration-300 ease-in-out before:absolute before:left-1/2 before:top-[120%] before:z-[-1] before:h-[300%] before:w-[150%] before:-translate-x-1/2 before:rounded-[40%] before:bg-indigo-400 before:transition-all before:duration-700 before:ease-out before:content-[''] after:absolute after:left-1/2 after:top-[120%] after:z-[-1] after:h-[300%] after:w-[160%] after:-translate-x-1/2 after:rounded-[43%] after:bg-indigo-600 after:transition-all after:duration-500 after:delay-75 after:ease-out after:content-[''] hover:text-white hover:before:top-[-50%] hover:before:rotate-180 hover:after:top-[-50%] hover:after:rotate-[360deg]">
  Liquid Fill
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Split Curtain Button",
    slug: "split-curtain-button",
    category: "primary",
    component: SplitCurtainButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-emerald-600 bg-transparent px-6 py-3 text-lg font-semibold text-emerald-600 transition-colors duration-300 before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:-translate-x-full before:-translate-y-full before:bg-emerald-600 before:transition-transform before:duration-300 before:ease-out before:content-[''] after:absolute after:left-0 after:top-0 after:z-[-1] after:h-full after:w-full after:translate-x-full after:translate-y-full after:bg-emerald-600 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-white hover:before:translate-x-0 hover:before:translate-y-0 hover:after:translate-x-0 hover:after:translate-y-0">
  Split Curtain
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Radial Bloom Button",
    slug: "radial-bloom-button",
    category: "primary",
    component: RadialBloomButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-rose-600 bg-transparent px-6 py-3 text-lg font-semibold text-rose-600 transition-colors duration-500 before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-8 before:w-8 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:rounded-full before:bg-rose-600 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:text-white hover:before:scale-[6]">
  Radial Bloom
</button>`,
    needsLightPreview: true,
  },
  {
    name: "X-Ray Scanner Button",
    slug: "x-ray-scanner-button",
    category: "primary",
    component: XRayScannerButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded border-2 border-white bg-neutral-900 px-6 py-3 text-lg font-bold text-white before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:mix-blend-difference before:transition-all before:duration-300 before:ease-out before:content-[''] hover:before:h-full">
  X-RAY SCANNER
</button>`,
  },
  {
    name: "Chamber Door Button",
    slug: "chamber-door-button",
    category: "primary",
    component: ChamberDoorButton as React.ComponentType,
    code: `<button className="group relative inline-block h-14 w-48 cursor-pointer bg-transparent [perspective:1000px] [transform-style:preserve-3d]">
  <div className="absolute inset-0 z-0 rounded bg-cyan-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

  <span className="absolute left-0 top-0 z-10 flex h-[50%] w-full origin-top items-end justify-center overflow-hidden border-x-2 border-t-2 border-white bg-neutral-900 font-bold text-white transition-transform duration-300 group-hover:[transform:rotateX(60deg)]">
    <span className="translate-y-[50%]">OPEN CHAMBER</span>
  </span>

  <span className="absolute bottom-0 left-0 z-10 flex h-[50%] w-full origin-bottom items-start justify-center overflow-hidden border-x-2 border-b-2 border-white bg-neutral-900 font-bold text-white transition-transform duration-300 group-hover:[transform:rotateX(-60deg)]">
    <span className="-translate-y-[50%]">OPEN CHAMBER</span>
  </span>
</button>`,
  },
  {
    name: "Shredder Button",
    slug: "shredder-button",
    category: "primary",
    component: ShredderButton as React.ComponentType,
    code: `<button className="group relative inline-block cursor-pointer overflow-hidden rounded border-2 border-neutral-800 bg-neutral-900 px-8 py-3 text-xl font-black tracking-wider text-transparent">
  SHREDDER
  <span className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-rose-500 transition-transform duration-300 ease-out [clip-path:polygon(0_0,_100%_0,_100%_33%,_0_33%,_0_66%,_100%_66%,_100%_100%,_0_100%)] group-hover:translate-y-2">
    SHREDDER
  </span>
  <span className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-cyan-400 transition-transform duration-300 ease-out [clip-path:polygon(0_33%,_100%_33%,_100%_66%,_0_66%,_0_100%,_100%_100%)] group-hover:-translate-y-2">
    SHREDDER
  </span>
</button>`,
  },
  {
    name: "Outline Button",
    slug: "outline-button",
    category: "primary",
    component: OutlineButton as React.ComponentType,
    code: `<button className="border border-black text-black-500 px-4 py-2 rounded-full hover:scale-105 hover:text-orange-600 hover:border-orange-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
  Outline Button
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Morse Signal Button",
    slug: "morse-signal-button",
    category: "primary",
    component: MorseSignalButton as React.ComponentType,
    code: `<button className="group inline-flex flex-col items-center gap-2 rounded-lg border border-emerald-500/40 bg-neutral-950 px-8 py-4 font-mono text-sm tracking-widest text-emerald-400">
  <span>SEND SIGNAL</span>
  <span className="flex h-1 gap-1">
    <span className="h-1 w-3 rounded-full bg-emerald-500 opacity-15 transition-opacity delay-0 duration-200 group-hover:opacity-100" />
    <span className="h-1 w-3 rounded-full bg-emerald-500 opacity-15 transition-opacity delay-150 duration-200 group-hover:opacity-100" />
    <span className="h-1 w-7 rounded-full bg-emerald-500 opacity-15 transition-opacity delay-300 duration-200 group-hover:opacity-100" />
    <span className="h-1 w-3 rounded-full bg-emerald-500 opacity-15 transition-opacity delay-500 duration-200 group-hover:opacity-100" />
    <span className="h-1 w-7 rounded-full bg-emerald-500 opacity-15 transition-opacity delay-700 duration-200 group-hover:opacity-100" />
  </span>
</button>`,
  },
  {
    name: "Scan Ring Button",
    slug: "scan-ring-button",
    category: "primary",
    component: ScanRingButton as React.ComponentType,
    code: `<button className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-cyan-400">
  <span className="absolute inset-0 rounded-full border border-cyan-400/70 opacity-0 scale-50 transition-all delay-0 duration-300 group-hover:scale-100 group-hover:opacity-100" />
  <span className="absolute inset-0 rounded-full border border-cyan-400/50 opacity-0 scale-50 transition-all delay-100 duration-300 group-hover:scale-125 group-hover:opacity-100" />
  <span className="absolute inset-0 rounded-full border border-cyan-400/30 opacity-0 scale-50 transition-all delay-200 duration-300 group-hover:scale-150 group-hover:opacity-100" />
  <span className="absolute inset-0 rounded-full border border-cyan-400/10 opacity-0 scale-50 transition-all delay-300 duration-300 group-hover:scale-[1.75] group-hover:opacity-100" />
  <span className="relative z-10 text-xs font-semibold tracking-wide">SCAN</span>
</button>`,
  },
  {
    name: "Eclipse Button",
    slug: "eclipse-button",
    category: "primary",
    component: EclipseButton as React.ComponentType,
    code: `<button className="group relative inline-flex h-14 w-40 items-center justify-center overflow-hidden rounded-full bg-amber-400 font-bold text-black">
  <span className="absolute right-0 top-0 h-14 w-14 rounded-full bg-neutral-950 transition-transform duration-500 ease-out [transform:translateX(50%)] group-hover:[transform:translateX(-10%)]" />
  <span className="relative z-10 transition-colors duration-300 group-hover:text-amber-300">
    ECLIPSE
  </span>
</button>`,
  },
  {
    name: "Tally Strike Button",
    slug: "tally-strike-button",
    category: "primary",
    component: TallyStrikeButton as React.ComponentType,
    code: `<button className="group inline-flex h-14 w-44 items-center justify-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-950 font-mono text-sm text-neutral-200">
  <span className="relative z-10 mr-2">TALLY</span>
  <span className="h-5 w-[2px] origin-bottom scale-y-0 bg-rose-500 transition-transform delay-0 duration-200 group-hover:scale-y-100" />
  <span className="h-5 w-[2px] origin-bottom scale-y-0 bg-rose-500 transition-transform delay-100 duration-200 group-hover:scale-y-100" />
  <span className="h-5 w-[2px] origin-bottom scale-y-0 bg-rose-500 transition-transform delay-200 duration-200 group-hover:scale-y-100" />
  <span className="h-5 w-[2px] origin-bottom rotate-[20deg] scale-y-0 bg-rose-500 transition-transform delay-300 duration-200 group-hover:scale-y-100" />
</button>`,
  },
  {
    name: "Compass Lock Button",
    slug: "compass-lock-button",
    category: "primary",
    component: CompassLockButton as React.ComponentType,
    code: `<button className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950">
  <span className="absolute top-1 h-2 w-[1px] bg-neutral-600" />
  <span className="absolute bottom-1 h-2 w-[1px] bg-neutral-600" />
  <span className="absolute left-1 h-[1px] w-2 bg-neutral-600" />
  <span className="absolute right-1 h-[1px] w-2 bg-neutral-600" />
  <span className="absolute h-0 w-0 origin-center border-x-[5px] border-b-[14px] border-x-transparent border-b-rose-500 transition-transform duration-500 ease-out [transform:rotate(20deg)] group-hover:[transform:rotate(200deg)]" />
  <span className="absolute h-1.5 w-1.5 rounded-full bg-neutral-300" />
</button>`,
  }

];