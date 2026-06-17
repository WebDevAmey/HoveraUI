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
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">

      {/* Logo */}
      <div className="border-b border-zinc-200 p-5 dark:border-zinc-800">
        <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-lg font-bold text-transparent">
          BackLab
        </span>
      </div>

      {/* Search */}
      <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-zinc-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100"
            aria-label="Search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
        <div className="flex flex-col gap-0.5">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors ${
                category === tab.value
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/60"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                  category === tab.value
                    ? "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300"
                    : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
                }`}
              >
                {getCount(tab.value)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <nav className="flex-1 overflow-y-auto p-3" aria-label="Item list">
        {totalVisible === 0 && (
          <p className="px-3 py-8 text-center text-xs text-zinc-400">No results found</p>
        )}

        {gradients.length > 0 && (
          <section className="mb-4">
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              Gradients
            </p>
            <div className="space-y-0.5">
              {gradients.map((bg) => (
                <button
                  key={bg.slug}
                  onClick={() => setActiveSlug(activeSlug === bg.slug ? null : bg.slug)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeSlug === bg.slug
                      ? "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
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
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              Patterns
            </p>
            <div className="space-y-0.5">
              {patterns.map((bg) => (
                <button
                  key={bg.slug}
                  onClick={() => setActiveSlug(activeSlug === bg.slug ? null : bg.slug)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeSlug === bg.slug
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
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
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
              Buttons
            </p>
            <div className="space-y-0.5">
              {visibleButtons.map((btn) => (
                <button
                  key={btn.slug}
                  onClick={() => setActiveSlug(activeSlug === btn.slug ? null : btn.slug)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    activeSlug === btn.slug
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60"
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
      <div className="flex items-center justify-between border-t border-zinc-200 p-4 dark:border-zinc-800">
        <span className="text-xs text-zinc-400">
          {backgrounds.length} patterns · {buttons.length} buttons
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}
