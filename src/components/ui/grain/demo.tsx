"use client";

import type { CSSProperties } from "react";
import { Grain } from "./grain";

const plates: { label: string; name: string; intensity: number; background: string }[] = [
  {
    label: "0.00",
    name: "Flat",
    intensity: 0,
    background:
      "radial-gradient(120% 90% at 20% 10%, var(--hv-ether-1), transparent 60%), radial-gradient(90% 80% at 90% 100%, var(--hv-ether-2), transparent 70%), var(--hv-ether-3)",
  },
  {
    label: "0.35",
    name: "Print",
    intensity: 0.35,
    background:
      "radial-gradient(110% 80% at 50% 115%, var(--hv-sky-lo), transparent 70%), linear-gradient(to bottom, var(--hv-sky-hi), color-mix(in oklab, var(--hv-sky-hi) 40%, var(--hv-ether-1)))",
  },
  {
    label: "0.70",
    name: "Pushed",
    intensity: 0.7,
    background:
      "radial-gradient(70% 60% at 70% 30%, var(--hv-ether-2), transparent 70%), radial-gradient(100% 80% at 10% 90%, var(--hv-ether-1), transparent 70%), var(--hv-sky-lo)",
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, height: "clamp(160px, 42vw, 220px)" }}>
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
