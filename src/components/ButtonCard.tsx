"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import type { ButtonItem } from "@/types";

interface ButtonCardProps extends ButtonItem {
  stagger: number;
}

export default function ButtonCard({ name, slug, category, component: Component, code, stagger, needsLightPreview }: ButtonCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="animate-fade-up rounded-md border border-border bg-card"
      style={{ "--stagger": `${stagger * 55}ms` } as React.CSSProperties}
      aria-label={`${name} button`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex h-52 items-center justify-center rounded-t-md p-8 ${
          needsLightPreview ? "bg-white" : "bg-zinc-50 dark:bg-zinc-950"
        }`}
      >
        <Component isHovered={isHovered} />
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-foreground">{name}</h3>
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium capitalize text-muted-foreground">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <CopyButton
            code={code}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          />
          <CopyButton
            code={`npx shadcn add @hovera/${slug}`}
            label="Copy CLI"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          />
        </div>
      </div>
    </article>
  );
}
