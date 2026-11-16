"use client";

import { cn } from "@/lib/cn";
import { openSearch } from "./site-search";

/** Looks like a search field, opens the site search. Used in the sidebar and the hero. */
export function SearchTrigger({ label = "Search", className }: { label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-keyshortcuts="Meta+K Control+K /"
      className={cn(
        "group flex items-center gap-2 bg-raised/70 text-ink-3 ring-1 ring-line transition-[background-color,color,box-shadow] duration-150 hover:bg-raised hover:text-ink-2 hover:ring-line-strong",
        className,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3 3" strokeLinecap="round" />
      </svg>
      {label}
      <kbd aria-hidden="true" className="ml-auto flex gap-0.5 font-sans text-[11px] text-ink-3">
        <span className="grid h-5 min-w-5 place-items-center rounded-md bg-surface px-1 ring-1 ring-line">⌘</span>
        <span className="grid h-5 min-w-5 place-items-center rounded-md bg-surface px-1 ring-1 ring-line">K</span>
      </kbd>
    </button>
  );
}
