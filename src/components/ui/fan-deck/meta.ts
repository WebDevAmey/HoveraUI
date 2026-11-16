import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "fan-deck",
  name: "Fan Deck",
  description: "A neat stack of cards that spreads into an arc on hover or focus; the picked card rises out and stays on top",
  category: "cards",
  material: "Tactile",
  exports: ["FanDeck"],
  props: [
    { name: "cards", type: "FanDeckCard[]", description: "Cards as { id, label, content }. label is the accessible name." },
    { name: "value", type: "string | null", description: "Id of the picked card (controlled)." },
    { name: "defaultValue", type: "string | null", default: "null", description: "Initially picked card (uncontrolled)." },
    { name: "onValueChange", type: "(id: string) => void", description: "Called when a card is picked." },
    { name: "spread", type: "number", default: "5", description: "Degrees between neighbouring cards when fanned." },
    { name: "cardWidth", type: "number", default: "150", description: "Card width in px. Cards are 3:4; the fan narrows its spacing to fit small containers." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the listbox root. Give it an aria-label." },
  ],
  usage: `import { FanDeck } from "@/components/ui/fan-deck/fan-deck";

<FanDeck
  aria-label="Finishes"
  defaultValue="oak"
  onValueChange={setFinish}
  cards={[
    { id: "oak", label: "Oak", content: <Swatch name="Oak" /> },
    { id: "ash", label: "Ash", content: <Swatch name="Ash" /> },
  ]}
/>`,
  accessibility: [
    "Renders a listbox of options with a roving tab stop: Tab enters the deck once, arrow keys, Home and End move between cards.",
    "Enter or Space picks the focused card; aria-selected reports it.",
    "Keyboard focus fans the deck the same way hover does.",
    "On touch the first tap fans the deck and the next tap picks; tapping outside closes it.",
    "The fan keeps its spacing inside the container, so it never overflows a narrow screen.",
    "With reduced motion cards move instantly.",
  ],
};

export default meta;
