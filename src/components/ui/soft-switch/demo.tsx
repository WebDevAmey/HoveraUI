"use client";

import { SoftSwitch } from "./soft-switch";

export default function Demo() {
  return (
    <div style={{ width: "min(100%, 380px)" }}>
      <SoftSwitch label="Release notes" description="Email me when a new version ships." defaultChecked />
    </div>
  );
}
