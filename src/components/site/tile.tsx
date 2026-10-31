import Link from "next/link";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import type { ComponentMeta } from "@/registry/types";

export function Tile({
  meta,
  Demo,
  className,
  stageClassName,
}: {
  meta: ComponentMeta;
  Demo: ComponentType;
  className?: string;
  stageClassName?: string;
}) {
  return (
    <article className={cn("group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface", className)}>
      <div className={cn("relative grid min-h-[300px] flex-1 place-items-center overflow-hidden px-5 py-8", stageClassName)}>
        <Demo />
      </div>
      <Link
        href={`/docs/${meta.slug}`}
        className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-[13px] transition-colors hover:bg-sunken/60"
      >
        <span className="font-medium tracking-[-0.01em] text-ink">{meta.name}</span>
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-ink-2">{meta.material}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            aria-hidden="true"
            className="text-ink-2 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:text-ink"
          >
            <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
