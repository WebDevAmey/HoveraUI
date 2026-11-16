import Link from "next/link";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import type { ComponentMeta } from "@/registry/types";

/**
 * A live demo on a quiet tray, captioned with its name and one line.
 * The demo stays interactive; only the caption links to the component's page.
 */
export function Tile({
  meta,
  Demo,
  badge,
  className,
  stageClassName,
  zoom,
}: {
  meta: ComponentMeta;
  Demo: ComponentType;
  badge?: string;
  className?: string;
  stageClassName?: string;
  /** Shrinks the demo to fit a small stage, keeping its layout and pointer mapping intact. */
  zoom?: number;
}) {
  return (
    <article
      className={cn(
        "group/tile flex flex-col rounded-[22px] bg-surface p-1.5 ring-1 ring-line transition-[box-shadow] duration-200 hover:ring-line-strong",
        className,
      )}
    >
      <div
        className={cn(
          "relative grid min-h-[260px] flex-1 place-items-center overflow-hidden rounded-[17px] bg-raised px-5 py-10 ring-1 ring-line",
          stageClassName,
        )}
      >
        {zoom ? (
          <div className="grid w-full place-items-center" style={{ zoom }}>
            <Demo />
          </div>
        ) : (
          <Demo />
        )}
      </div>
      <Link href={`/components/${meta.slug}`} className="group block rounded-[14px] px-3 pb-2.5 pt-3">
        <span className="flex items-center gap-2">
          <span className="text-[14.5px] font-medium tracking-[-0.01em] text-ink">{meta.name}</span>
          {badge && (
            <span className="rounded-full bg-accent/10 px-1.5 text-[10.5px] font-medium leading-[18px] text-accent">{badge}</span>
          )}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden="true"
            className="ml-auto shrink-0 text-ink-3 transition-[color,translate] duration-200 ease-[var(--hv-ease-out)] group-hover:translate-x-0.5 group-hover:text-ink"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 6h7M6.5 3l3 3-3 3" />
          </svg>
        </span>
        <span className="mt-0.5 line-clamp-1 text-[13px] text-ink-2">{meta.description}.</span>
      </Link>
    </article>
  );
}
