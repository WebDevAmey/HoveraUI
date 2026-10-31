"use client";

import { useState } from "react";
import { HoldToConfirm } from "./hold-to-confirm";

export default function Demo() {
  const [log, setLog] = useState("Press and hold · 1.2 s");

  return (
    <div style={{ display: "grid", gap: 12, width: "min(100%, 280px)" }}>
      <HoldToConfirm
        icon={
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
            <rect x="2" y="3" width="12" height="3.5" rx="1" />
            <path d="M3 6.5v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-6M6.5 9.5h3" strokeLinecap="round" />
          </svg>
        }
        confirmedLabel="Archived"
        onConfirm={() => setLog("Project archived")}
      >
        Archive project
      </HoldToConfirm>
      <HoldToConfirm
        tone="danger"
        icon={
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 4.5h11M6.5 4.5V3h3v1.5M4 4.5l.7 8.6a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9l.7-8.6" />
          </svg>
        }
        confirmedLabel="Deleted"
        onConfirm={() => setLog("3 drafts deleted")}
      >
        Delete 3 drafts
      </HoldToConfirm>
      <p
        aria-hidden="true"
        style={{
          margin: "4px 0 0",
          textAlign: "center",
          font: "500 11px/1 var(--hv-font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--hv-ink-2)",
        }}
      >
        {log}
      </p>
    </div>
  );
}
