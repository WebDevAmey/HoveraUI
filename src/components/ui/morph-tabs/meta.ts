import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "morph-tabs",
  name: "Morph Tabs",
  description: "Chapter tabs with italic roman numerals and an ink rule whose leading edge runs ahead of its tail",
  category: "navigation",
  material: "Editorial",
  exports: ["MorphTabs"],
  props: [
    { name: "tabs", type: "{ id: string; label: string; content: ReactNode }[]", description: "Chapters in order. Numerals are generated from the position." },
    { name: "value", type: "string", description: "Selected tab id, for controlled use." },
    { name: "defaultValue", type: "string", default: "first tab", description: "Selected tab id on first render." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called when a different tab is selected." },
    { name: "label", type: "string", default: '"Chapters"', description: "Accessible name for the tab list." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { MorphTabs } from "@/components/ui/morph-tabs/morph-tabs";

<MorphTabs
  label="Guide"
  tabs={[
    { id: "setup", label: "Setup", content: <Setup /> },
    { id: "usage", label: "Usage", content: <Usage /> },
    { id: "notes", label: "Notes", content: <Notes /> },
  ]}
/>`,
  accessibility: [
    "Follows the tabs pattern: a tablist of tab buttons with aria-selected and aria-controls, and tabpanels labelled by their tab.",
    "Roving tabindex: Tab enters the selected tab, Left and Right move and select, Home and End jump to the first and last.",
    "Numerals are decorative and hidden from screen readers, which hear only the label.",
    "On narrow screens the tab row scrolls sideways and keeps the selected tab in view.",
    "With reduced motion the rule jumps to its new tab and panels only fade.",
  ],
};

export default meta;
