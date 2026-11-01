"use client";

import { DetentToggle } from "./detent-toggle";

export default function Demo() {
  return (
    <div style={{ width: "min(100%, 280px)" }}>
      <DetentToggle label="Phantom power" defaultChecked style={{ width: "100%", padding: "8px 0" }} />
    </div>
  );
}
