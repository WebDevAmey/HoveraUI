import type { ComponentDocEntry } from "@/types/docs";
import { backgrounds } from "@/data/background";
import { classifyStack } from "@/lib/classify-stack";

function usageFor(slug: string, componentName: string) {
  return `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName} />\n}`;
}

const STORIES: Record<string, string> = {
  aurora: "Two soft radial glows drift toward opposite corners, the kind of backdrop that suggests motion without anything actually moving.",
  "aurora-warm": "Same aurora wash, swapped to amber and rust so a hero section reads warmer instead of cool and electric.",
  "dot-grid": "A quiet, evenly spaced dot field, the kind of texture that adds depth without competing for attention.",
  "dot-matrix": "A tighter dot grid than Dot Grid, reads denser and more technical at a glance.",
  "grid-pattern": "Two faint linear gradients cross into a grid, like graph paper lit from behind in violet and blue.",
  "square-pattern": "A repeating SVG tile of small translucent squares, a subtle masonry texture rather than a sharp grid.",
  "diagonal-lines": "Thin repeating diagonal strokes at 45 degrees, motion implied through angle alone.",
  "mesh-gradient": "Two large blurred color blobs anchored at opposite corners, soft enough to sit behind text without fighting it.",
  "hex-grid": "An SVG honeycomb outline tiled edge to edge, a structured pattern for technical or data-heavy sections.",
  "conic-swirl": "A conic gradient spins violet into cyan into pink around a center point, masked by a radial fade so the edges stay dark.",
  crosshatch: "Two diagonal line sets cross each other, the woven texture of fabric rendered in CSS gradients.",
  "duotone-drift": "Two color fields blend with difference blending, producing a shifting duotone wash that depends on what overlaps.",
  "prism-spectrum": "A blurred diagonal band sweeps through the full spectrum, like light split through a prism caught mid-motion.",
  "ember-drift": "Scattered small radial points in orange and amber simulate floating embers rising against a near-black field.",
  "noise-veil": "An SVG fractal noise filter overlays two soft color blooms, closer to film grain than a clean gradient.",
  "sonar-arc": "Concentric ring gradients repeat outward from a point near the bottom, echoing a sonar ping frozen in place.",
  "glass-shard": "Layered conic gradients catch light at different angles, evoking shattered glass without any actual edges.",
  "magma-vein": "Repeating conic gradients in burnt orange trace vein-like channels across a near-black base.",
};

export const backgroundDocs: ComponentDocEntry[] = backgrounds.map((bg) => {
  const componentName = bg.name.replace(/[^a-zA-Z0-9]/g, "");
  return {
    slug: bg.slug,
    name: bg.name,
    description: `A full-bleed ${bg.category} background, ${bg.name.toLowerCase()}.`,
    category: bg.category,
    stack: classifyStack(bg.code),
    story: STORIES[bg.slug],
    Preview: bg.component,
    code: bg.code,
    usage: usageFor(bg.slug, componentName),
    dependencies: bg.dependencies ?? [],
    props: [],
  };
});
