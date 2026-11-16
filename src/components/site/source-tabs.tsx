"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { CodeView } from "./code-view";
import { CopyButton } from "./copy-button";

export type SourceFile = { name: string; code: string; html: string };

/** One frame for a component's files: a tab per file, a copy button, and folded long code. */
export function SourceTabs({ files, bare = false }: { files: SourceFile[]; bare?: boolean }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const file = files[active];

  return (
    <div className={cn("overflow-hidden", !bare && "rounded-2xl bg-surface ring-1 ring-line")}>
      <div className="flex h-11 items-center justify-between gap-2 border-b border-line px-1.5">
        <div role="tablist" aria-label="Source files" className="flex min-w-0 gap-0.5 overflow-x-auto [scrollbar-width:none]">
          {files.map((f, i) => (
            <button
              key={f.name}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const next = (active + (e.key === "ArrowRight" ? 1 : files.length - 1)) % files.length;
                setActive(next);
                document.getElementById(`${id}-tab-${next}`)?.focus();
              }}
              className="shrink-0 rounded-lg px-2.5 py-1.5 font-mono text-[12px] text-ink-3 transition-colors duration-150 hover:text-ink-2 aria-selected:bg-raised aria-selected:text-ink aria-selected:shadow-[0_0_0_1px_var(--hv-line)]"
            >
              {f.name}
            </button>
          ))}
        </div>
        <CopyButton text={file.code} label={`Copy ${file.name}`} />
      </div>
      <CodeView html={file.html} id={`${id}-panel`} labelledBy={`${id}-tab-${active}`} />
    </div>
  );
}
