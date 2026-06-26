import type { DocNavGroup } from "@/types/docs";

export const docsNav: DocNavGroup[] = [
  {
    label: "Buttons",
    icon: "buttons",
    items: [
      { slug: "glow-button", name: "Glow Button" },
      { slug: "border-reveal", name: "Border Reveal" },
      { slug: "ripple-button", name: "Ripple Button" },
      { slug: "swipe-button", name: "Swipe Button" },
    ],
  },
  {
    label: "Text & Motion",
    icon: "motion",
    items: [
      { slug: "spinner-loader", name: "Spinner Loader", isNew: true },
      { slug: "bouncing-dots-loader", name: "Bouncing Dots Loader" },
      { slug: "mercury-loader", name: "Mercury Loader" },
    ],
  },
  {
    label: "Interactive",
    icon: "interactive",
    items: [
      { slug: "aether-navbar", name: "Aether Navbar" },
      { slug: "vertex-navbar", name: "Vertex Navbar" },
      { slug: "radical-navbar", name: "Radical Navbar" },
    ],
  },
];
