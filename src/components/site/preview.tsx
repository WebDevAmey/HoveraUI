"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Segmented } from "./segmented";
import { SourceTabs, type SourceFile } from "./source-tabs";

type View = "preview" | "code";

/**
 * The stage every component is shown on: a quiet tray holding one raised card.
 * Preview and Code swap inside the same frame, so moving from looking to copying keeps your place.
 * The demo stays mounted while the code shows, so it keeps its state when you come back.
 */
export function Preview({ children, files, tall }: { children: ReactNode; files?: SourceFile[]; tall?: boolean }) {
  const [view, setView] = useState<View>("preview");
  const [run, setRun] = useState(0);
  const id = useId();

  return (
    <div className="rounded-[22px] bg-surface p-1.5 ring-1 ring-line" style={{ "--hv-code-bg": "var(--hv-raised)" } as CSSProperties}>
      <div className="flex items-center justify-between gap-3 py-1 pl-1 pr-1">
        {files?.length ? (
          <Segmented
            size="sm"
            label="View"
            idBase={id}
            value={view}
            onChange={setView}
            options={[
              { value: "preview", label: "Preview" },
              { value: "code", label: "Code" },
            ]}
          />
        ) : (
          <span className="px-2 text-[12px] font-medium text-ink-3">Preview</span>
        )}
        <button
          type="button"
          onClick={() => {
            setView("preview");
            setRun((n) => n + 1);
          }}
          aria-label="Replay preview"
          title="Replay"
          className="press grid size-8 place-items-center rounded-[9px] text-ink-3 transition-[color,background-color,transform] duration-150 hover:bg-raised hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1M13.5 2.5v3h-3" />
          </svg>
        </button>
      </div>
      <div
        id={`${id}-panel`}
        role={files?.length ? "tabpanel" : undefined}
        aria-labelledby={files?.length ? `${id}-tab-${view}` : undefined}
        className="overflow-hidden rounded-[17px] bg-raised ring-1 ring-line"
      >
        <div
          hidden={view !== "preview"}
          className={cn(
            "relative grid place-items-center px-4 py-14 sm:px-10",
            tall ? "min-h-[540px]" : "min-h-[420px]",
          )}
        >
          <div key={run} className="grid w-full place-items-center">
            {children}
          </div>
        </div>
        {files?.length && view === "code" ? <SourceTabs files={files} bare /> : null}
      </div>
    </div>
  );
}
