import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "fan-deck",
  name: "Fan Deck",
  description: "A stack of cards that fans out like a hand; the picked card lifts out and stays on top",
  category: "cards",
  material: "Tactile",
  exports: ["FanDeck"],
  props: [
    { name: "cards", type: "FanDeckCard[]", description: "Cards as { id, label, content }. label is the accessible name." },
    { name: "value", type: "string | null", description: "Id of the picked card (controlled)." },
    { name: "defaultValue", type: "string | null", default: "null", description: "Initially picked card (uncontrolled)." },
    { name: "onValueChange", type: "(id: string) => void", description: "Called when a card is picked." },
    { name: "spread", type: "number", default: "9", description: "Degrees between neighbouring cards when fanned." },
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
    "With reduced motion cards move instantly.",
  ],
};

export default meta;
