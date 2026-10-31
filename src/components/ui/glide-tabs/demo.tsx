"use client";

import { GlideTabs } from "./glide-tabs";

const p = { margin: 0, maxWidth: 360 } as const;

export default function Demo() {
  return (
    <div style={{ display: "grid", gap: 28, justifyItems: "center", width: "min(100%, 420px)" }}>
      <GlideTabs
        label="Billing period"
        tabs={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" },
          { value: "lifetime", label: "Lifetime" },
        ]}
        defaultValue="yearly"
      />
      <GlideTabs
        label="Project views"
        style={{ width: "100%" }}
        tabs={[
          { value: "overview", label: "Overview", content: <p style={p}>Three releases this week. The last one shipped on Friday with two fixes.</p> },
          { value: "activity", label: "Activity", content: <p style={p}>Mara reviewed the pricing copy. Theo merged the settings branch.</p> },
          { value: "settings", label: "Settings", content: <p style={p}>Visibility is set to the team. Notifications go to the release channel.</p> },
        ]}
      />
    </div>
  );
}
