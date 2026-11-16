import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "shelf-accordion",
  name: "Shelf Accordion",
  description: "Panels stand side by side like spines on a shelf; choosing one widens it to uncover its contents",
  category: "accordions",
  material: "Editorial",
  exports: ["ShelfAccordion"],
  props: [
    { name: "items", type: "{ id: string; title: string; content: ReactNode }[]", description: "Panels in order. The title runs up the spine and heads the open panel." },
    { name: "value", type: "string", description: "The open panel (controlled). One panel is always open." },
    { name: "defaultValue", type: "string", default: "first item", description: "Initially open panel (uncontrolled)." },
    { name: "onValueChange", type: "(id: string) => void", description: "Called when another panel opens." },
    { name: "height", type: "number", default: "340", description: "Height of the shelf in px." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { ShelfAccordion } from "@/components/ui/shelf-accordion/shelf-accordion";

<ShelfAccordion
  items={[
    { id: "listen", title: "Listen", content: <p>…</p> },
    { id: "frame", title: "Frame", content: <p>…</p> },
    { id: "shape", title: "Shape", content: <p>…</p> },
  ]}
/>`,
  accessibility: [
    "Each spine is a native button with aria-expanded and aria-controls; panels are regions labelled by their spine.",
    "Arrow keys move focus between spines, Home and End jump; Enter or Space opens the focused one.",
    "Contents keep a fixed width while the panel widens, so text is uncovered rather than reflowed.",
    "Below 520px wide the shelf stacks vertically and panels open downward.",
    "With reduced motion panels switch instantly and contents only fade.",
  ],
};

export default meta;
