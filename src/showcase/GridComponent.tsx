"use client";

import { backgrounds } from "@/data/background";
import { useApp } from "@/context/AppContext";
import ComponentCard from "./CardComponent";

export default function ComponentGrid() {
  const { category, favorites } = useApp();

  const filtered = backgrounds.filter((bg) => {
    if (category === "gradient" || category === "pattern") {
      return bg.category === category;
    }
    if (category === "favorites") {
      return favorites.includes(bg.slug);
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 text-5xl leading-none text-zinc-700" aria-hidden="true">
          ✦
        </div>
        <h3 className="mb-2 text-base font-medium text-zinc-300">
          {category === "favorites"
            ? "No favorites yet"
            : "No patterns found"}
        </h3>
        <p className="text-sm text-zinc-500">
          {category === "favorites"
            ? "Click the heart icon on any pattern card to save it here."
            : "Try switching to a different category."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-5 text-xs text-zinc-600" aria-live="polite" aria-atomic="true">
        {filtered.length} pattern{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => {
          const Preview = item.component;
          return (
            <ComponentCard
              key={item.slug}
              title={item.name}
              slug={item.slug}
              code={item.code}
              category={item.category}
              stagger={i}
            >
              <Preview />
            </ComponentCard>
          );
        })}
      </div>
    </div>
  );
}
