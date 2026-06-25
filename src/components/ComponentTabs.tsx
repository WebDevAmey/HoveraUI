"use client";

import { useState } from "react";
import CopyButton from "@/components/CopyButton";

interface ComponentTabsProps {
  preview: React.ReactNode;
  code: string;
  needsLightPreview?: boolean;
}

export default function ComponentTabs({ preview, code, needsLightPreview }: ComponentTabsProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-2">
        <div className="flex gap-1 py-2">
          <button
            onClick={() => setTab("preview")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              tab === "preview" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              tab === "code" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Code
          </button>
        </div>
        <CopyButton
          code={code}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        />
      </div>

      {tab === "preview" ? (
        <div
          className={`flex min-h-[20rem] items-center justify-center p-8 ${
            needsLightPreview ? "bg-white" : "bg-zinc-50 dark:bg-zinc-950"
          }`}
        >
          {preview}
        </div>
      ) : (
        <pre className="min-h-[20rem] overflow-x-auto bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
