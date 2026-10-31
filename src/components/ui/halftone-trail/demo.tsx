"use client";

import { HalftoneTrail } from "./halftone-trail";

export default function Demo() {
  return (
    <HalftoneTrail
      style={{
        width: "min(100%, 520px)",
        height: 260,
        borderRadius: 12,
        border: "1px solid var(--hv-line)",
        background: "var(--hv-surface)",
        cursor: "crosshair",
      }}
    >
      <div
        style={{
          height: "100%",
          boxSizing: "border-box",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            font: "500 11px/1 var(--hv-font-mono)",
            letterSpacing: "0.08em",
            color: "var(--hv-ink-2)",
          }}
        >
          <span>SCREEN 15°</span>
          <span>85 LPI</span>
        </div>
        <p
          style={{
            margin: 0,
            font: "400 clamp(30px, 6vw, 44px)/1 var(--hv-font-serif)",
            letterSpacing: "-0.025em",
            color: "var(--hv-ink)",
          }}
        >
          Draw across <em>the plate</em>
        </p>
      </div>
    </HalftoneTrail>
  );
}
