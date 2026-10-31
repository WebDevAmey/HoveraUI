import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "soft-switch",
  name: "Soft Switch",
  description: "A settings row whose switch thumb stretches toward its destination while pressed, then slides across on release",
  category: "essentials",
  material: "Essential",
  exports: ["SoftSwitch"],
  props: [
    { name: "label", type: "ReactNode", description: "Visible label. It is a real label element, so clicking it toggles the switch." },
    { name: "description", type: "ReactNode", description: "One line under the label, announced as the switch's description." },
    { name: "checked", type: "boolean", description: "Controlled state." },
    { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called with the next state." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the button with role=\"switch\"; className and style go to the row." },
  ],
  usage: `import { SoftSwitch } from "@/components/ui/soft-switch/soft-switch";

<SoftSwitch
  label="Release notes"
  description="Email me when a new version ships."
  checked={notes}
  onCheckedChange={setNotes}
/>`,
  accessibility: [
    "A native button with role=\"switch\" and aria-checked; Space and Enter toggle it.",
    "The label is linked with htmlFor and the description with aria-describedby.",
    "The hit area extends to 44px tall around the 24px track.",
    "On and off differ by thumb position and track fill, not by hue alone. Reduced motion moves the thumb instantly.",
  ],
};

export default meta;
