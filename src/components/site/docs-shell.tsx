import type { ReactNode } from "react";
import { registry } from "@/registry";
import { categories } from "@/registry/types";
import { DocsSidebar, type SidebarGroup } from "./docs-sidebar";
import { Toc } from "./toc";

const groups: SidebarGroup[] = [
  {
    label: "Guides",
    items: [
      { href: "/docs", label: "Overview" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  ...categories.map((category) => ({
    label: category.label,
    items: registry
      .filter((entry) => entry.meta.category === category.id)
      .map((entry) => ({ href: `/docs/${entry.meta.slug}`, label: entry.meta.name })),
  })),
];

/** Three-zone docs layout: sticky sidebar, article, sticky table of contents. */
export function DocsShell({ toc, children }: { toc: { id: string; label: string }[]; children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_180px]">
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto py-10 pr-2 lg:block">
        <DocsSidebar groups={groups} />
      </aside>
      <div className="min-w-0 py-10 lg:py-14">{children}</div>
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] py-14 xl:block">
        <Toc items={toc} />
      </aside>
    </div>
  );
}
