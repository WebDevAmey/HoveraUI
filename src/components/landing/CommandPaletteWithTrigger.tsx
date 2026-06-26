"use client";

import { useApp } from "@/context/AppContext";
import SiteNav from "@/components/layout/SiteNav";
import CommandPalette from "@/components/CommandPalette";

/** Renders the shared SiteNav wired to open the command palette, plus the palette itself. */
export default function CommandPaletteWithTrigger() {
  const { setCommandOpen } = useApp();

  return (
    <>
      <SiteNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette />
    </>
  );
}
