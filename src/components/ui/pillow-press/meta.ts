import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "pillow-press",
  name: "Pillow Press",
  description: "A soft pill extruded from its surface that sinks in when pressed as light and shade swap sides",
  category: "buttons",
  material: "Neumorphism",
  exports: ["PillowPress"],
  props: [
    { name: "surface", type: "string", default: "var(--hv-canvas)", description: "Colour of the surface behind the pill. Match it to the parent background so the pill reads as extruded." },
    { name: "icon", type: "ReactNode", description: "Optional leading icon, hidden from assistive tech. Turns accent while pressed." },
    { name: "pressed", type: "boolean", description: "Makes the pill a toggle: sets aria-pressed and keeps it sunk while true." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "36px or 44px tall." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button." },
  ],
  usage: `import { PillowPress } from "@/components/ui/pillow-press/pillow-press";

<PillowPress pressed={muted} onClick={() => setMuted(!muted)}>
  Mute
</PillowPress>`,
  accessibility: [
    "Renders a native button; Enter and Space activate it and sink it visually, the same as a pointer press.",
    "With pressed set, the button exposes aria-pressed so screen readers announce it as a toggle.",
    "A hairline edge keeps the pill visible where soft shadows alone would fall below non-text contrast.",
    "With reduced motion the shadows swap instantly instead of crossfading.",
  ],
  variants: [
    { name: "Momentary", description: "Sinks only while held, like a doorbell." },
    { name: "Toggle", description: "With pressed, stays sunk and lights its icon in the accent." },
  ],
};

export default meta;
