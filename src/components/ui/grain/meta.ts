import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "grain",
  name: "Grain",
  description: "A static film-grain layer drawn from SVG fractal noise, with intensity, blend and scale",
  category: "effects",
  material: "Film",
  exports: ["Grain"],
  props: [
    { name: "intensity", type: "number", default: "0.35", description: "Opacity of the grain, clamped to 0–1." },
    { name: "blend", type: "CSSProperties[\"mixBlendMode\"]", default: '"overlay"', description: "Blend mode against what sits underneath. soft-light is gentler, multiply darkens only." },
    { name: "size", type: "number", default: "1", description: "Grain scale. The 180px noise tile is multiplied by this value." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the overlay div." },
  ],
  usage: `import { Grain } from "@/components/ui/grain/grain";

<section style={{ position: "relative", background: "linear-gradient(#7fa7db, #f2d5c2)" }}>
  <Grain intensity={0.4} blend="soft-light" />
  <h2>Evening print</h2>
</section>`,
  accessibility: [
    "The layer is aria-hidden and has pointer-events: none, so it never intercepts clicks, taps or focus.",
    "It has no animation and no JavaScript, so reduced-motion settings need nothing from it.",
    "Grain sits at mid-grey in overlay mode, so it keeps the average tone and does not lower text contrast much; keep text above it with z-index if needed.",
  ],
  variants: [
    { name: "Intensity", description: "0 shows the gradient banding grain hides; 0.35 is a print finish; 0.7 is pushed film." },
  ],
};

export default meta;
