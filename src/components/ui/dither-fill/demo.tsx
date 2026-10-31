"use client";

import { DitherFill } from "./dither-fill";

function Arrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 5 5" shapeRendering="crispEdges" aria-hidden="true" fill="currentColor">
      <path d="M0 2h3v1H0zM2 0h1v1H2zM3 1h1v1H3zM4 2h1v1H4zM3 3h1v1H3zM2 4h1v1H2z" />
    </svg>
  );
}

export default function Demo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "center" }}>
      <DitherFill>Load cartridge</DitherFill>
      <DitherFill variant="accent">
        Continue <Arrow />
      </DitherFill>
    </div>
  );
}
