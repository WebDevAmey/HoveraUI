import type { DocNavGroup } from "@/types/docs";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { backgrounds } from "@/data/background";
import { cards } from "@/data/card";
import { tabs } from "@/data/tab";
import { marquees } from "@/data/marquee";

const NEW_SLUGS = new Set([
  "spotlight-card",
  "animated-tabs",
  "marquee",
  "floating-navbar",
  "skeleton-loader",
]);

function toNavItem(slug: string, name: string) {
  return { slug, name: name.trim(), isNew: NEW_SLUGS.has(slug) };
}

const buttonItems = buttons.map((b) => toNavItem(b.slug, b.name));
const loaderItems = loaders.map((l) => toNavItem(l.slug, l.name));
const navbarItems = navbars.map((n) => toNavItem(n.slug, n.name));
const cardItems = cards.map((c) => toNavItem(c.slug, c.name));
const tabItems = tabs.map((t) => toNavItem(t.slug, t.name));
const marqueeItems = marquees.map((m) => toNavItem(m.slug, m.name));
const gradientItems = backgrounds.filter((b) => b.category === "gradient").map((b) => toNavItem(b.slug, b.name));
const patternItems = backgrounds.filter((b) => b.category === "pattern").map((b) => toNavItem(b.slug, b.name));

export const docsNav: DocNavGroup[] = [
  {
    label: "Buttons",
    icon: "buttons",
    items: buttonItems,
  },
  {
    label: "Loaders",
    icon: "motion",
    items: loaderItems,
  },
  {
    label: "Navbars",
    icon: "interactive",
    items: navbarItems,
  },
  {
    label: "Cards",
    icon: "interactive",
    items: cardItems,
  },
  {
    label: "Tabs",
    icon: "interactive",
    items: tabItems,
  },
  {
    label: "Marquee",
    icon: "motion",
    items: marqueeItems,
  },
  {
    label: "Gradients",
    icon: "motion",
    items: gradientItems,
  },
  {
    label: "Patterns",
    icon: "interactive",
    items: patternItems,
  },
];
