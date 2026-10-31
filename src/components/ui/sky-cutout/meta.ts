import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "sky-cutout",
  name: "Sky Cutout",
  description: "An ordinary card with a shape cut through it, opening onto a drifting daytime sky that moves against the pointer",
  category: "cards",
  material: "Surreal",
  exports: ["SkyCutout"],
  props: [
    { name: "shape", type: "\"arch\" | \"window\" | \"circle\" | \"keyhole\" | \"bird\"", default: "\"arch\"", description: "Silhouette cut through the card." },
    { name: "holeHeight", type: "number", default: "136", description: "Height of the opening in px; width follows the shape." },
    { name: "children", type: "ReactNode", description: "Card content below the opening." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { SkyCutout } from "@/components/ui/sky-cutout/sky-cutout";

<SkyCutout shape="keyhole">
  <h3>Room 04</h3>
  <p>On the other side it is always noon.</p>
</SkyCutout>`,
  accessibility: [
    "The opening and its sky are decorative and aria-hidden; only the card content is read.",
    "Keyboard focus inside the card shifts the view slightly, matching the pointer parallax.",
    "Touch drags move the parallax while vertical scrolling stays with the page.",
    "Clouds pause when the card is off-screen.",
    "With reduced motion the clouds hold still and the parallax is off.",
  ],
  variants: [
    { name: "Arch", description: "A doorway with a flat sill." },
    { name: "Circle", description: "A porthole." },
    { name: "Keyhole", description: "A small, private view." },
    { name: "Bird", description: "A gliding silhouette." },
    { name: "Window", description: "Four panes." },
  ],
};

export default meta;
