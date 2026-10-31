"use client";

import { DitherImage } from "./dither-image";

// An invented plate: a banded sun setting into a still sea, with a doorway standing in the water.
const PLATE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2f63"/><stop offset=".45" stop-color="#9b6fa8"/><stop offset=".8" stop-color="#d98473"/><stop offset="1" stop-color="#e9a07e"/></linearGradient>
<linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a483"/><stop offset=".35" stop-color="#7a5f8f"/><stop offset="1" stop-color="#1c1d3d"/></linearGradient>
<radialGradient id="sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff4d6"/><stop offset=".7" stop-color="#ffd08a"/><stop offset="1" stop-color="#ff9a6a"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe2b0" stop-opacity=".35"/><stop offset="1" stop-color="#ffe2b0" stop-opacity="0"/></radialGradient>
<clipPath id="above"><rect width="480" height="228"/></clipPath>
</defs>
<rect width="480" height="228" fill="url(#sky)"/>
<rect y="228" width="480" height="132" fill="url(#sea)"/>
<circle cx="300" cy="196" r="130" fill="url(#glow)"/>
<g clip-path="url(#above)"><circle cx="300" cy="206" r="62" fill="url(#sun)"/>
<g fill="#d98473"><rect x="230" y="198" width="140" height="4"/><rect x="230" y="208" width="140" height="6"/><rect x="230" y="220" width="140" height="8"/></g></g>
<g fill="#ffe0b0" opacity=".75"><rect x="252" y="236" width="96" height="3"/><rect x="262" y="246" width="76" height="3"/><rect x="274" y="258" width="52" height="2"/><rect x="284" y="270" width="32" height="2"/><rect x="292" y="284" width="16" height="2"/></g>
<path d="M88 268 V170 a34 34 0 0 1 68 0 V268 Z M104 268 V174 a18 18 0 0 1 36 0 V268 Z" fill="#1d1a33" fill-rule="evenodd"/>
<path d="M104 268 V174 a18 18 0 0 1 36 0 V268 Z" fill="#ffcf9a"/>
<path d="M88 268 L156 268 L170 300 L74 300 Z" fill="#14132a" opacity=".55"/>
<g fill="#ffffff" opacity=".7"><circle cx="70" cy="46" r="1.4"/><circle cx="132" cy="28" r="1"/><circle cx="410" cy="52" r="1.2"/><circle cx="360" cy="24" r="1"/><circle cx="440" cy="96" r=".9"/></g>
</svg>`);

export default function Demo() {
  return (
    <DitherImage
      src={PLATE}
      alt="A banded sun setting into a still sea, with a lone doorway standing in the shallows"
      caption="Plate 04 — Low tide"
      style={{ width: "min(100%, 320px)" }}
    />
  );
}
