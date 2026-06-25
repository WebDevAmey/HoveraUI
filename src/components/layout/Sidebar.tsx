"use client";

import { useApp } from "@/context/AppContext";
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
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-background text-foreground">
      {/* Search */}
      <div className="p-4">
        <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 transition-colors focus-within:border-foreground/30">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search…"
            className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
            aria-label="Search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="flex h-5 w-5 items-center justify-center rounded-sm border border-border text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium text-foreground">
            <span className="h-2 w-2 rounded-full bg-foreground" aria-hidden="true" />
            Categories
          </div>

          <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCategory(tab.value)}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                  category === tab.value
                    ? "bg-secondary font-medium text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <span className="truncate">{tab.label}</span>
                <span className="ml-2 rounded-md bg-background px-1.5 py-0.5 text-[10px] tabular-nums text-muted-foreground">
                  {getCount(tab.value)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <span className="text-xs text-muted-foreground">
          {backgrounds.length} patterns · {buttons.length} buttons · {loaders.length} loaders · {navbars.length} navbars
        </span>
      </div>
    </aside>
  );
}
