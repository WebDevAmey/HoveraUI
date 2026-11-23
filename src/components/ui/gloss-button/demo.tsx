"use client";

import { GlossButton } from "./gloss-button";

const arrow = (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Demo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <GlossButton size="lg">Browse Components</GlossButton>
      <GlossButton tone="neutral" size="lg">
        Read the docs
      </GlossButton>
      <GlossButton tone="ink" shape="pill" icon={arrow}>
        Get started
      </GlossButton>
    </div>
  );
}
