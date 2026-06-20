"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";
import type { ButtonItem } from "@/types";

interface ButtonCardProps extends ButtonItem {
  stagger: number;
}

export default function ButtonCard({ name, category, component: Component, code, stagger }: ButtonCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="animate-fade-up rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800/70 dark:bg-zinc-950"
      style={{ "--stagger": `${stagger * 55}ms` } as React.CSSProperties}
      aria-label={`${name} button`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-52 items-center justify-center rounded-t-2xl bg-zinc-50 p-8 dark:bg-zinc-950">
        <Component isHovered={isHovered} />
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</h3>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium capitalize text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            {category}
          </span>
        </div>
        <CopyButton
          code={code}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        />
      </div>
    </article>
  );
}
