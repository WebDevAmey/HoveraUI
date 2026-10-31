import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "gilded-frame",
  name: "Gilded Frame",
  description: "A card inside a double gilt hairline whose foil highlight follows the light across the frame",
  category: "cards",
  material: "Luxury",
  exports: ["GildedFrame"],
  props: [
    { name: "eyebrow", type: "ReactNode", description: "Small caps line above the numeral." },
    { name: "numeral", type: "ReactNode", description: "Large serif numeral set in gilt." },
    { name: "title", type: "ReactNode", description: "Italic serif heading (h3)." },
    { name: "footer", type: "ReactNode", description: "Small caps line below a short gilt rule." },
    { name: "children", type: "ReactNode", description: "Body text." },
    { name: "...props", type: "HTMLAttributes<HTMLElement>", description: "Passed to the article root." },
  ],
  usage: `import { GildedFrame } from "@/components/ui/gilded-frame/gilded-frame";

<GildedFrame eyebrow="Salon" numeral="XII" title="An evening of quiet objects" footer="14 · 11 · 2026">
  Twelve pieces, one long table.
</GildedFrame>`,
  accessibility: [
    "Renders an article with a real heading; the frame rules are decorative and aria-hidden.",
    "Focusing a link or button inside sends one slow sheen along the frame, the keyboard version of the pointer highlight.",
    "A tap moves the highlight to the touch point.",
    "With reduced motion the highlight jumps instead of travelling and the focus sheen is a still highlight.",
    "Gilt text is darkened in light theme so labels keep AA contrast on the paper.",
  ],
};

export default meta;
