import type React from "react";
import type { ButtonItem } from "@/types";

import RippleButton from "@/components/buttons/RippleButton";
import DButton from "@/components/buttons/DButton";
import Neumorphic from "@/components/buttons/Neumorphic";
import LiquidFillButton from "@/components/buttons/LiquidFillButton";
import SplitCurtainButton from "@/components/buttons/SplitCurtainButton";
import RadialBloomButton from "@/components/buttons/RadialBloomButton";
import XRayScannerButton from "@/components/buttons/XRayScannerButton";
import ChamberDoorButton from "@/components/buttons/ChamberDoorButton";
import ShredderButton from "@/components/buttons/ShredderButton";
import MorseSignalButton from "@/components/buttons/MorseSignalButton";
import ScanRingButton from "@/components/buttons/ScanRingButton";
import EclipseButton from "@/components/buttons/EclipseButton";
import TallyStrikeButton from "@/components/buttons/TallyStrikeButton";
import CompassLockButton from "@/components/buttons/CompassLockButton";
import PulseSeismographButton from "@/components/buttons/PulseSeismographButton";
import MagneticButton from "@/components/buttons/MagneticButton";

export const buttons: ButtonItem[] = [
  {
    name:"Ripple Button",
    slug:"ripple-button",
    category:"primary",
    component: RippleButton as React.ComponentType,
    code:`<button className="relative overflow-hidden rounded-lg bg-blue-600 px-7 py-3 text-white group focus-visible:outline-2 focus-visible:outline-offset-2">
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
    code: `<button className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2">
  3D Press
</button>`, 
  } ,
  {
    name: " Neumorphic Button",
    slug: "neumorphic-button",
    category: "primary",
    component: Neumorphic as React.ComponentType,
    code: `<button className="px-10 py-4 rounded-full bg-gray-100 text-gray-800 font-semibold 
shadow-[8px_8px_18px_rgba(17,24,39,0.15),-8px_-8px_18px_rgba(255,255,255,0.9)] 
active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.1),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] 
transition focus-visible:outline-2 focus-visible:outline-offset-2">
  Neumorphic
</button>`
  } ,

  {
    name: "Liquid Fill Button",
    slug: "liquid-fill-button",
    category: "primary",
    component: LiquidFillButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-indigo-600 bg-transparent px-6 py-3 text-lg font-semibold text-indigo-600 transition-colors duration-300 ease-in-out before:absolute before:left-1/2 before:top-[120%] before:z-[-1] before:h-[300%] before:w-[150%] before:-translate-x-1/2 before:rounded-[40%] before:bg-indigo-400 before:transition-all before:duration-700 before:ease-out before:content-[''] after:absolute after:left-1/2 after:top-[120%] after:z-[-1] after:h-[300%] after:w-[160%] after:-translate-x-1/2 after:rounded-[43%] after:bg-indigo-600 after:transition-all after:duration-500 after:delay-75 after:ease-out after:content-[''] hover:text-white hover:before:top-[-50%] hover:before:rotate-180 hover:after:top-[-50%] hover:after:rotate-[360deg] focus-visible:outline-2 focus-visible:outline-offset-2">
  Liquid Fill
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Split Curtain Button",
    slug: "split-curtain-button",
    category: "primary",
    component: SplitCurtainButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-emerald-600 bg-transparent px-6 py-3 text-lg font-semibold text-emerald-600 transition-colors duration-300 before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:-translate-x-full before:-translate-y-full before:bg-emerald-600 before:transition-transform before:duration-300 before:ease-out before:content-[''] after:absolute after:left-0 after:top-0 after:z-[-1] after:h-full after:w-full after:translate-x-full after:translate-y-full after:bg-emerald-600 after:transition-transform after:duration-300 after:ease-out after:content-[''] hover:text-white hover:before:translate-x-0 hover:before:translate-y-0 hover:after:translate-x-0 hover:after:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2">
  Split Curtain
</button>`,
    needsLightPreview: true,
  },
  {
    name: "Radial Bloom Button",
    slug: "radial-bloom-button",
    category: "primary",
    component: RadialBloomButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded-lg border-2 border-rose-600 bg-transparent px-6 py-3 text-lg font-semibold text-rose-600 transition-colors duration-500 before:absolute before:left-1/2 before:top-1/2 before:z-[-1] before:h-8 before:w-8 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 before:rounded-full before:bg-rose-600 before:transition-transform before:duration-300 before:ease-out before:content-[''] hover:text-white hover:before:scale-[6] focus-visible:outline-2 focus-visible:outline-offset-2">
  Radial Bloom
</button>`,
    needsLightPreview: true,
  },
  {
    name: "X-Ray Scanner Button",
    slug: "x-ray-scanner-button",
    category: "primary",
    component: XRayScannerButton as React.ComponentType,
    code: `<button className="relative z-10 inline-block cursor-pointer overflow-hidden rounded border-2 border-white bg-neutral-900 px-6 py-3 text-lg font-bold text-white before:absolute before:bottom-0 before:left-0 before:h-0 before:w-full before:bg-white before:mix-blend-difference before:transition-all before:duration-300 before:ease-out before:content-[''] hover:before:h-full focus-visible:outline-2 focus-visible:outline-offset-2">
  X-RAY SCANNER
</button>`,
  },
  {
    name: "Chamber Door Button",
    slug: "chamber-door-button",
    category: "primary",
    component: ChamberDoorButton as React.ComponentType,
    code: `<button className="group relative inline-block h-14 w-48 cursor-pointer bg-transparent [perspective:1000px] [transform-style:preserve-3d] focus-visible:outline-2 focus-visible:outline-offset-2">
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
    code: `<button className="group relative inline-block cursor-pointer overflow-hidden rounded border-2 border-neutral-800 bg-neutral-900 px-8 py-3 text-xl font-black tracking-wider text-transparent focus-visible:outline-2 focus-visible:outline-offset-2">
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
    name: "Morse Signal Button",
    slug: "morse-signal-button",
    category: "primary",
    component: MorseSignalButton as React.ComponentType,
    code: `<button className="group inline-flex flex-col items-center gap-2 rounded-lg border border-emerald-500/40 bg-neutral-950 px-8 py-4 font-mono text-sm tracking-widest text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2">
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
    code: `<button className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-neutral-950 text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2">
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
    code: `<button className="group relative inline-flex h-14 w-40 items-center justify-center overflow-hidden rounded-full bg-amber-400 font-bold text-black focus-visible:outline-2 focus-visible:outline-offset-2">
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
    code: `<button className="group inline-flex h-14 w-44 items-center justify-center gap-1.5 rounded-md border border-neutral-700 bg-neutral-950 font-mono text-sm text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2">
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
    code: `<button className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2">
  <span className="absolute top-1 h-2 w-[1px] bg-neutral-600" />
  <span className="absolute bottom-1 h-2 w-[1px] bg-neutral-600" />
  <span className="absolute left-1 h-[1px] w-2 bg-neutral-600" />
  <span className="absolute right-1 h-[1px] w-2 bg-neutral-600" />
  <span className="absolute h-0 w-0 origin-center border-x-[5px] border-b-[14px] border-x-transparent border-b-rose-500 transition-transform duration-500 ease-out [transform:rotate(20deg)] group-hover:[transform:rotate(200deg)]" />
  <span className="absolute h-1.5 w-1.5 rounded-full bg-neutral-300" />
</button>`,
  },
  {
    name: "Pulse Seismograph Button",
    slug: "pulse-seismograph-button",
    category: "primary",
    component: PulseSeismographButton as React.ComponentType,
    code: `<button className="group relative inline-flex h-14 w-44 items-center justify-center overflow-hidden rounded-lg border border-emerald-500/30 bg-neutral-950 font-mono text-sm text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2">
  <span className="absolute z-10 transition-opacity duration-300 group-hover:opacity-0">
    PULSE
  </span>
  <span className="absolute inset-0 flex items-center justify-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <span className="h-2 w-1 bg-emerald-500 transition-all delay-0 duration-300 group-hover:h-2" />
    <span className="h-2 w-1 bg-emerald-500 transition-all delay-75 duration-300 group-hover:h-6" />
    <span className="h-2 w-1 bg-emerald-500 transition-all delay-150 duration-300 group-hover:h-3" />
    <span className="h-2 w-1 bg-emerald-500 transition-all delay-200 duration-300 group-hover:h-8" />
    <span className="h-2 w-1 bg-emerald-500 transition-all delay-300 duration-300 group-hover:h-2" />
    <span className="h-2 w-1 bg-emerald-500 transition-all delay-[400ms] duration-300 group-hover:h-5" />
  </span>
</button>`,
  },
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    category: "primary",
    component: MagneticButton as React.ComponentType,
    description: "A button that leans toward the cursor on springs and snaps back on leave.",
    dependencies: ["framer-motion"],
    code: `"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children?: React.ReactNode;
  /** How far the button leans toward the cursor, in px. */
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children = "Magnetic Button",
  strength = 14,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 22, mass: 0.5 });

  // Mouse-only by design: touch devices never get the pull.
  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * strength * 2);
    y.set(relY * strength * 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className={
        "rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 shadow-lg shadow-black/20 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 " +
        className
      }
    >
      {children}
    </motion.button>
  );
}`,
  },
];
