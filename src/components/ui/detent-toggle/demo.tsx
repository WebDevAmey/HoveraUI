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
          font: "500 13px/1.3 var(--hv-font-sans)",
          color: "var(--hv-ink-2)",
        }}
      >
        Condenser mic
      </span>
      <DetentToggle label="Phantom power" defaultChecked style={row} />
      <DetentToggle label="Low cut" style={row} />
      <DetentToggle label="Pad −20 dB" disabled style={row} />
    </div>
  );
}
