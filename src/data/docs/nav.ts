import type { DocNavGroup } from "@/types/docs";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { backgrounds } from "@/data/background";
import { cards } from "@/data/card";
import { tabs } from "@/data/tab";
import { textEffects } from "@/data/text";
import { sections } from "@/data/section";
import { commands } from "@/data/command";

const NEW_SLUGS = new Set([
  "displacement-text",
  "liquid-text",
  "light-lines",
  "pixel-trail",
]);

function toNavItem(slug: string, name: string) {
  return { slug, name: name.trim(), isNew: NEW_SLUGS.has(slug) };
}

const buttonItems = buttons.map((b) => toNavItem(b.slug, b.name));
const loaderItems = loaders.map((l) => toNavItem(l.slug, l.name));
const navbarItems = navbars.map((n) => toNavItem(n.slug, n.name));
const cardItems = cards.map((c) => toNavItem(c.slug, c.name));
const tabItems = tabs.map((t) => toNavItem(t.slug, t.name));
const textItems = textEffects.map((t) => toNavItem(t.slug, t.name));
const sectionItems = sections.map((sec) => toNavItem(sec.slug, sec.name));
const commandItems = commands.map((c) => toNavItem(c.slug, c.name));
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
    label: "Text",
    icon: "motion",
    items: textItems,
  },
  {
    label: "Sections",
    icon: "interactive",
    items: sectionItems,
  },
  {
    label: "Command",
    icon: "interactive",
    items: commandItems,
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
