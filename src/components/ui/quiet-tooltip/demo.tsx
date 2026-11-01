"use client";

import type { ReactNode } from "react";
import { QuietTooltip } from "./quiet-tooltip";

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
          background: "var(--hv-raised)",
          boxShadow: "0 0 0 1px var(--hv-line), 0 6px 20px rgb(0 0 0 / 0.06)",
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
    <Tool label="Bold" keys={["⌘", "B"]}>
      <path d="M4.5 3h4a2.5 2.5 0 0 1 0 5h-4zM4.5 8h4.5a2.5 2.5 0 0 1 0 5H4.5z" />
    </Tool>
  );
}
