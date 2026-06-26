import type { DocNavGroup } from "@/types/docs";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { backgrounds } from "@/data/background";

function toNavItem(slug: string, name: string) {
  return { slug, name: name.trim(), isNew: slug === "spinner-loader" };
}

const buttonItems = buttons.map((b) => toNavItem(b.slug, b.name));
const loaderItems = loaders.map((l) => toNavItem(l.slug, l.name));
const navbarItems = navbars.map((n) => toNavItem(n.slug, n.name));
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
