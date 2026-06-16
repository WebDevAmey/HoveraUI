"use client";

import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const { setCommandOpen, favorites } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-6">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 font-semibold text-white shrink-0"
          aria-label="BackLab home"
        >
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent text-lg font-bold">
            BackLab
          </span>
        </a>

        {/* Search trigger */}
        <button
          onClick={() => setCommandOpen(true)}
          className="flex flex-1 max-w-xs items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-400"
          aria-label="Search patterns (Cmd+K)"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="flex-1 text-left">Search patterns...</span>
          <kbd className="hidden rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-mono text-zinc-500 sm:inline">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1">
          {/* Favorites count */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400" aria-label={`${favorites.length} favorite${favorites.length !== 1 ? "s" : ""}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white" aria-hidden="true">
                {favorites.length}
              </span>
            )}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
