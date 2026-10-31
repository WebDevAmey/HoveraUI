import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "ascii-resolve",
  name: "ASCII Resolve",
  description: "Content resolves out of a field of monospace glyphs that scramble, then decay column by column",
  category: "effects",
  material: "Terminal",
  exports: ["AsciiResolve"],
  props: [
    { name: "replayKey", type: "string | number", description: "Change it to play the resolve again." },
    { name: "color", type: "string", default: "var(--hv-ink-2)", description: "Glyph colour, any CSS colour." },
    { name: "background", type: "string", default: "var(--hv-canvas)", description: "Colour of the glyph field that hides the content. Match the surface behind it." },
    { name: "duration", type: "number", default: "1400", description: "Total length of the resolve in ms." },
    { name: "ramp", type: "string", default: '" .:-=+*#%@"', description: "Glyphs from empty to dense. Cells decay down it to a space." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { AsciiResolve } from "@/components/ui/ascii-resolve/ascii-resolve";

<AsciiResolve background="var(--hv-surface)">
  <ReleaseNotes />
</AsciiResolve>`,
  accessibility: [
    "The content is always in the DOM and the accessibility tree; it is only hidden visually until the run starts.",
    "The glyph canvas is aria-hidden, ignores the pointer, and is removed when the run ends.",
    "It runs once, when at least a third of it scrolls into view; replayKey plays it again.",
    "With reduced motion the content shows immediately and no glyphs are drawn.",
  ],
};

export default meta;
