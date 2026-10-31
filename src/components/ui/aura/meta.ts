import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "aura",
  name: "Aura",
  description: "A soft halo of layered conic and radial light that breathes at a resting rate",
  category: "effects",
  material: "Ethereal",
  exports: ["Aura"],
  props: [
    { name: "size", type: "number", default: "240", description: "Diameter in px. Shrinks to fit a narrower container." },
    { name: "intensity", type: "number", default: "0.8", description: "Overall strength of the glow, 0 to 1." },
    { name: "palette", type: "\"ether\" | \"dusk\" | \"accent\"", default: "\"ether\"", description: "Ether is lilac, peach and mist; dusk uses the sky tokens; accent leans on --hv-accent." },
    { name: "paused", type: "boolean", default: "false", description: "Hold the halo still." },
    { name: "children", type: "ReactNode", description: "Optional content centred in the halo." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { Aura } from "@/components/ui/aura/aura";

<Aura palette="dusk" size={200}>
  <em>rest</em>
</Aura>`,
  accessibility: [
    "Every light layer is aria-hidden; only children are exposed.",
    "The breath is slow (10s, four in, six out) and low in contrast, well below flashing thresholds.",
    "With reduced motion the halo is drawn once, still.",
    "paused stops every layer, for pages that offer their own motion toggle.",
    "Centred text sits over a pale core, keeping --hv-ink readable in both themes.",
  ],
  variants: [
    { name: "Ether", description: "Lilac, peach and mist." },
    { name: "Dusk", description: "Sky blue and warm haze." },
    { name: "Accent", description: "Ultramarine with mist." },
  ],
};

export default meta;
