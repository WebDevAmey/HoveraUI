import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "corner-fold",
  name: "Corner Fold",
  description: "A paper card whose corner peels back with a curl shadow to show a note on the sheet beneath",
  category: "cards",
  material: "Paper",
  exports: ["CornerFold"],
  props: [
    { name: "note", type: "ReactNode", description: "What is written on the sheet under the corner." },
    { name: "open", type: "boolean", description: "Controlled open state." },
    { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the corner is lifted or laid back." },
    { name: "peek", type: "number", default: "140", description: "Leg length of the fold when open, in px." },
    { name: "revealLabel", type: "string", default: "\"Lift the corner\"", description: "Accessible name of the corner button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { CornerFold } from "@/components/ui/corner-fold/corner-fold";

<CornerFold note="Keep from sun." revealLabel="Read the care note">
  <h3>Maidenhair fern</h3>
</CornerFold>`,
  accessibility: [
    "The corner is a native button with aria-expanded and aria-controls pointing at the note.",
    "Focusing the corner with the keyboard lifts it slightly, like hover; Enter or Space opens it.",
    "The hidden note is aria-hidden until the corner is open.",
    "The touch target is at least 48px even when the fold is small.",
    "With reduced motion the fold changes instantly.",
  ],
};

export default meta;
