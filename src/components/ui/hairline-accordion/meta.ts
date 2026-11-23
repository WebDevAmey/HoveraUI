import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "hairline-accordion",
  name: "Hairline Accordion",
  description: "A quiet FAQ list between hairlines whose plus flattens into a minus while the answer eases down and lifts into place",
  category: "accordions",
  material: "Essential",
  exports: ["HairlineAccordion"],
  props: [
    { name: "items", type: "{ id: string; title: ReactNode; content: ReactNode }[]", description: "Rows in order." },
    { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Single keeps at most one row open." },
    { name: "defaultValue", type: "string[]", default: "[]", description: "Rows open on first render (uncontrolled)." },
    { name: "value", type: "string[]", description: "Open rows, for controlled use." },
    { name: "onValueChange", type: "(value: string[]) => void", description: "Called with the open rows after each toggle." },
    { name: "headingLevel", type: "2 | 3 | 4 | 5 | 6", default: "3", description: "Heading element that wraps each row's button." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { HairlineAccordion } from "@/components/ui/hairline-accordion/hairline-accordion";

<HairlineAccordion
  defaultValue={["license"]}
  items={[
    { id: "license", title: "Can I use it in commercial work?", content: <p>…</p> },
    { id: "copy", title: "Do I install a package?", content: <p>…</p> },
  ]}
/>`,
  accessibility: [
    "Each row is a native button inside a heading, with aria-expanded and aria-controls pointing at its panel.",
    "Panels are regions labelled by their button; closed panels are inert, so Tab and screen readers skip them.",
    "The plus and minus sign is decorative and hidden from assistive tech.",
    "With reduced motion rows open instantly and the answer only fades.",
  ],
};

export default meta;
