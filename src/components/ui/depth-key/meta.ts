import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "depth-key",
  name: "Depth Key",
  description: "A keycap with a visible side wall that travels down when pressed",
  category: "buttons",
  material: "Tactile",
  exports: ["DepthKey"],
  props: [
    { name: "variant", type: '"light" | "dark" | "accent"', default: '"light"', description: "Keycap material. Accent uses --hv-accent." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Sets padding, type size and wall depth (4, 6 or 8px)." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button." },
  ],
  usage: `import { DepthKey } from "@/components/ui/depth-key/depth-key";

<DepthKey variant="accent" onClick={publish}>
  Publish
</DepthKey>`,
  accessibility: [
    "Renders a native button, so Enter and Space activate it and it joins the tab order.",
    "Enter and Space also press the cap down visually, matching a pointer press.",
    "The focus ring sits outside the wall so it never hides the depth.",
    "With reduced motion the cap moves instantly instead of easing.",
  ],
  variants: [
    { name: "Light", description: "Off-white cap on a warm grey wall." },
    { name: "Dark", description: "Graphite cap, readable on both themes." },
    { name: "Accent", description: "Ultramarine cap for the one primary action." },
  ],
};

export default meta;
