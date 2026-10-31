"use client";

import { DetentToggle } from "./detent-toggle";

const row = { width: "100%", padding: "8px 0" } as const;

export default function Demo() {
  return (
    <div style={{ display: "grid", width: "min(100%, 280px)" }}>
      <span
        style={{
          paddingBottom: 12,
          marginBottom: 4,
          borderBottom: "1px solid var(--hv-line)",
          font: "500 11px/1 var(--hv-font-mono)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--hv-ink-2)",
        }}
      >
        Input 2 · Condenser
      </span>
      <DetentToggle label="Phantom power" defaultChecked style={row} />
      <DetentToggle label="Low cut" style={row} />
      <DetentToggle label="Pad −20 dB" disabled style={row} />
    </div>
  );
}
