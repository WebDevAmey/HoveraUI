"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { docsNav } from "@/data/docs/nav";
import { GUIDES } from "@/data/guides";
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

const SidebarItem = memo(function SidebarItem({
  href,
  name,
  isNew,
  isActive,
  isHovered,
  onHover,
}: {
  href: string;
  name: string;
  isNew?: boolean;
  isActive: boolean;
  isHovered: boolean;
  onHover: (href: string) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(href)}
      className="relative"
    >
      {isActive && (
        <div className="absolute inset-0 rounded-md bg-secondary z-0" />
      )}
      {isHovered && (
        <motion.div
          layoutId="sidebar-hover-bg"
          className="absolute inset-0 rounded-md bg-secondary/60 z-0"
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 35,
          }}
        />
      )}
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative z-10 flex w-full justify-between items-center rounded-md px-3 py-1.5 text-sm transition-colors",
          isActive
            ? "font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="truncate">{name}</span>
        {isNew && (
          <span className="ml-2 rounded-full bg-hovera px-1.5 py-0.5 text-[10px] font-semibold text-hovera-foreground">
            New
          </span>
        )}
      </Link>
    </div>
  );
});

const SidebarGroup = memo(function SidebarGroup({
  label,
  icon,
  items,
  activeSlug,
  hoveredPath,
  onHover,
}: {
  label: string;
  icon: DocNavGroup["icon"];
  items: Array<{ slug: string; name: string; isNew?: boolean }>;
  activeSlug: string;
  hoveredPath: string | null;
  onHover: (href: string) => void;
}) {
  const hasActive = items.some((item) => item.slug === activeSlug);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
          hasActive
            ? "bg-secondary text-foreground"
            : "text-muted-foreground"
        )}
      >
        {ICONS[icon]}
        {label}
      </div>

      <div className="mt-1 ml-4 flex flex-col border-l border-border pl-2 space-y-0.5">
        {items.map((item) => (
          <SidebarItem
            key={item.slug}
            href={`/components/${item.slug}`}
            name={item.name}
            isNew={item.isNew}
            isActive={item.slug === activeSlug}
            isHovered={hoveredPath === `/components/${item.slug}`}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
});

export default function DocsSidebar({ activeSlug, className }: DocsSidebarProps) {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const handleHover = useCallback((href: string) => {
    setHoveredPath(href);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredPath(null);
  }, []);

  return (
    <nav
      aria-label="Component documentation"
      className={cn("w-full space-y-6 pb-8", className)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {ICONS.interactive}
          Documentation
        </div>
        <div className="mt-1 ml-4 flex flex-col border-l border-border pl-2 space-y-0.5">
          {GUIDES.map((guide) => (
            <SidebarItem
              key={guide.slug}
              href={`/docs/${guide.slug}`}
              name={guide.name}
              isActive={guide.slug === activeSlug}
              isHovered={hoveredPath === `/docs/${guide.slug}`}
              onHover={handleHover}
            />
          ))}
        </div>
      </div>

      {docsNav.map((group) => (
        <SidebarGroup
          key={group.label}
          label={group.label}
          icon={group.icon}
          items={group.items}
          activeSlug={activeSlug}
          hoveredPath={hoveredPath}
          onHover={handleHover}
        />
      ))}
    </nav>
  );
}
