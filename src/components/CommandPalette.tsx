"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { usePreview } from "@/context/PreviewContext";
import { backgrounds } from "@/data/background";

export default function CommandPalette() {
  const { isCommandOpen, setCommandOpen } = useApp();
  const { setActiveSlug } = usePreview();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = backgrounds.filter((bg) =>
    bg.name.toLowerCase().includes(query.toLowerCase())
  );

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
    setActiveSlug(slug);
    close();
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
      aria-label="Search patterns"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div className="animate-scale-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0 text-zinc-400" aria-hidden="true"
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
            placeholder="Search patterns…"
            className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-white dark:placeholder-zinc-500"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-autocomplete="list"
            aria-label="Search patterns"
          />
          <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-600">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={close}
            className="rounded border border-zinc-200 px-1.5 py-0.5 text-xs text-zinc-500 hover:text-zinc-700 dark:border-zinc-800 dark:hover:text-zinc-300"
            aria-label="Close"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <ul className="max-h-72 overflow-y-auto py-2" role="listbox" aria-label="Pattern results">
          {filtered.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-zinc-500">
              No patterns match &ldquo;{query}&rdquo;
            </li>
          )}
          {filtered.map((bg, i) => (
            <li key={bg.slug} role="option" aria-selected={i === activeIndex}>
              <button
                onClick={() => select(bg.slug)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${bg.category === "gradient" ? "bg-violet-500" : "bg-blue-500"}`}
                  aria-hidden="true"
                />
                <span className="flex-1">{bg.name}</span>
                <span className="text-xs capitalize text-zinc-400 dark:text-zinc-600">{bg.category}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex gap-4 border-t border-zinc-200 px-4 py-2 text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> preview</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
