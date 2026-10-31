import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "hold-to-confirm",
  name: "Hold to Confirm",
  description: "A button that acts only after a press is held, filling an inverted copy of itself and draining on early release",
  category: "buttons",
  material: "Tactile",
  exports: ["HoldToConfirm"],
  props: [
    { name: "onConfirm", type: "() => void", description: "Called once when the hold completes. Use it instead of onClick." },
    { name: "duration", type: "number", default: "1200", description: "Milliseconds the hold must last." },
    { name: "tone", type: '"neutral" | "danger"', default: '"neutral"', description: "Danger fills with --hv-oxblood for destructive actions." },
    { name: "icon", type: "ReactNode", description: "Optional leading icon; becomes a check once confirmed." },
    { name: "confirmedLabel", type: "ReactNode", default: '"Confirmed"', description: "Label shown after the hold completes." },
    { name: "resetAfter", type: "number", default: "1600", description: "Milliseconds the confirmed state stays before draining back to idle." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button." },
  ],
  usage: `import { HoldToConfirm } from "@/components/ui/hold-to-confirm/hold-to-confirm";

<HoldToConfirm tone="danger" confirmedLabel="Deleted" onConfirm={deleteDrafts}>
  Delete drafts
</HoldToConfirm>`,
  accessibility: [
    "Holding Space or Enter works like holding the pointer; releasing either key early cancels.",
    "A polite live region announces “Keep holding”, “Released early” and “Confirmed”; the button is described as “Press and hold to confirm”.",
    "Leaving the button, losing focus or a scroll gesture on touch cancels the hold, and the long-press context menu is suppressed.",
    "With reduced motion the fill still advances linearly, since it carries meaning, but the press scale is removed.",
  ],
  variants: [
    { name: "Neutral", description: "Ink fill for reversible but deliberate actions." },
    { name: "Danger", description: "Oxblood fill for destructive actions." },
  ],
};

export default meta;
