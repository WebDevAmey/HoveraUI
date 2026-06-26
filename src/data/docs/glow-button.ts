import type { ComponentDocEntry } from "@/types/docs";
import GlowButtonDemo from "@/components/buttons/GlowButtonDemo";

export const glowButtonDoc: ComponentDocEntry = {
  slug: "glow-button",
  name: "Glow Button",
  description: "A primary call-to-action button with a violet glow that intensifies on hover.",
  category: "buttons",
  Preview: GlowButtonDemo,
  code: `<button className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.8)]">
  Glow Button
</button>`,
  usage: `import GlowButton from "@/components/ui/glow-button"

export function GlowButtonDemo() {
  return <GlowButton label="Get Started" size="md" />
}`,
  dependencies: [],
  props: [
    {
      name: "label",
      type: "string",
      default: '"Glow Button"',
      description: "Text rendered inside the button.",
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Controls padding and font size.",
    },
    {
      name: "glowColor",
      type: "string",
      default: '"139, 92, 246"',
      description: "RGB triplet (no parens) used for the hover glow color.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Disables the button and suppresses the hover glow.",
    },
  ],
};
