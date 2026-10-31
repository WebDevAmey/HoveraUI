import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "dither-field",
  name: "Dither Field",
  description: "A slow drifting gradient field quantised through an 8×8 Bayer matrix into two tones",
  category: "effects",
  material: "Pixel",
  exports: ["DitherField"],
  props: [
    { name: "ink", type: "string", default: "26% --hv-ink over --hv-canvas", description: "Colour of the lit cells. Any CSS colour, including var() and color-mix()." },
    { name: "paper", type: "string", default: "var(--hv-canvas)", description: "Ground colour behind the cells." },
    { name: "pixelSize", type: "number", default: "3", description: "Size of one dither cell in CSS px. The canvas renders at 1/pixelSize resolution." },
    { name: "speed", type: "number", default: "1", description: "Drift speed multiplier. 0 holds a still frame." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Children render above the field." },
  ],
  usage: `import { DitherField } from "@/components/ui/dither-field/dither-field";

<DitherField style={{ minHeight: 480 }} pixelSize={3}>
  <h1>Small tools, carefully made</h1>
</DitherField>`,
  accessibility: [
    "The canvas is aria-hidden and ignores the pointer; children stay in normal reading and tab order.",
    "With reduced motion it draws a single still frame and never starts an animation loop.",
    "The loop pauses when the field is off-screen or the tab is hidden, and runs at about 20 fps at low resolution.",
    "The default ink is a quarter-strength tint, so text placed over it keeps AA contrast in both themes.",
    "Colours are read from tokens and re-read when a data-theme attribute changes.",
  ],
};

export default meta;
