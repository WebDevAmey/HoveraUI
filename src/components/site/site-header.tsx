import { registry } from "@/registry";
import { categories } from "@/registry/types";
import { MorphNav, type NavGuide } from "./morph-nav";
import { github, searchGroups } from "./nav";
import { SiteSearch } from "./site-search";
import styles from "./site-header.module.css";

const glyph = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
  "aria-hidden": true,
};

const guides: NavGuide[] = [
  {
    href: "/docs/introduction",
    label: "Introduction",
    hint: "What this is",
    color: "#8fb3ff",
    icon: (
      <svg {...glyph}>
        <path d="M8 4.2C6.6 3.2 4.6 3 2.5 3.3v8.9c2.1-.3 4.1-.1 5.5.9 1.4-1 3.4-1.2 5.5-.9V3.3C11.4 3 9.4 3.2 8 4.2Z" />
      </svg>
    ),
  },
  {
    href: "/docs/installation",
    label: "Installation",
    hint: "CLI or copy",
    color: "#6ec58a",
    icon: (
      <svg {...glyph}>
        <path d="M3 2.5h10v11H3z" />
        <path d="M8 5v5M5.8 8 8 10.2 10.2 8" fill="none" />
      </svg>
    ),
  },
  {
    href: "/docs/tokens",
    label: "Tokens",
    hint: "Colour, type, motion",
    color: "#f0b35a",
    icon: (
      <svg {...glyph}>
        <circle cx="8" cy="8" r="5.5" />
      </svg>
    ),
  },
  {
    href: "/docs/changelog",
    label: "Changelog",
    hint: "What changed",
    color: "#e58aa6",
    icon: (
      <svg {...glyph}>
        <path d="M8 2.5 13.5 8 8 13.5 2.5 8Z" />
      </svg>
    ),
  },
];

/** The floating site navigation. Data is gathered here on the server; the morphing shell is a client island. */
export function SiteHeader() {
  const cats = categories
    .map((c) => ({ id: c.id, label: c.label, count: registry.filter((e) => e.meta.category === c.id).length }))
    .filter((c) => c.count > 0);
  return (
    <header className={styles.header}>
      <MorphNav categories={cats} guides={guides} github={github} search={<SiteSearch groups={searchGroups()} className={styles.iconButton} />} />
    </header>
  );
}
