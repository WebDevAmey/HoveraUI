"use client";

import type { ReactNode } from "react";
import { QuietTooltip, TooltipGroup } from "./quiet-tooltip";

function Tool({ label, keys, children }: { label: string; keys: string[]; children: ReactNode }) {
  return (
    <QuietTooltip content={label} shortcut={keys}>
      <button
        type="button"
        aria-label={label}
        style={{
          display: "grid",
          placeItems: "center",
          width: 36,
          height: 36,
          border: 0,
          borderRadius: 10,
          background: "transparent",
          color: "var(--hv-ink)",
          cursor: "pointer",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {children}
        </svg>
      </button>
    </QuietTooltip>
  );
}

export default function Demo() {
  return (
    <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
      <TooltipGroup>
        <div
          role="toolbar"
          aria-label="Formatting"
          style={{
            display: "flex",
            gap: 2,
            padding: 4,
            borderRadius: 14,
            background: "var(--hv-raised)",
            boxShadow: "0 0 0 1px var(--hv-line), 0 6px 20px rgb(0 0 0 / 0.06)",
          }}
        >
          <Tool label="Bold" keys={["⌘", "B"]}>
            <path d="M4.5 3h4a2.5 2.5 0 0 1 0 5h-4zM4.5 8h4.5a2.5 2.5 0 0 1 0 5H4.5z" />
          </Tool>
          <Tool label="Italic" keys={["⌘", "I"]}>
            <path d="M10 3H6.5M9.5 13H6M9 3 7 13" />
          </Tool>
          <Tool label="Link" keys={["⌘", "K"]}>
            <path d="M7 9a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-.6.6M9 7a3 3 0 0 0-4.2 0l-2 2A3 3 0 0 0 7 13.2l.6-.6" />
          </Tool>
          <Tool label="Quote" keys={["⌘", "⇧", "."]}>
            <path d="M3 4v8M6.5 5.5h6.5M6.5 8h6.5M6.5 10.5h4" />
          </Tool>
        </div>
      </TooltipGroup>
      <p style={{ margin: 0, color: "var(--hv-ink-2)", font: "13px/1.4 var(--hv-font-sans)" }}>
        Hover one, then slide across the rest.
      </p>
    </div>
  );
}
