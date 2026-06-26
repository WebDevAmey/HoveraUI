"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { docEntries } from "@/data/docs";

export default function CommandPalette() {
  const { isCommandOpen, setCommandOpen } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = docEntries
    .filter((entry) => entry.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8);

  const open = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setCommandOpen(true);
    setTimeout(() => inputRef.current?.focus(), 30);
  }, [setCommandOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => setCommandOpen(false);

  const select = (slug: string) => {
    close();
    router.push(`/docs/${slug}`);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      select(filtered[activeIndex].slug);
    }
  };

  if (!isCommandOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search components"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div className="animate-scale-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0 text-muted-foreground" aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKey}
            placeholder="Search components…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-autocomplete="list"
            aria-label="Search components"
          />
          <span className="shrink-0 text-xs text-muted-foreground">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={close}
            className="rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            Esc
          </button>
        </div>

        <ul className="max-h-72 overflow-y-auto py-2" role="listbox" aria-label="Component results">
          {filtered.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-muted-foreground">
              No components match &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((entry, i) => (
            <li key={entry.slug} role="option" aria-selected={i === activeIndex}>
              <button
                onClick={() => select(entry.slug)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-hovera" aria-hidden="true" />
                <span className="flex-1">{entry.name}</span>
                <span className="text-xs capitalize text-muted-foreground">{entry.category}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> open</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
