import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "cascade-accordion",
  name: "Cascade Accordion",
  description: "Rows whose contents arrive in sequence; a thread draws down from the title and each step rises out of a mask as it passes",
  category: "accordions",
  material: "Essential",
  exports: ["CascadeAccordion"],
  props: [
    { name: "items", type: "{ id: string; title: ReactNode; content: ReactNode | ReactNode[] }[]", description: "Rows in order. Each element of a content array is revealed as its own step." },
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Single keeps at most one row open." },
    { name: "defaultValue", type: "string[]", default: "[]", description: "Rows open on first render (uncontrolled)." },
    { name: "value", type: "string[]", description: "Open rows, for controlled use." },
    { name: "onValueChange", type: "(value: string[]) => void", description: "Called with the open rows after each toggle." },
    { name: "stagger", type: "number", default: "70", description: "Milliseconds between consecutive steps." },
    { name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Heading element that wraps each row's button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { CascadeAccordion } from "@/components/ui/cascade-accordion/cascade-accordion";

<CascadeAccordion
  items={[
    {
      id: "arrive",
      title: "Arriving on the first morning",
      content: [<p key="a">Collect your key…</p>, <p key="b">Your desk is…</p>],
    },
  ]}
/>`,
  accessibility: [
    "Each row is a native button inside a heading, with aria-expanded and aria-controls pointing at its panel.",
    "All steps are in the DOM as soon as the row opens; the cascade is visual only, so screen readers read the full content at once.",
    "The dot, the thread and the step count are decorative and hidden from assistive tech.",
    "Closing drops every step at once, so the row never waits on its own animation.",
    "With reduced motion steps appear together with a short fade.",
  ],
};

export default meta;
