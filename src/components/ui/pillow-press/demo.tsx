"use client";

import { useState } from "react";
import { PillowPress } from "./pillow-press";

const scenes = [
  {
    id: "dim",
    label: "Dim",
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M12.5 9.6A5 5 0 0 1 6.4 3.5a5 5 0 1 0 6.1 6.1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "warm",
    label: "Warm",
    icon: (
      <svg viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 3.5a4.5 4.5 0 0 1 0 9Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "bright",
    label: "Bright",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="8" cy="8" r="2.8" />
        <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
      </svg>
    ),
  },
];

export default function Demo() {
  const [scene, setScene] = useState("warm");

  return (
    <div
      style={{
        display: "grid",
        gap: 20,
        justifyItems: "center",
        width: "min(100%, 340px)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          font: "500 13px/1.3 var(--hv-font-sans)",
          color: "var(--hv-ink-2)",
        }}
      >
        <span>Reading lamp</span>
        <span>{scene === "dim" ? "2200K · 20%" : scene === "warm" ? "2700K · 60%" : "4000K · 100%"}</span>
      </div>
      <div role="group" aria-label="Lamp scene" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {scenes.map((s) => (
          <PillowPress key={s.id} icon={s.icon} pressed={scene === s.id} onClick={() => setScene(s.id)} size="sm">
            {s.label}
          </PillowPress>
        ))}
      </div>
    </div>
  );
}
