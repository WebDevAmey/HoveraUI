import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "gloss-button",
  name: "Gloss Button",
  description: "A glazed button with a lit top edge, a deeper rim and a soft shadow that sinks when pressed",
  category: "buttons",
  material: "Tactile",
  exports: ["GlossButton"],
  props: [
    { name: "tone", type: '"blue" | "ink" | "neutral"', default: '"blue"', description: "Glaze colour. Neutral follows the theme tokens." },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "32px, 40px or 48px tall." },
    { name: "shape", type: '"rounded" | "pill"', default: '"rounded"', description: "Rounded rectangle or full pill." },
    { name: "icon", type: "ReactNode", description: "Optional leading icon, hidden from assistive tech." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button." },
  ],
  usage: `import { GlossButton } from "@/components/ui/gloss-button/gloss-button";

<GlossButton onClick={browse}>
  Browse Components
</GlossButton>`,
  accessibility: [
    "Renders a native button, so Enter and Space activate it and it joins the tab order.",
    "Enter and Space also sink the glaze visually, matching a pointer press.",
    "A 2px focus ring in the button's own colour sits just outside the rim.",
    "With reduced motion the button changes shade only and never moves.",
  ],
  variants: [
    { name: "Blue", description: "Bright blue glaze for the main call to action." },
    { name: "Neutral", description: "Raised white glaze for secondary actions, themed with the page." },
    { name: "Ink", description: "Graphite glaze, readable on both themes." },
  ],
};

export default meta;
