"use client";

import { useDeferredValue, useState, useSyncExternalStore } from "react";
import { registry } from "@/registry";
import { categories, type Category } from "@/registry/types";
import { Tile } from "./tile";

type Filter = Category | "all";

const noopSubscribe = () => () => {};

function readCategory(): Category | null {
  const value = new URLSearchParams(window.location.search).get("category");
  return categories.some((c) => c.id === value) ? (value as Category) : null;
}

export function Gallery({ syncUrl = false }: { syncUrl?: boolean }) {
  const [chosen, setChosen] = useState<Filter | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // The server renders the full grid; ?category= applies after hydration.
  const fromUrl = useSyncExternalStore(noopSubscribe, readCategory, () => null);
  const filter: Filter = chosen ?? (syncUrl && fromUrl ? fromUrl : "all");

  const choose = (next: Filter) => {
    setChosen(next);
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", next);
    window.history.replaceState(null, "", url);
  };

  const q = deferredQuery.trim().toLowerCase();
  const items = registry.filter(({ meta }) => {
    if (filter !== "all" && meta.category !== filter) return false;
    if (!q) return true;
    return [meta.name, meta.description, meta.material, meta.category].some((s) => s.toLowerCase().includes(q));
  });

  const tags: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-1.5">
          {tags.map((tag) => {
            const count = tag.id === "all" ? registry.length : registry.filter((e) => e.meta.category === tag.id).length;
            return (
              <button
                key={tag.id}
                type="button"
                aria-pressed={filter === tag.id}
                onClick={() => choose(tag.id)}
                className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-canvas"
              >
                {tag.label}
                <span className="ml-1.5 font-mono text-[10px] opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block sm:w-64">
          <span className="sr-only">Search components</span>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-2">
            <circle cx="6" cy="6" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="m9.25 9.25 3 3" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or material"
            className="h-9 w-full rounded-full border border-line bg-raised pl-8 pr-3 text-[13px] text-ink placeholder:text-ink-2 focus-visible:border-accent"
          />
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {items.length} components shown
      </p>
      {items.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ meta, Demo }) => (
            <Tile key={meta.slug} meta={meta} Demo={Demo} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-ink-2">Nothing matches “{query}”. Try a material such as pixel or glass.</p>
      )}
    </div>
  );
}
