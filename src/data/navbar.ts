import type React from "react";
import type { NavbarItem } from "@/types";

import AetherNavbar from "@/components/navbars/AetherNavbar";

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
];
