"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const COLLAPSED = 300;

/**
 * Highlighted code that folds to a short excerpt when it runs long, with one quiet
 * control to open it. The fade only hints that more follows; nothing is hidden from search.
 */
export function CodeView({ html, id, labelledBy, className }: { html: string; id?: string; labelledBy?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [long, setLong] = useState(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measuring needs the rendered code, so this has to run after layout.
    setLong(el.scrollHeight > COLLAPSED + 80);
    setOpen(false);
    el.scrollTop = 0;
  }, [html]);

  const folded = long && !open;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        id={id}
        role={labelledBy ? "tabpanel" : undefined}
        aria-labelledby={labelledBy}
        tabIndex={0}
        className={cn("code-scroll", folded ? "overflow-hidden" : "max-h-[640px] overflow-auto")}
        style={folded ? { maxHeight: COLLAPSED } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {long && (
        <div
          className={cn(
            "flex justify-center",
            folded
              ? "pointer-events-none absolute inset-x-0 bottom-0 h-28 items-end bg-gradient-to-t from-[var(--hv-code-bg,var(--hv-surface))] from-30% to-transparent pb-4"
              : "border-t border-line py-2.5",
          )}
        >
          <button
            type="button"
            onClick={() => {
              setOpen((value) => !value);
              if (open) ref.current?.scrollTo({ top: 0 });
            }}
            aria-expanded={open}
            className="press pointer-events-auto inline-flex h-8 items-center gap-1.5 rounded-full bg-raised px-3.5 text-[12.5px] font-medium text-ink-2 shadow-[0_1px_2px_rgb(0_0_0/0.05)] ring-1 ring-line transition-[color,box-shadow,transform] hover:text-ink hover:ring-line-strong"
          >
            {open ? "Collapse" : "Show full code"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              aria-hidden="true"
              className={cn("transition-transform duration-200 ease-[var(--hv-ease-out)]", open && "rotate-180")}
            >
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
