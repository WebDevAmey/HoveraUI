import type React from "react";
import type { NavbarItem } from "@/types";

import AetherNavbar from "@/components/navbars/AetherNavbar";
import VertexNavbar from "@/components/navbars/VertexNavbar";

export const navbars: NavbarItem[] = [
  {
    name: "Aether Navbar",
    slug: "aether-navbar",
    category: "primary",
    component: AetherNavbar as React.ComponentType,
    code: `<div className="fixed top-4 left-0 w-full flex justify-center z-50 px-4">
  <nav className="bg-black/60 border border-cyan-500/30 backdrop-blur-xl rounded-full px-3 py-2 flex items-center space-x-8 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xs">X</div>
    <div className="hidden sm:flex items-center space-x-1">
      <a href="#" className="text-slate-400 hover:text-cyan-400 text-xs font-medium uppercase tracking-widest px-3 py-1 transition-colors">Core</a>
      <a href="#" className="text-slate-400 hover:text-cyan-400 text-xs font-medium uppercase tracking-widest px-3 py-1 transition-colors">Network</a>
    </div>
    <button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border border-cyan-500/40 transition-all">
      Terminal
    </button>
  </nav>
</div>`,
  },
  {
    name: "Vertex Navbar",
    slug: "vertex-navbar",
    category: "primary",
    component: VertexNavbar as React.ComponentType,
    code: `<div className="fixed z-50 top-4 left-0 w-full px-4">
  <nav className="max-w-4xl mx-auto px-6 py-3 border border-rose-900/30 rounded-full bg-rose-950 flex items-center justify-between shadow-2xl backdrop-blur-md">
    <a href="#" className="text-white font-black tracking-widest text-lg font-mono focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-lg px-2">
      VERTEX
    </a>

    <div className="hidden md:flex items-center space-x-2">
      <a href="#features" className="text-white/90 font-mono px-4 py-2 hover:bg-rose-900 hover:text-white rounded-full transition-colors duration-200">
        Features
      </a>
      <a href="#pricing" className="text-white/90 font-mono px-4 py-2 hover:bg-rose-900 hover:text-white rounded-full transition-colors duration-200">
        Pricing
      </a>
      <a href="#about" className="text-white/90 font-mono px-4 py-2 hover:bg-rose-900 hover:text-white rounded-full transition-colors duration-200">
        About
      </a>
    </div>

    <button className="relative overflow-hidden bg-rose-950 border text-rose-400 border-rose-400 font-medium px-4 py-2 rounded-md hover:brightness-150 border-b-4 hover:border-b active:opacity-75 outline-none duration-300 group hover:border-t-4">
      Connect with us
    </button>
  </nav>
</div>`,
  },
];
