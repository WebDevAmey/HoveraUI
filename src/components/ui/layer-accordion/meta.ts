import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "layer-accordion",
  name: "Layer Accordion",
  description: "Cards stacked like index cards; opening one slides an inner sheet out from under its header",
  category: "accordions",
  material: "Paper",
  exports: ["LayerAccordion"],
  props: [
    { name: "items", type: "{ id: string; title: ReactNode; summary?: ReactNode; content: ReactNode }[]", description: "Cards in order. summary shows under the title while closed." },
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Single keeps at most one card open." },
    { name: "defaultValue", type: "string[]", default: "[]", description: "Cards open on first render (uncontrolled)." },
    { name: "value", type: "string[]", description: "Open cards, for controlled use." },
    { name: "onValueChange", type: "(value: string[]) => void", description: "Called with the open cards after each toggle." },
    { name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Heading element that wraps each card's button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { LayerAccordion } from "@/components/ui/layer-accordion/layer-accordion";

<LayerAccordion
  defaultValue={["plan"]}
  items={[
    { id: "plan", title: "Plan", summary: "Scope, owners and a date", content: <p>…</p> },
    { id: "build", title: "Build", summary: "Small steps behind a flag", content: <p>…</p> },
  ]}
/>`,
  accessibility: [
    "Each card header is a native button inside a heading, with aria-expanded and aria-controls.",
    "Panels are regions labelled by their header; closed panels are inert, so Tab and screen readers skip them.",
    "Receding cards keep AA contrast; only their surface and title weight of colour change.",
    "With reduced motion cards open instantly and the sheet only fades.",
  ],
};

export default meta;
