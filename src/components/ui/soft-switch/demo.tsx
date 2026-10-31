"use client";

import { SoftSwitch } from "./soft-switch";

const divider = { borderTop: "1px solid var(--hv-line)" } as const;

export default function Demo() {
  return (
    <div style={{ width: "min(100%, 380px)" }}>
      <SoftSwitch label="Release notes" description="Email me when a new version ships." defaultChecked />
      <SoftSwitch style={divider} label="Weekly digest" description="One summary every Monday morning." />
      <SoftSwitch style={divider} label="Usage reports" description="Available on the team plan." disabled />
    </div>
  );
}
