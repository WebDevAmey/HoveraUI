"use client";

import { DitherField } from "./dither-field";

export default function Demo() {
  return (
    <DitherField
      style={{
        width: "min(100%, 560px)",
        height: 280,
        borderRadius: 12,
        border: "1px solid var(--hv-line)",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <span style={{ font: "500 11px/1 var(--hv-font-mono)", letterSpacing: "0.08em", color: "var(--hv-ink-2)" }}>
          FIELD 8×8 · 2 TONES
        </span>
        <p
          style={{
            margin: 0,
            maxWidth: "12ch",
            font: "400 clamp(30px, 6vw, 44px)/1 var(--hv-font-serif)",
            letterSpacing: "-0.025em",
            color: "var(--hv-ink)",
          }}
        >
          Weather, in <em>two</em> tones
        </p>
      </div>
    </DitherField>
  );
}
