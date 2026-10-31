"use client";

import { CopyField } from "./copy-field";

export default function Demo() {
  return (
    <div style={{ display: "grid", gap: 20, width: "min(100%, 400px)" }}>
      <CopyField label="Invite link" value="https://atelier.example/join/7f3k-river" />
      <CopyField label="API key" value="sk_live_51Hq8vRfW2xLk0mNa9Tz" secret />
    </div>
  );
}
