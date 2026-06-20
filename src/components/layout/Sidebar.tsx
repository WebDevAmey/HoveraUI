"use client";

import { useApp } from "@/context/AppContext";
import { usePreview } from "@/context/PreviewContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { backgrounds } from "@/data/background";
import { buttons } from "@/data/button";

const FILTER_TABS = [
  { label: "All", value: "all" as const },
  { label: "Gradients", value: "gradient" as const },
  { label: "Patterns", value: "pattern" as const },
  { label: "Buttons", value: "buttons" as const },
  { label: "Favorites", value: "favorites" as const },
];

export default function Sidebar() {
  const { category, setCategory, searchQuery, setSearchQuery, favorites } = useApp();
  const { setActiveSlug, activeSlug } = usePreview();

  const visibleBgs = backgrounds.filter((bg) => {
    const matchesSearch = bg.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      category === "all" ||
      (category === "favorites" ? favorites.includes(bg.slug) : bg.category === category);
    return matchesSearch && matchesCat;
  });

  const visibleButtons = buttons.filter((btn) => {
    const matchesSearch = btn.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = category === "all" || category === "buttons";
    return matchesSearch && matchesCat;
  });

  const gradients = visibleBgs.filter((b) => b.category === "gradient");
  const patterns = visibleBgs.filter((b) => b.category === "pattern");

  function getCount(val: string) {
    if (val === "all") return backgrounds.length + buttons.length;
    if (val === "favorites") return favorites.length;
    if (val === "buttons") return buttons.length;
    return backgrounds.filter((b) => b.category === val).length;
  }

  const totalVisible = visibleBgs.length + visibleButtons.length;

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-[#0d0d12] text-zinc-300">

      {/* Logo */}
      <div className="flex items-center gap-2.5 p-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          B
        </span>
        <div className="flex flex-col">
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-base font-bold leading-tight text-transparent">
            BackLab
          </span>
          <span className="text-[10px] text-zinc-500">UI pattern library</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 transition-colors focus-within:border-violet-500/50 focus-within:bg-white/[0.07]">
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
              className="text-xs text-zinc-500 hover:text-zinc-300"
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
              className={`flex items-center justify-between rounded-full px-4 py-2 text-sm font-medium transition-all ${
                category === tab.value
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                  category === tab.value
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-zinc-500"
                }`}
              >
                {getCount(tab.value)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-2 h-px bg-white/10" />

      {/* List */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3" aria-label="Item list">
        {totalVisible === 0 && (
          <p className="px-3 py-8 text-center text-xs text-zinc-500">No results found</p>
        )}

        {gradients.length > 0 && (
          <section className="mb-4">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Gradients
            </p>
            <div className="space-y-0.5">
              {gradients.map((bg) => (
                <button
                  key={bg.slug}
                  onClick={() => setActiveSlug(activeSlug === bg.slug ? null : bg.slug)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                    activeSlug === bg.slug
                      ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30"
                      : "text-zinc-400 hover:translate-x-0.5 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                  aria-pressed={activeSlug === bg.slug}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-violet-400" aria-hidden="true" />
                  {bg.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {patterns.length > 0 && (
          <section className="mb-4">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Patterns
            </p>
            <div className="space-y-0.5">
              {patterns.map((bg) => (
                <button
                  key={bg.slug}
                  onClick={() => setActiveSlug(activeSlug === bg.slug ? null : bg.slug)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                    activeSlug === bg.slug
                      ? "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/30"
                      : "text-zinc-400 hover:translate-x-0.5 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                  aria-pressed={activeSlug === bg.slug}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                  {bg.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {visibleButtons.length > 0 && (
          <section className="mb-4">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Buttons
            </p>
            <div className="space-y-0.5">
              {visibleButtons.map((btn) => (
                <button
                  key={btn.slug}
                  onClick={() => setActiveSlug(activeSlug === btn.slug ? null : btn.slug)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all ${
                    activeSlug === btn.slug
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                      : "text-zinc-400 hover:translate-x-0.5 hover:bg-white/5 hover:text-zinc-100"
                  }`}
                  aria-pressed={activeSlug === btn.slug}
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                  {btn.name}
                </button>
              ))}
            </div>
          </section>
        )}
      </nav>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 p-4">
        <span className="text-xs text-zinc-500">
          {backgrounds.length} patterns · {buttons.length} buttons
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
