import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "halftone-trail",
  name: "Halftone Trail",
  description: "The pointer prints a fading trail of dots on an angled halftone screen, sized by how fresh the ink is",
  category: "effects",
  material: "Print",
  exports: ["HalftoneTrail"],
  props: [
    { name: "color", type: "string", default: "var(--hv-ink)", description: "Dot colour, any CSS colour including var()." },
    { name: "cell", type: "number", default: "10", description: "Distance between dot centres in CSS px." },
    { name: "angle", type: "number", default: "15", description: "Screen angle in degrees." },
    { name: "radius", type: "number", default: "44", description: "Brush radius in CSS px." },
    { name: "fade", type: "number", default: "1100", description: "Roughly how long a dot takes to disappear, in ms." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Children render above the dots." },
  ],
  usage: `import { HalftoneTrail } from "@/components/ui/halftone-trail/halftone-trail";

<HalftoneTrail color="var(--hv-oxblood)" style={{ minHeight: 360 }}>
  <h2>Proofs, pulled by hand</h2>
</HalftoneTrail>`,
  accessibility: [
    "The canvas is aria-hidden and ignores the pointer; children keep their normal semantics and focus order.",
    "The effect is decorative and needs no keyboard equivalent; nothing is hidden behind it.",
    "Touch drags print too, and vertical swipes still scroll the page.",
    "The animation loop only runs while dots are fading, and stops when the tab is hidden.",
    "With reduced motion there is no fading: a single still patch sits where the pointer last was.",
  ],
};

export default meta;
