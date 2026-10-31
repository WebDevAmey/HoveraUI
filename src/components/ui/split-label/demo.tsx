"use client";

import { SplitLabel } from "./split-label";

export default function Demo() {
  return (
    <div style={{ display: "grid", gap: 24, justifyItems: "center", width: "min(100%, 340px)" }}>
      <p
        style={{
          margin: 0,
          font: "400 italic 22px/1.2 var(--hv-font-serif)",
          letterSpacing: "-0.01em",
          color: "var(--hv-ink)",
          textAlign: "center",
        }}
      >
        Notes on slow rooms
        <span
          style={{
            display: "block",
            marginTop: 8,
            font: "500 11px/1 var(--hv-font-mono)",
            fontStyle: "normal",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--hv-ink-2)",
          }}
        >
          Issue 14 · 12 min
        </span>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <SplitLabel label="Read essay" reveal="begin" variant="solid" />
        <SplitLabel label="Save for later" reveal="keep" shape="square" />
      </div>
    </div>
  );
}
