"use client";

import { useId, useState } from "react";
import { DetentSlider } from "./detent-slider";

const lenses = [
  { value: 24, label: "24" },
  { value: 35, label: "35" },
  { value: 50, label: "50" },
  { value: 85, label: "85" },
  { value: 135, label: "135" },
  { value: 200, label: "200" },
];

const view: Record<number, string> = {
  24: "Wide, room in frame",
  35: "Street, close to the eye",
  50: "Normal, as you see it",
  85: "Portrait, soft background",
  135: "Compressed, distant",
  200: "Long, isolated subject",
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 12,
  marginBottom: 4,
  font: "500 13px/1.2 var(--hv-font-sans)",
  letterSpacing: "-0.01em",
} as const;

const meta = { font: "400 11px/1.2 var(--hv-font-mono)", color: "var(--hv-ink-2)" } as const;

export default function Demo() {
  const focalId = useId();
  const [focal, setFocal] = useState(50);
  const nearest = lenses.reduce((a, b) => (Math.abs(b.value - focal) < Math.abs(a.value - focal) ? b : a));

  return (
    <div style={{ width: "min(100%, 400px)", padding: "0 4px" }}>
      <div>
        <div style={row}>
          <span id={focalId}>Focal length</span>
          <span style={meta}>{nearest.value === focal ? view[focal] : `${focal} mm`}</span>
        </div>
        <DetentSlider
          aria-labelledby={focalId}
          min={24}
          max={200}
          value={focal}
          onValueChange={setFocal}
          format={(v) => `${v} mm`}
          marks={lenses}
        />
      </div>
    </div>
  );
}
