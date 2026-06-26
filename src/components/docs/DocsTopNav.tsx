"use client";

import SiteNav from "@/components/layout/SiteNav";

interface DocsTopNavProps {
  onOpenSidebar?: () => void;
}

/** Thin wrapper kept for existing call sites; renders the shared SiteNav. */
export default function DocsTopNav({ onOpenSidebar }: DocsTopNavProps) {
  return <SiteNav onOpenSidebar={onOpenSidebar} />;
}
