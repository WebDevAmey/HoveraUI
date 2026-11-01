"use client";

import { CopyField } from "./copy-field";

export default function Demo() {
  return (
    <div style={{ width: "min(100%, 400px)" }}>
      <CopyField label="Invite link" value="https://atelier.example/join/7f3k-river" />
    </div>
  );
}
