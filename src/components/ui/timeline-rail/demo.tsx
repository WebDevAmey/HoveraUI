"use client";

import { TimelineRail } from "./timeline-rail";

const releases = [
  {
    date: "Oct 2026",
    title: "Orbit Gallery and the quiet hero",
    body: "A slow ring of previews that pauses the moment you reach for it.",
    tags: ["New", "Navigation"],
  },
  {
    date: "Sep 2026",
    title: "Tokens settle into one file",
    body: "Every colour, radius and easing now reads from a single sheet.",
    tags: ["Tokens"],
  },
  {
    date: "Aug 2026",
    title: "First twelve components",
    body: "Keycaps, paper and pixels, each copied by hand into real projects first.",
    tags: ["Release"],
  },
];

export default function Demo() {
  return <TimelineRail items={releases} style={{ maxWidth: 520 }} />;
}
