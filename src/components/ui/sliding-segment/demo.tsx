"use client";

import { useState } from "react";
import { SlidingSegment } from "./sliding-segment";

const caption = {
  font: "500 13px/1.3 var(--hv-font-sans)",
  color: "var(--hv-ink-2)",
} as const;

export default function Demo() {
  const [range, setRange] = useState("week");

  return (
    <div style={{ display: "grid", width: "min(100%, 320px)" }}>
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
    </div>
  );
}
