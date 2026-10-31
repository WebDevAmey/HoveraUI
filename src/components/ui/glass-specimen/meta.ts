import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "glass-specimen",
  name: "Glass Specimen",
  description: "A frosted pane over a colour field that tilts toward the pointer while a specular band slides across it",
  category: "cards",
  material: "Glass",
  exports: ["GlassSpecimen"],
  props: [
    { name: "field", type: "\"ether\" | \"dusk\" | \"accent\"", default: "\"ether\"", description: "Colour field behind the glass. Dusk uses the sky tokens, accent mixes in --hv-accent." },
    { name: "maxTilt", type: "number", default: "10", description: "Largest tilt in degrees at the card's edge." },
    { name: "children", type: "ReactNode", description: "Content set on the pane." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { GlassSpecimen } from "@/components/ui/glass-specimen/glass-specimen";

<GlassSpecimen field="dusk">
  <h3>Harbour dusk</h3>
  <p>Float glass, etched on one face.</p>
</GlassSpecimen>`,
  accessibility: [
    "The card is a plain container; any controls inside keep their own semantics and tab order.",
    "Keyboard focus inside the card leans the pane gently, so the tilt is not pointer-only.",
    "Touch drags tilt the pane and it settles back on release; vertical scrolling is left to the page.",
    "With reduced motion the pane stays flat and pointer tracking is switched off.",
    "Text sits on a frosted layer in --hv-ink, keeping AA contrast over every field.",
  ],
  variants: [
    { name: "Ether", description: "Lilac, peach and mist." },
    { name: "Dusk", description: "Sky blue into warm haze." },
    { name: "Accent", description: "Ultramarine with mist and lilac." },
  ],
};

export default meta;
