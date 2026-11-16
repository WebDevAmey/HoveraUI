import { registry } from "@/registry";
import { categories } from "@/registry/types";

export const github = "https://github.com/WebDevAmey/HoveraUI";

export type SidebarItem = { href: string; label: string; badge?: string };
export type SidebarGroup = { title: string; items: SidebarItem[] };

/** Components shipped in the latest release; the sidebar marks them "New". */
const fresh = new Set([
  "line-accordion",
  "shelf-accordion",
  "layer-accordion",
  "cascade-accordion",
  "pebble-tabs",
  "hover-reveal",
]);

export const docsNav: SidebarGroup[] = [
  {
    title: "Get started",
    items: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/tokens", label: "Tokens" },
      { href: "/docs/faq", label: "FAQ" },
      { href: "/docs/changelog", label: "Changelog" },
    ],
  },
];

export function sidebarGroups(): SidebarGroup[] {
  return [
    ...docsNav,
    ...categories.map((category) => ({
      title: category.label,
      items: registry
        .filter((entry) => entry.meta.category === category.id)
        .map((entry) => ({
          href: `/components/${entry.meta.slug}`,
          label: entry.meta.name,
          badge: fresh.has(entry.meta.slug) ? "New" : undefined,
        })),
    })),
  ];
}

/** Everything the header search can jump to: guides first, then components by category. */
export function searchGroups() {
  return [
    { label: "Guides", items: docsNav[0].items },
    ...categories.map((category) => ({
      label: category.label,
      items: registry
        .filter((entry) => entry.meta.category === category.id)
        .map((entry) => ({ href: `/components/${entry.meta.slug}`, label: entry.meta.name, hint: entry.meta.material })),
    })),
  ];
}
