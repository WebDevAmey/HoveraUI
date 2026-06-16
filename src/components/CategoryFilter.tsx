"use client";

import { useApp } from "@/context/AppContext";
import { backgrounds } from "@/data/background";

type Tab = "all" | "gradient" | "pattern" | "favorites";

const tabs: { label: string; value: Tab }[] = [
  { label: "All", value: "all" },
  { label: "Gradients", value: "gradient" },
  { label: "Patterns", value: "pattern" },
  { label: "Favorites", value: "favorites" },
];

export default function CategoryFilter() {
  const { category, setCategory, favorites } = useApp();

  const count = (tab: Tab): number => {
    if (tab === "all") return backgrounds.length;
    if (tab === "favorites") return favorites.length;
    return backgrounds.filter((b) => b.category === tab).length;
  };

  return (
    <div className="sticky top-14 z-30 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="flex gap-1 py-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {tabs.map((tab) => {
            const active = category === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setCategory(tab.value)}
                role="tab"
                aria-selected={active}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-white text-zinc-900"
                    : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-300"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                    active
                      ? "bg-zinc-200 text-zinc-700"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {count(tab.value)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
