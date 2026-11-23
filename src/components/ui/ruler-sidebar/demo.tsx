"use client";

import { RulerSidebar, type RulerSidebarItem } from "./ruler-sidebar";
import styles from "./demo.module.css";

const items: RulerSidebarItem[] = [
  { href: "#aperture", label: "Aperture" },
  { href: "#bellows", label: "Bellows", isNew: true },
  { href: "#cable-release", label: "Cable Release" },
  { href: "#contact-sheet", label: "Contact Sheet" },
  { href: "#darkslide", label: "Darkslide" },
  { href: "#depth-of-field", label: "Depth of Field" },
  { href: "#enlarger", label: "Enlarger" },
  { href: "#film-back", label: "Film Back", isNew: true },
  { href: "#focus-loupe", label: "Focus Loupe" },
  { href: "#ground-glass", label: "Ground Glass" },
  { href: "#hyperfocal", label: "Hyperfocal" },
  { href: "#light-meter", label: "Light Meter" },
  { href: "#negative-sleeve", label: "Negative Sleeve" },
  { href: "#rangefinder", label: "Rangefinder" },
  { href: "#reciprocity", label: "Reciprocity" },
  { href: "#safelight", label: "Safelight", isNew: true },
  { href: "#shutter", label: "Shutter" },
  { href: "#split-grade", label: "Split Grade" },
  { href: "#stop-bath", label: "Stop Bath" },
  { href: "#tripod", label: "Tripod" },
  { href: "#viewfinder", label: "Viewfinder" },
  { href: "#zone-system", label: "Zone System" },
];

export default function Demo() {
  return (
    <RulerSidebar
      items={items}
      defaultActiveHref="#film-back"
      // The demo stays on this page: rows switch in place instead of jumping to an anchor.
      onNavigate={(_, event) => event.preventDefault()}
      title="Glossary"
      className={styles.sidebar}
    />
  );
}
