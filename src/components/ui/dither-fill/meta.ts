import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "dither-fill",
  name: "Dither Fill",
  description: "A button whose fill arrives through a 4×4 Bayer matrix, threshold by threshold, and drains in reverse",
  category: "buttons",
  material: "Pixel",
  exports: ["DitherFill"],
  props: [
    { name: "variant", type: '"ink" | "accent"', default: '"ink"', description: "Ink uses --hv-ink with an inverted canvas label; accent uses --hv-accent and --hv-accent-ink." },
    { name: "cell", type: "number", default: "3", description: "Size of one dither cell in px. The matrix tile is four cells wide." },
    { name: "...props", type: "ButtonHTMLAttributes", description: "Passed to the native button." },
  ],
  usage: `import { DitherFill } from "@/components/ui/dither-fill/dither-fill";

<DitherFill variant="accent" onClick={start}>
  Continue
</DitherFill>`,
  accessibility: [
    "Renders a native button: Tab focuses it, Enter and Space activate it.",
    "Keyboard focus fills the button exactly like hover, and the focus ring sits 2px outside the border.",
    "Touch fills it while pressed; hover styles only apply on devices that can hover.",
    "The inverted label is a decorative copy marked aria-hidden, so the name is announced once.",
    "With reduced motion the fill swaps in one step instead of sixteen.",
  ],
  variants: [
    { name: "Ink", description: "Hairline border in ink; the label inverts to the canvas tone." },
    { name: "Accent", description: "Ultramarine border and fill for the primary action." },
  ],
};

export default meta;
