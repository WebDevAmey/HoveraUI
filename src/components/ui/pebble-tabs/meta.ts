import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "pebble-tabs",
  name: "Pebble Tabs",
  description: "Segmented tabs in a soft inset well; the raised pill rides a spring and inks each label by how much of it covers",
  category: "navigation",
  material: "Tactile",
  exports: ["PebbleTabs"],
  props: [
    { name: "tabs", type: "{ value: string; label: ReactNode; content?: ReactNode }[]", description: "The tabs, in order. When a tab has content, a panel renders under the row." },
    { name: "label", type: "string", description: "Accessible name for the tab list." },
    { name: "value", type: "string", description: "Controlled active tab." },
    { name: "defaultValue", type: "string", default: "first tab", description: "Initial tab when uncontrolled." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called with the tab's value on every change." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "32px or 40px tabs." },
    { name: "stiffness", type: "number", default: "420", description: "Spring stiffness of the pill. Higher is snappier." },
    { name: "damping", type: "number", default: "34", description: "Spring damping. Higher settles with less overshoot." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { PebbleTabs } from "@/components/ui/pebble-tabs/pebble-tabs";

<PebbleTabs
  label="File type"
  value={type}
  onValueChange={setType}
  tabs={[
    { value: "all", label: "All" },
    { value: "photos", label: "Photos" },
    { value: "videos", label: "Videos" },
    { value: "documents", label: "Documents" },
  ]}
/>`,
  accessibility: [
    "Follows the tabs pattern: a labelled tablist of buttons with aria-selected, and a tabpanel labelled by its tab when tabs carry content.",
    "Roving tabindex: Tab enters on the selected tab, Left and Right move and wrap, Home and End jump. Selection follows focus.",
    "The pill is decorative and hidden from screen readers; the selected label is always fully inked, well above AA contrast.",
    "Tabs are measured with ResizeObserver, so the pill stays aligned through font loading and resizes. On narrow screens the row scrolls and keeps the focused tab in view.",
    "The spring keeps its velocity when you change tabs mid-glide, so quick clicks bend the path instead of restarting it.",
    "With reduced motion the pill and label colours jump to the new tab, and panels only fade.",
  ],
};

export default meta;
