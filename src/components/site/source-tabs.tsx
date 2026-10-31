"use client";

import { useId, useState } from "react";
import { CopyButton } from "./copy-button";

export type SourceFile = { name: string; code: string; html: string };

export function SourceTabs({ files }: { files: SourceFile[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const file = files[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex h-11 items-center justify-between border-b border-line px-1.5">
        <div role="tablist" aria-label="Source files" className="flex gap-0.5">
          {files.map((f, i) => (
            <button
              key={f.name}
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
              className="rounded-lg px-2.5 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:text-ink aria-selected:bg-sunken aria-selected:text-ink"
            >
              {f.name}
            </button>
          ))}
        </div>
        <CopyButton text={file.code} label={`Copy ${file.name}`} />
      </div>
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="code-scroll max-h-[520px] overflow-auto"
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
    </div>
  );
}
