"use client";

import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { backgrounds } from "@/data/background";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";

const FILTER_TABS = [
  { label: "All", value: "all" as const },
  { label: "Gradients", value: "gradient" as const },
  { label: "Patterns", value: "pattern" as const },
  { label: "Buttons", value: "buttons" as const },
  { label: "Loaders", value: "loaders" as const },
  { label: "Navbars", value: "navbars" as const },
  { label: "Favorites", value: "favorites" as const },
];

export default function Sidebar() {
  const { category, setCategory, searchQuery, setSearchQuery, favorites } = useApp();

  function getCount(val: string) {
    if (val === "all") return backgrounds.length + buttons.length + loaders.length + navbars.length;
    if (val === "favorites") return favorites.length;
    if (val === "buttons") return buttons.length;
    if (val === "loaders") return loaders.length;
    if (val === "navbars") return navbars.length;
    return backgrounds.filter((b) => b.category === val).length;
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[#050507] text-zinc-300">

      {/* Logo */}
      <div className="flex items-center gap-2.5 p-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-sm font-bold text-black shadow-[0_0_16px_rgba(34,211,238,0.35)]">
          B
        </span>
        <div className="flex flex-col">
          <span className="text-base font-bold leading-tight text-white">
            Hovera UI
          </span>
          <span className="text-[10px] text-zinc-500">UI library</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 transition-colors focus-within:border-cyan-500/50 focus-within:bg-white/[0.07]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-zinc-500"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none"
            aria-label="Search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="flex h-5 w-5 items-center justify-center rounded-sm border border-white/10 text-xs text-zinc-500 transition-colors duration-150 hover:border-cyan-500/40 hover:text-cyan-400"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="px-3 pb-3">
        <div className="flex flex-col gap-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={`group relative flex items-center justify-between overflow-hidden border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                category === tab.value
                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                  : "border-transparent text-zinc-400 hover:border-white/10 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <span
                className={`absolute left-0 top-0 h-full w-0.5 bg-cyan-400 transition-transform duration-150 ${
                  category === tab.value ? "scale-y-100" : "scale-y-0"
                }`}
                aria-hidden="true"
              />
              <span>{tab.label}</span>
              <span
                className={`rounded-sm border px-1.5 py-0.5 text-[10px] tabular-nums normal-case ${
                  category === tab.value
                    ? "border-cyan-500/40 text-cyan-400"
                    : "border-white/10 text-zinc-500"
                }`}
              >
                {getCount(tab.value)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-2 h-px bg-white/10" />

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 p-4">
        <span className="text-xs text-zinc-500">
          {backgrounds.length} patterns · {buttons.length} buttons · {loaders.length} loaders · {navbars.length} navbars
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
