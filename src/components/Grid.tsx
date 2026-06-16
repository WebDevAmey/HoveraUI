"use client";

import { backgrounds } from "@/data/background";
import { useApp } from "@/context/AppContext";
import Card from "@/components/Card";

export default function Grid() {
  const { category, favorites, searchQuery } = useApp();

  const filtered = backgrounds.filter((bg) => {
    const matchesSearch = bg.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      category === "all" ||
      (category === "favorites" ? favorites.includes(bg.slug) : bg.category === category);
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 text-5xl leading-none text-zinc-300 dark:text-zinc-700" aria-hidden="true">
          ✦
        </div>
        <h3 className="mb-2 text-base font-medium text-zinc-700 dark:text-zinc-300">
          {category === "favorites" ? "No favorites yet" : "No patterns found"}
        </h3>
        <p className="text-sm text-zinc-500">
          {category === "favorites"
            ? "Click the heart icon on any pattern card to save it here."
            : "Try a different search or category."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p
        className="mb-5 text-xs text-zinc-500"
        aria-live="polite"
        aria-atomic="true"
      >
        {filtered.length} pattern{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => {
          const Preview = item.component;
          return (
            <Card
              key={item.slug}
              title={item.name}
              slug={item.slug}
              code={item.code}
              category={item.category}
              stagger={i}
            >
              <Preview />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
