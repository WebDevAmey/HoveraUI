import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "split-label",
  name: "Split Label",
  description: "A sans label that splits along a hairline and parts to reveal a second verb in italic serif",
  category: "buttons",
  material: "Editorial",
  exports: ["SplitLabel"],
  props: [
    { name: "label", type: "string", description: "Resting label in sans. Also the button's accessible name." },
    { name: "reveal", type: "string", description: "The verb revealed between the halves, set in Instrument Serif italic. Decorative." },
    { name: "variant", type: '"outline" | "solid"', default: '"outline"', description: "Hairline outline or a solid ink fill." },
    { name: "shape", type: '"pill" | "square"', default: '"pill"', description: "Fully rounded or a near-square editorial edge." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button. children is not accepted; use label and reveal." },
  ],
  usage: `import { SplitLabel } from "@/components/ui/split-label/split-label";

<SplitLabel label="Read essay" reveal="begin" onClick={open} />`,
  accessibility: [
    "Renders a native button whose accessible name is the label; the visual halves and the revealed verb are aria-hidden.",
    "Keyboard focus opens the split exactly like hover, and a press opens it on touch.",
    "All layers share one grid cell, so the button keeps its width while the words swap.",
    "With reduced motion the halves and the verb crossfade in place without moving.",
  ],
  variants: [
    { name: "Solid pill", description: "Ink fill for the primary action." },
    { name: "Outline square", description: "Hairline border with a near-square edge for secondary actions." },
  ],
};

export default meta;
