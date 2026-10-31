export const categories = [
  { id: "essentials", label: "Essentials" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "effects", label: "Effects" },
  { id: "inputs", label: "Inputs" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
] as const;

export type Category = (typeof categories)[number]["id"];

export type Material =
  | "Tactile"
  | "Pixel"
  | "Neumorphism"
  | "Editorial"
  | "Glass"
  | "Luxury"
  | "Paper"
  | "Physical"
  | "Surreal"
  | "Print"
  | "Film"
  | "Terminal"
  | "Ethereal"
  | "Elastic"
  | "Mechanical"
  | "Essential";

export type PropDoc = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export type ComponentMeta = {
  slug: string;
  name: string;
  /** One line, no trailing period. */
  description: string;
  category: Category;
  material: Material;
  /** Exported component name(s) in <slug>.tsx. */
  exports: string[];
  props: PropDoc[];
  /** A short usage snippet. */
  usage: string;
  /** Keyboard, screen reader and reduced-motion behaviour. */
  accessibility: string[];
  /** Optional notes on variants shown in the demo. */
  variants?: { name: string; description: string }[];
  /** Whether the demo needs a tall stage on its docs page. */
  tall?: boolean;
};
