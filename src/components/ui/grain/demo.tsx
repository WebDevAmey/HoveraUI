"use client";

import type { CSSProperties } from "react";
import { Grain } from "./grain";

const plates: { label: string; name: string; intensity: number; background: string }[] = [
  {
    label: "0.35",
    name: "Print",
    intensity: 0.35,
    background:
      "radial-gradient(110% 80% at 50% 115%, var(--hv-sky-lo), transparent 70%), linear-gradient(to bottom, var(--hv-sky-hi), color-mix(in oklab, var(--hv-sky-hi) 40%, var(--hv-ether-1)))",
  },
];

const plate: CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 8,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: 10,
  boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--hv-ink) 8%, transparent)",
};

export default function Demo() {
  return (
    <div style={{ width: "min(100%, 520px)", display: "grid", gap: 10 }}>
      <div style={{ display: "grid", height: "clamp(180px, 46vw, 240px)" }}>
        {plates.map((p) => (
          <figure key={p.label} style={{ ...plate, background: p.background, margin: 0 }}>
            <Grain intensity={p.intensity} />
            <span
              style={{
                position: "relative",
                zIndex: 2,
                font: "italic 400 clamp(20px, 4vw, 26px)/1 var(--hv-font-serif)",
                letterSpacing: "-0.02em",
                color: "#2a2724",
                padding: "2px 2px 0",
              }}
            >
              {p.name}
            </span>
            <figcaption
              style={{
                position: "relative",
                zIndex: 2,
                font: "500 11px/1 var(--hv-font-mono)",
                letterSpacing: "0.04em",
                color: "#2a2724",
                background: "color-mix(in oklab, white 55%, transparent)",
                padding: "5px 6px",
                borderRadius: 4,
              }}
            >
              {p.label}
            </figcaption>
          </figure>
        ))}
      </div>
      <p
        style={{
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          font: "400 11px/1.4 var(--hv-font-mono)",
          letterSpacing: "0.04em",
          color: "var(--hv-ink-2)",
        }}
      >
        <span>INTENSITY</span>
        <span>overlay · 180px tile</span>
      </p>
    </div>
  );
}
