import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "pixel-wipe",
  name: "Pixel Wipe",
  description: "A transition wrapper that covers content in stepped pixel blocks along a dithered diagonal, swaps it, then clears",
  category: "effects",
  material: "Pixel",
  exports: ["PixelWipe"],
  props: [
    { name: "trigger", type: "string | number", description: "Change it to run a wipe. Children passed with the new value appear once the blocks cover the old content." },
    { name: "cell", type: "number", default: "28", description: "Block size in CSS px." },
    { name: "duration", type: "number", default: "360", description: "Length of each half, cover and reveal, in ms." },
    { name: "color", type: "string", default: "var(--hv-ink)", description: "Block colour, any CSS colour." },
    { name: "children", type: "ReactNode", description: "The current content." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Give it a size; blocks fill it." },
  ],
  usage: `import { PixelWipe } from "@/components/ui/pixel-wipe/pixel-wipe";

<PixelWipe trigger={step} style={{ height: 320 }}>
  <Step index={step} />
</PixelWipe>`,
  accessibility: [
    "Blocks are aria-hidden and ignore the pointer; they are only in the DOM while a wipe runs.",
    "The outgoing content is inert while it is being covered, so focus cannot land on it.",
    "Content swaps once, so an aria-live region inside announces the new content a single time.",
    "With reduced motion the content swaps instantly and no blocks are drawn.",
  ],
};

export default meta;
