"use client";

import { useApp } from "@/context/AppContext";
import SiteNav from "@/components/layout/SiteNav";

/** Thin wrapper kept for existing call sites; renders the shared SiteNav with ⌘K wired up. */
export default function TopNav() {
  const { setCommandOpen } = useApp();
  return <SiteNav onOpenCommand={() => setCommandOpen(true)} />;
}
