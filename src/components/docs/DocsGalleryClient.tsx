"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { docEntries } from "@/data/docs";
import { useApp } from "@/context/AppContext";
import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import CursorGlowCard from "@/components/CursorGlowCard";
import LazyMount from "@/components/LazyMount";

type FilterValue = "all" | "buttons" | "loaders" | "navbars" | "gradient" | "pattern" | "favorites";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Buttons", value: "buttons" },
  { label: "Loaders", value: "loaders" },
  { label: "Navbars", value: "navbars" },
  { label: "Gradients", value: "gradient" },
  { label: "Patterns", value: "pattern" },
  { label: "Favorites", value: "favorites" },
];

export default function DocsGalleryClient() {
  const { favorites, toggleFavorite, isFavorite } = useApp();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let entries = docEntries;

    if (filter === "favorites") {
      entries = entries.filter((e) => favorites.includes(e.slug));
    } else if (filter !== "all") {
      entries = entries.filter((e) => e.category === filter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      entries = entries.filter(
        (e) => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      );
    }

    return entries;
  }, [filter, search, favorites]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteNav />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 md:px-8">
        <h1 className="text-2xl font-semibold text-foreground">Components</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse every component, preview live, copy the code or install via the CLI.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1"
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.label}
                {f.value === "favorites" && favorites.length > 0 && (
                  <span className="ml-1.5 text-xs text-muted-foreground">({favorites.length})</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 sm:w-64">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components…"
              aria-label="Search components"
              className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground" role="status" aria-live="polite">
          {filtered.length} component{filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No components match your search or filter.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => {
              const Preview = entry.Preview;
              const favorited = isFavorite(entry.slug);
              return (
                <CursorGlowCard key={entry.slug}>
                  <Link href={`/docs/${entry.slug}`} className="block">
                    <LazyMount
                      className={`flex h-40 items-center justify-center overflow-hidden p-6 ${
                        entry.needsLightPreview ? "bg-white" : "bg-secondary/20"
                      }`}
                    >
                      <Preview />
                    </LazyMount>
                  </Link>
                  <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <Link href={`/docs/${entry.slug}`} className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-foreground hover:underline">
                        {entry.name}
                        {entry.isNew && (
                          <span className="ml-2 rounded-full bg-hovera px-1.5 py-0.5 text-[10px] font-semibold text-hovera-foreground align-middle">
                            New
                          </span>
                        )}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">{entry.category}</p>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(entry.slug);
                      }}
                      aria-label={favorited ? `Remove ${entry.name} from favorites` : `Add ${entry.name} to favorites`}
                      aria-pressed={favorited}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        favorited ? "text-rose-500" : "text-muted-foreground hover:text-rose-400"
                      }`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                </CursorGlowCard>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
