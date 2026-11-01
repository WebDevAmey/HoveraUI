import { registry } from "@/registry";
import { categories } from "@/registry/types";

export const github = "https://github.com/WebDevAmey/HoveraUI";

export const mainNav = [
  { href: "/components", label: "Components" },
  { href: "/docs/introduction", label: "Docs" },
  { href: "/docs/changelog", label: "Changelog" },
];

export type SidebarItem = { href: string; label: string; badge?: string };
export type SidebarGroup = { title: string; items: SidebarItem[] };

/** Components shipped in the latest release; the sidebar marks them "New". */
const fresh = new Set(["morph-button", "glide-tabs", "soft-switch", "quiet-tooltip", "rolling-number", "copy-field", "hover-reveal", "pebble-tabs"]);

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
