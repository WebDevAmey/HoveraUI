import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "detent-toggle",
  name: "Detent Toggle",
  description: "A recessed switch whose knob climbs a detent ridge in the middle of the groove and settles with a small overshoot",
  category: "buttons",
  material: "Neumorphism",
  exports: ["DetentToggle"],
  props: [
    { name: "checked", type: "boolean", description: "Controlled state. Leave undefined for an uncontrolled switch." },
    { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called with the next state on every toggle." },
    { name: "label", type: "ReactNode", description: "Visible label beside the switch; it is inside the button, so it also names it. Without it, pass aria-label." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button that carries role=\"switch\"." },
  ],
  usage: `import { DetentToggle } from "@/components/ui/detent-toggle/detent-toggle";

<DetentToggle label="Phantom power" checked={phantom} onCheckedChange={setPhantom} />`,
  accessibility: [
    "A native button with role=\"switch\" and aria-checked, so Space and Enter toggle it and screen readers announce on or off.",
    "The label sits inside the button, so clicking the text toggles too and the whole row is one touch target at least 44px tall.",
    "On and off are shown by knob position, groove tint and the engraved O and I marks, not by colour alone.",
    "With reduced motion the knob moves instantly and the ridge climb is skipped.",
  ],
};

export default meta;
