"use client";

import { useId, useState } from "react";
import { CopyButton } from "./copy-button";

export function SourceTabs({ files }: { files: { name: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const file = files[active];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex h-10 items-center justify-between border-b border-line pl-1.5 pr-1.5">
        <div role="tablist" aria-label="Source files" className="flex gap-1">
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
              className="rounded-md px-2.5 py-1 font-mono text-[11px] text-ink-2 transition-colors hover:text-ink aria-selected:bg-sunken aria-selected:text-ink"
            >
              {f.name}
            </button>
          ))}
        </div>
        <CopyButton text={file.code} label="Copy file" />
      </div>
      <pre
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="max-h-[520px] overflow-auto p-4 font-mono text-[12.5px] leading-[1.7] text-ink"
      >
        <code>{file.code}</code>
      </pre>
    </div>
  );
}
