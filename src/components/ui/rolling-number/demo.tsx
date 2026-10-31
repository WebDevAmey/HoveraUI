"use client";

import { useEffect, useState } from "react";
import { RollingNumber } from "./rolling-number";

const steps = [48230, 48304, 49117, 51862, 51904];

export default function Demo() {
  const [i, setI] = useState(0);
  const [plan, setPlan] = useState<"month" | "year">("month");

  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % steps.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  const label = { margin: 0, color: "var(--hv-ink-2)", font: "500 13px/1.3 var(--hv-font-sans)" } as const;

  return (
    <div style={{ display: "grid", gap: 36, justifyItems: "center", textAlign: "center" }}>
      <div style={{ display: "grid", gap: 10 }}>
        <p style={label}>Active readers</p>
        <RollingNumber value={steps[i]} style={{ font: "400 64px/1 var(--hv-font-serif)", letterSpacing: "-0.02em", color: "var(--hv-ink)" }} />
      </div>
      <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
        <RollingNumber
          value={plan === "month" ? 24 : 240}
          format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
          locale="en-GB"
          style={{ font: "600 28px/1 var(--hv-font-sans)", color: "var(--hv-ink)" }}
        />
        <button
          type="button"
          onClick={() => setPlan((p) => (p === "month" ? "year" : "month"))}
          style={{
            border: "1px solid var(--hv-line-strong)",
            borderRadius: 999,
            padding: "6px 14px",
            background: "var(--hv-raised)",
            color: "var(--hv-ink)",
            font: "500 13px/1 var(--hv-font-sans)",
            cursor: "pointer",
          }}
        >
          Show per {plan === "month" ? "year" : "month"}
        </button>
      </div>
    </div>
  );
}
