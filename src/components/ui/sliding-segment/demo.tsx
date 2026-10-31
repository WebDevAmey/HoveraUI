"use client";

import { useState } from "react";
import { SlidingSegment } from "./sliding-segment";

const caption = {
  font: "500 11px/1 var(--hv-font-mono)",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--hv-ink-2)",
} as const;

export default function Demo() {
  const [range, setRange] = useState("week");

  return (
    <div style={{ display: "grid", gap: 28, width: "min(100%, 320px)" }}>
      <div style={{ display: "grid", gap: 10 }}>
        <span id="ss-range" style={caption}>
          Calendar range
        </span>
        <SlidingSegment
          aria-labelledby="ss-range"
          value={range}
          onValueChange={setRange}
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
            { value: "year", label: "Year" },
          ]}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <span id="ss-speed" style={caption}>
          Speed
        </span>
        <SlidingSegment
          aria-labelledby="ss-speed"
          size="sm"
          defaultValue="1"
          options={[
            { value: "0.5", label: "0.5×" },
            { value: "1", label: "1×" },
            { value: "1.5", label: "1.5×" },
            { value: "2", label: "2×" },
          ]}
        />
      </div>
    </div>
  );
}
