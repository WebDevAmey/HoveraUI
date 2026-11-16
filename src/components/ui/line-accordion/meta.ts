import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "line-accordion",
  name: "Line Accordion",
  description: "A typographic accordion set in serif between hairlines; opening a row draws an ink rule across its divider",
  category: "accordions",
  material: "Editorial",
  exports: ["LineAccordion"],
  props: [
    { name: "items", type: "{ id: string; title: ReactNode; content: ReactNode; meta?: ReactNode }[]", description: "Rows in order. meta is a short note set in mono beside the title." },
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Single keeps at most one row open." },
    { name: "defaultValue", type: "string[]", default: "[]", description: "Rows open on first render (uncontrolled)." },
    { name: "value", type: "string[]", description: "Open rows, for controlled use." },
    { name: "onValueChange", type: "(value: string[]) => void", description: "Called with the open rows after each toggle." },
    { name: "numbered", type: "boolean", default: "true", description: "Show a two-digit index before each title." },
    { name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Heading element that wraps each row's button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { LineAccordion } from "@/components/ui/line-accordion/line-accordion";

<LineAccordion
  defaultValue={["measure"]}
  items={[
    { id: "measure", title: "Set a comfortable measure", meta: "Type", content: <p>…</p> },
    { id: "rhythm", title: "Let spacing carry the hierarchy", meta: "Space", content: <p>…</p> },
  ]}
/>`,
  accessibility: [
    "Each row is a native button inside a heading, with aria-expanded and aria-controls pointing at its panel.",
    "Panels are regions labelled by their button; closed panels are inert, so Tab and screen readers skip them.",
    "The index numbers, the cross and the ink rule are decorative and hidden from assistive tech.",
    "With reduced motion rows open instantly and the text only fades.",
  ],
};

export default meta;
