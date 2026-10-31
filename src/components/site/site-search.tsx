"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CommandPalette, type CommandGroup } from "@/components/ui/command-palette/command-palette";

export type SearchGroup = { label: string; items: { href: string; label: string; hint?: string }[] };

/** Header search: the library's own Command Palette, opened with the button or ⌘K. */
export function SiteSearch({ groups }: { groups: SearchGroup[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const paletteGroups = useMemo<CommandGroup[]>(
    () =>
      groups.map((group) => ({
        label: group.label,
        items: group.items.map((item) => ({
          id: item.href,
          label: item.label,
          hint: item.hint,
          onSelect: () => router.push(item.href),
        })),
      })),
    [groups, router],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search components"
        aria-keyshortcuts="Meta+K Control+K"
        className="press flex h-9 items-center gap-2 rounded-full border border-line bg-surface pl-3 pr-1.5 text-[13px] text-ink-2 transition-[color,border-color,transform] hover:border-line-strong hover:text-ink sm:w-52"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" strokeLinecap="round" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="ml-auto hidden h-6 items-center rounded-full border border-line bg-raised px-2 font-sans text-[11px] text-ink-2 sm:inline-flex">
          ⌘K
        </kbd>
      </button>
      <CommandPalette
        variant="dialog"
        open={open}
        onOpenChange={setOpen}
        groups={paletteGroups}
        placeholder="Search components and guides"
      />
    </>
  );
}
