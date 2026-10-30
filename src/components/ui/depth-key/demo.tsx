"use client";

import { DepthKey } from "./depth-key";

export default function Demo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
      <DepthKey>Save draft</DepthKey>
      <DepthKey variant="dark">⌘ K</DepthKey>
      <DepthKey variant="accent">Publish</DepthKey>
    </div>
  );
}
