import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "glide-tabs",
  name: "Glide Tabs",
  description: "Pill tabs whose active fill and text colour move as one, by sliding a clip over an inked copy of the row",
  category: "essentials",
  material: "Essential",
  exports: ["GlideTabs"],
  props: [
    { name: "tabs", type: "{ value: string; label: ReactNode; content?: ReactNode }[]", description: "The tabs. When a tab has content, a panel renders under the row." },
    { name: "label", type: "string", description: "Accessible name for the tab list." },
    { name: "value", type: "string", description: "Controlled active tab." },
    { name: "defaultValue", type: "string", default: "first tab", description: "Initial tab when uncontrolled." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called with the tab's value on every change." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { GlideTabs } from "@/components/ui/glide-tabs/glide-tabs";

<GlideTabs
  label="Billing period"
  value={period}
  onValueChange={setPeriod}
  tabs={[
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ]}
/>`,
  accessibility: [
    "Follows the tabs pattern: a tablist of buttons with aria-selected, a labelled tabpanel and roving tabindex.",
    "Left and Right move and wrap, Home and End jump. Selection follows focus.",
    "The inked copy is aria-hidden, so each label is read once.",
    "With reduced motion the clip jumps instead of gliding and the panel fades without rising.",
  ],
};

export default meta;
