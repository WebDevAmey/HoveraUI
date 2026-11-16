"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CommandPalette, type CommandGroup } from "@/components/ui/command-palette/command-palette";

export type SearchGroup = { label: string; items: { href: string; label: string; hint?: string }[] };

/** Header search: the library's own Command Palette, opened with the icon button or ⌘K. */
export function SiteSearch({ groups, className }: { groups: SearchGroup[]; className?: string }) {
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
        aria-keyshortcuts="Meta+K Control+K"
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
