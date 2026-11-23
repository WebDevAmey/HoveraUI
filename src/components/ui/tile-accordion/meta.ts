import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "tile-accordion",
  name: "Tile Accordion",
  description: "Questions on separate soft tiles; opening one swings its plus round into a cross as the answer grows in and fades up",
  category: "accordions",
  material: "Essential",
  exports: ["TileAccordion"],
  props: [
    { name: "items", type: "{ id: string; title: ReactNode; content: ReactNode }[]", description: "Tiles in order." },
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Single keeps at most one tile open." },
    { name: "defaultValue", type: "string[]", default: "[]", description: "Tiles open on first render (uncontrolled)." },
    { name: "value", type: "string[]", description: "Open tiles, for controlled use." },
    { name: "onValueChange", type: "(value: string[]) => void", description: "Called with the open tiles after each toggle." },
    { name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Heading element that wraps each tile's button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { TileAccordion } from "@/components/ui/tile-accordion/tile-accordion";

<TileAccordion
  defaultValue={["free"]}
  items={[
    { id: "free", title: "Is it free for commercial projects?", content: <p>…</p> },
    { id: "add", title: "How do I add a component?", content: <p>…</p> },
  ]}
/>`,
  accessibility: [
    "Each tile's question is a native button inside a heading, with aria-expanded and aria-controls pointing at its panel.",
    "Panels are regions labelled by their button; closed panels are inert, so Tab and screen readers skip them.",
    "The plus and cross icon is decorative and hidden from assistive tech.",
    "With reduced motion tiles open instantly and the answer only fades.",
  ],
};

export default meta;
