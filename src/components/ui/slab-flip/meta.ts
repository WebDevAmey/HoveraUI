import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "slab-flip",
  name: "Slab Flip",
  description: "A flip card with real thickness whose darker edge comes into view mid-turn",
  category: "cards",
  material: "Physical",
  exports: ["SlabFlip"],
  props: [
    { name: "front", type: "ReactNode", description: "Content of the front face." },
    { name: "back", type: "ReactNode", description: "Content of the back face." },
    { name: "thickness", type: "number", default: "12", description: "Slab thickness in px." },
    { name: "axis", type: "\"y\" | \"x\"", default: "\"y\"", description: "y turns left to right, x tumbles top over bottom." },
    { name: "edge", type: "string", description: "CSS background for the edge faces. Defaults to stacked paper plies." },
    { name: "flipped", type: "boolean", description: "Controlled state." },
    { name: "defaultFlipped", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    { name: "onFlippedChange", type: "(flipped: boolean) => void", description: "Called when the slab is turned." },
    { name: "flipOnHover", type: "boolean", default: "false", description: "Show the back while a mouse hovers. A click still pins it." },
    { name: "label", type: "string", default: "\"Turn over\"", description: "Accessible name of the flip button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div. Size it with className or style." },
  ],
  usage: `import { SlabFlip } from "@/components/ui/slab-flip/slab-flip";

<SlabFlip
  style={{ width: 160 }}
  thickness={14}
  label="Turn the sample over"
  front={<SampleFront />}
  back={<SampleSpecs />}
/>`,
  accessibility: [
    "A native toggle button covers the slab, so Tab reaches it and Enter or Space turns it; aria-pressed reports the side.",
    "The face turned away is aria-hidden, so a screen reader reads only the visible side.",
    "Faces should hold text, not controls: the button covers them.",
    "Touch taps turn the slab; hover flipping only applies to devices that can hover.",
    "With reduced motion the faces cross-fade in place without rotating.",
  ],
};

export default meta;
