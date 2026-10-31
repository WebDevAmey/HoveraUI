"use client";

import { useState } from "react";
import { AsciiResolve } from "./ascii-resolve";

export default function Demo() {
  const [run, setRun] = useState(0);

  return (
    <div
      style={{
        width: "min(100%, 340px)",
        border: "1px solid var(--hv-line)",
        borderRadius: 10,
        background: "var(--hv-surface)",
        overflow: "hidden",
      }}
    >
      <AsciiResolve replayKey={run} background="var(--hv-surface)">
        <div style={{ padding: "18px 20px 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              font: "500 11px/1 var(--hv-font-mono)",
              letterSpacing: "0.08em",
              color: "var(--hv-ink-2)",
            }}
          >
            <span>TRANSMISSION 07</span>
            <span>RX OK</span>
          </div>
          <h3
            style={{
              margin: "28px 0 8px",
              font: "400 34px/1 var(--hv-font-serif)",
              letterSpacing: "-0.03em",
              color: "var(--hv-ink)",
            }}
          >
            The signal <em>arrived</em>
          </h3>
          <p style={{ margin: 0, font: "400 13px/1.55 var(--hv-font-sans)", color: "var(--hv-ink-2)" }}>
            Every line here was readable before it was visible. The glyphs only decide when you see it.
          </p>
        </div>
      </AsciiResolve>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 12px",
          borderTop: "1px solid var(--hv-line)",
        }}
      >
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          style={{
            font: "500 11px/1 var(--hv-font-mono)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "8px 10px",
            border: "1px solid var(--hv-line-strong)",
            borderRadius: 2,
            background: "transparent",
            color: "var(--hv-ink)",
            cursor: "pointer",
          }}
        >
          Replay
        </button>
      </div>
    </div>
  );
}
