"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The stage every component is shown on: one quiet frame, the component centred, a replay in the corner. */
export function Preview({ children, tall }: { children: ReactNode; tall?: boolean }) {
  const [run, setRun] = useState(0);

  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[24px] bg-surface px-4 py-16 shadow-[inset_0_0_0_1px_var(--hv-line)] sm:px-10",
        tall ? "min-h-[560px]" : "min-h-[440px]",
      )}
    >
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        aria-label="Replay preview"
        title="Replay"
        className="press absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full text-ink-3 transition-[color,background-color,transform] duration-200 hover:bg-sunken hover:text-ink"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1M13.5 2.5v3h-3" />
        </svg>
      </button>
      <div key={run} className="grid w-full place-items-center">
        {children}
      </div>
    </div>
  );
}
