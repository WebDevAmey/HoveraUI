"use client";

import { useState } from "react";
import { PixelWipe } from "./pixel-wipe";

const slides = [
  { numeral: "I", title: "Ground", line: "Lay one flat colour and leave it alone.", tone: "var(--hv-ether-3)" },
  { numeral: "II", title: "Pattern", line: "Introduce an order the eye can trust.", tone: "var(--hv-ether-1)" },
  { numeral: "III", title: "Signal", line: "Let a single mark stand out from the rest.", tone: "var(--hv-ether-2)" },
];

export default function Demo() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <div style={{ width: "min(100%, 340px)", display: "grid", gap: 12 }}>
      <PixelWipe
        trigger={index}
        cell={20}
        style={{ height: 196, borderRadius: 10, border: "1px solid var(--hv-line)" }}
      >
        <section
          aria-live="polite"
          style={{
            height: "100%",
            boxSizing: "border-box",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: `linear-gradient(160deg, ${slide.tone}, color-mix(in oklab, ${slide.tone} 45%, #fbfaf8))`,
            color: "#1b1a18",
          }}
        >
          <span style={{ font: "500 11px/1 var(--hv-font-mono)", letterSpacing: "0.08em" }}>
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div>
            <h3 style={{ margin: 0, font: "400 40px/1 var(--hv-font-serif)", letterSpacing: "-0.03em" }}>
              <span style={{ fontStyle: "italic", marginRight: 10 }}>{slide.numeral}.</span>
              {slide.title}
            </h3>
            <p style={{ margin: "8px 0 0", font: "400 13px/1.5 var(--hv-font-sans)", color: "#3d3a35" }}>{slide.line}</p>
          </div>
        </section>
      </PixelWipe>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
          {slides.map((s, i) => (
            <span
              key={s.title}
              style={{
                width: 8,
                height: 8,
                background: i === index ? "var(--hv-ink)" : "var(--hv-line-strong)",
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          style={{
            font: "500 12px/1 var(--hv-font-mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "10px 14px",
            border: "1px solid var(--hv-ink)",
            borderRadius: 2,
            background: "transparent",
            color: "var(--hv-ink)",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
