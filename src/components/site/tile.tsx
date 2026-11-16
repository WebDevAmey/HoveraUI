import Link from "next/link";
import type { ComponentType } from "react";
import { cn } from "@/lib/cn";
import type { ComponentMeta } from "@/registry/types";

/** A live demo on a soft card, captioned with its name and one line. */
export function Tile({
  meta,
  Demo,
  className,
  style,
}: {
  meta: ComponentMeta;
  Demo: ComponentType;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article style={style} className={cn("flex flex-col rounded-[24px] bg-surface p-1.5 shadow-[inset_0_0_0_1px_var(--hv-line)]", className)}>
      <div className="relative grid min-h-[260px] flex-1 place-items-center overflow-hidden rounded-[19px] bg-raised px-5 py-10 shadow-[0_0_0_1px_var(--hv-line)]">
        <Demo />
      </div>
      <Link href={`/components/${meta.slug}`} className="group block rounded-[14px] px-3.5 pb-3 pt-3.5">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-line-strong">
            {meta.name}
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0 text-ink-3 transition-[color,translate] duration-300 ease-[var(--hv-ease-smooth)] group-hover:translate-x-0.5 group-hover:text-ink" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
        </span>
        <span className="mt-0.5 line-clamp-1 block text-[13px] text-ink-2">{meta.description}.</span>
      </Link>
    </article>
  );
}
