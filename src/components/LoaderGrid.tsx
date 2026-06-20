"use client";

import { loaders } from "@/data/loader";
import { useApp } from "@/context/AppContext";
import LoaderCard from "@/components/LoaderCard";

export default function LoaderGrid() {
  const { category, searchQuery } = useApp();

  if (category !== "all" && category !== "loaders") return null;

  const filtered = loaders.filter((loader) =>
    loader.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
        Loaders
      </h2>
      <p className="mb-5 text-xs text-zinc-500" aria-live="polite" aria-atomic="true">
        {filtered.length} loader{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, i) => (
          <LoaderCard key={item.slug} {...item} stagger={i} />
        ))}
      </div>
    </div>
  );
}
