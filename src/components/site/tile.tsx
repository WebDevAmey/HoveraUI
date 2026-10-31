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
    <article style={style} className={cn("flex flex-col rounded-[22px] bg-raised p-2 shadow-[0_0_0_1px_var(--hv-line)]", className)}>
      <div className="relative grid min-h-[300px] flex-1 place-items-center overflow-hidden rounded-[16px] bg-canvas px-5 py-8">
        <Demo />
      </div>
      <Link href={`/components/${meta.slug}`} className="group block rounded-[14px] px-3 pb-2 pt-4">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-line-strong">
            {meta.name}
          </span>
          <span className="text-[12px] text-ink-2">{meta.material}</span>
        </span>
        <span className="mt-1 line-clamp-1 block text-[13px] text-ink-2">{meta.description}.</span>
      </Link>
    </article>
  );
}
