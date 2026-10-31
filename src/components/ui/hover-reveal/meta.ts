import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "hover-reveal",
  name: "Hover Reveal",
  description: "An index of rows that lifts a photo out of the page on hover; it trails the pointer on a spring and wipes between rows",
  category: "navigation",
  material: "Editorial",
  exports: ["HoverReveal"],
  props: [
    { name: "items", type: "HoverRevealItem[]", description: "Rows as { id, title, meta?, src, href? }. With href the row is a link." },
    { name: "imageWidth", type: "number", default: "260", description: "Width of the floating photo in px." },
    { name: "ratio", type: "string", default: '"4 / 3"', description: "CSS aspect-ratio of the photo; images are cropped to fit." },
    { name: "stiffness", type: "number", default: "220", description: "Spring stiffness of the follow. Higher is snappier." },
    { name: "damping", type: "number", default: "26", description: "Spring damping. Higher settles with less overshoot." },
    { name: "...props", type: "HTMLAttributes<HTMLUListElement>", description: "Passed to the list root." },
  ],
  usage: `import { HoverReveal } from "@/components/ui/hover-reveal/hover-reveal";

<HoverReveal
  items={[
    { id: "sf90", title: "Ferrari SF90 XX", meta: "Maranello", src: "/cars/ferrari-sf90-xx.webp" },
    { id: "gt3", title: "Porsche 911 GT3 RS", meta: "Stuttgart", src: "/cars/porsche-911-gt3-rs.webp", href: "/gt3" },
  ]}
/>`,
  accessibility: [
    "Rows are a plain list; rows with href are links, the rest take focus so keyboard users get the same preview.",
    "Keyboard focus rests the photo beside the focused row instead of following a pointer.",
    "The photo is decorative and hidden from screen readers; the row text names it.",
    "On touch, tapping a plain row shows its photo above the tap; tapping elsewhere hides it.",
    "With reduced motion the photo jumps to place without tilt, wipe or scale, and only fades.",
  ],
  tall: true,
};

export default meta;
