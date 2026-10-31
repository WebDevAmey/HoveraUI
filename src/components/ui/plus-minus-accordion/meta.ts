import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "plus-minus-accordion",
  name: "Plus-Minus Accordion",
  description: "Disclosure rows whose round toggle folds a plus into a minus while its fill drains away",
  category: "navigation",
  material: "Editorial",
  exports: ["Accordion", "AccordionItem"],
  props: [
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Accordion. Single keeps at most one row open." },
    { name: "defaultValue", type: "string | string[]", description: "Accordion. Rows open on first render." },
    { name: "value", type: "string[]", description: "Accordion. Open rows, for controlled use." },
    { name: "onValueChange", type: "(value: string[]) => void", description: "Accordion. Called with the open rows after each toggle." },
    { name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Accordion. Heading element that wraps each row's button." },
    { name: "value (item)", type: "string", description: "AccordionItem. Unique key for the row." },
    { name: "title", type: "ReactNode", description: "AccordionItem. The question shown in the row." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div of Accordion or AccordionItem." },
  ],
  usage: `import { Accordion, AccordionItem } from "@/components/ui/plus-minus-accordion/plus-minus-accordion";

<Accordion type="single" defaultValue="refunds">
  <AccordionItem value="refunds" title="How do refunds work?">
    Ask within 30 days and we return the full amount.
  </AccordionItem>
  <AccordionItem value="teams" title="Can I invite my team?">
    Yes, from the settings page.
  </AccordionItem>
</Accordion>`,
  accessibility: [
    "Each row is a native button inside a heading, with aria-expanded and aria-controls pointing at its panel.",
    "Panels are regions labelled by their button. Collapsed panels stay in the DOM but are inert, so screen readers and Tab skip them.",
    "Enter and Space toggle a row; Tab moves between rows.",
    "With reduced motion the panel opens instantly and the answer simply fades in.",
  ],
  variants: [
    { name: "Single", description: "Opening one row closes the others. The FAQ default." },
    { name: "Multiple", description: "Rows open independently, for reference lists." },
  ],
};

export default meta;
