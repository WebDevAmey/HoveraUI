"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useApp } from "@/context/AppContext";
import { docEntries } from "@/data/docs";

// Built on cmdk: combobox ARIA (aria-controls/aria-expanded/listbox wiring),
// filtering, and arrow-key selection all come from the library instead of a
// hand-rolled reimplementation.
export default function CommandPalette() {
  const { isCommandOpen, setCommandOpen } = useApp();
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isCommandOpen, setCommandOpen]);

  const select = (slug: string) => {
    setCommandOpen(false);
    router.push(`/docs/${slug}`);
  };

  if (!isCommandOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setCommandOpen(false)}
        aria-hidden="true"
      />

      <Command
        label="Search components"
        className="animate-scale-in relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0 text-muted-foreground" aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <Command.Input
            autoFocus
            placeholder="Search components…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
            onKeyDown={(e) => {
              if (e.key === "Escape") setCommandOpen(false);
            }}
          />
          <button
            onClick={() => setCommandOpen(false)}
            className="rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
            aria-label="Close"
          >
            Esc
          </button>
        </div>

        <Command.List className="max-h-72 overflow-y-auto py-2">
          <Command.Empty className="px-4 py-10 text-center text-sm text-muted-foreground">
            No components match your search.
          </Command.Empty>
          {docEntries.map((entry) => (
            <Command.Item
              key={entry.slug}
              value={entry.name + " " + entry.category}
              onSelect={() => select(entry.slug)}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm text-muted-foreground transition-colors data-[selected=true]:bg-secondary data-[selected=true]:text-foreground"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-hovera" aria-hidden="true" />
              <span className="flex-1">{entry.name}</span>
              <span className="text-xs capitalize">{entry.category}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Command.Item>
          ))}
        </Command.List>

        <div className="flex gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> open</span>
          <span><kbd className="font-mono">esc</kbd> close</span>
        </div>
      </Command>
    </div>
  );
}
