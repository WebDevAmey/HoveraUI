"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CommandPalette, type CommandGroup } from "@/components/site/search-palette";

export type SearchGroup = {
  label: string;
  items: { href: string; label: string; hint?: string; keywords?: string }[];
};

const EVENT = "hv:search";

/** Opens the site search from anywhere, such as the sidebar's search button. */
export function openSearch() {
  window.dispatchEvent(new Event(EVENT));
}

/** Site search: the library's own Command Palette, opened with the icon button, ⌘K or /. */
export function SiteSearch({ groups, className }: { groups: SearchGroup[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
      event.preventDefault();
      setOpen(true);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENT, onOpen);
    };
  }, []);

  const paletteGroups = useMemo<CommandGroup[]>(
    () =>
      groups.map((group) => ({
        label: group.label,
        items: group.items.map((item) => ({
          id: item.href,
          label: item.label,
          hint: item.hint,
          keywords: item.keywords,
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
        aria-keyshortcuts="Meta+K Control+K /"
        aria-label="Search components and guides"
        className={className}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" strokeLinecap="round" />
        </svg>
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
