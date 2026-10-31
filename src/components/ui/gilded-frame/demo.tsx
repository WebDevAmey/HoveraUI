"use client";

import { GildedFrame } from "./gilded-frame";

export default function Demo() {
  return (
    <GildedFrame
      style={{ width: "min(100%, 300px)" }}
      eyebrow="Atelier Vesper · Salon"
      numeral="XII"
      title="An evening of quiet objects"
      footer={
        <>
          14 · 11 · 2026 — 19:00{" "}
          <a
            href="#reply"
            onClick={(event) => event.preventDefault()}
            style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 6 }}
          >
            Reply
          </a>
        </>
      }
    >
      Twelve pieces, one long table, candles until late.
    </GildedFrame>
  );
}
