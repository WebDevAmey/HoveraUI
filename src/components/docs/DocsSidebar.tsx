"use client";

import Link from "next/link";
import { docsNav } from "@/data/docs/nav";
import type { DocNavGroup } from "@/types/docs";

const ICONS: Record<DocNavGroup["icon"], React.ReactNode> = {
  buttons: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="3" />
    </svg>
  ),
  motion: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  ),
  interactive: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  ),
};

interface DocsSidebarProps {
  activeSlug: string;
  className?: string;
}

export default function DocsSidebar({ activeSlug, className }: DocsSidebarProps) {
  return (
    <nav aria-label="Component documentation" className={className}>
      <div className="flex flex-col gap-5">
        {docsNav.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {ICONS[group.icon]}
              {group.label}
            </div>
            <div className="mt-1.5 flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = item.slug === activeSlug;
                return (
                  <Link
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-secondary font-medium text-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    {item.isNew && (
                      <span className="ml-2 rounded-full bg-hovera px-1.5 py-0.5 text-[10px] font-semibold text-hovera-foreground">
                        New
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
