import type { ComponentDocEntry } from "@/types/docs";
import { textEffects } from "@/data/text";
import { classifyStack } from "@/lib/classify-stack";
import TextReveal from "@/components/text/TextReveal";
import Typewriter from "@/components/text/Typewriter";
import DisplacementText from "@/components/text/DisplacementText";
import LiquidText from "@/components/text/LiquidText";

function get(slug: string) {
  return textEffects.find((t) => t.slug === slug)!;
}

export const textDocs: ComponentDocEntry[] = [
  {
    slug: "text-reveal",
    name: "Text Reveal",
    description: get("text-reveal").description ?? "",
    category: "text",
    stack: classifyStack(get("text-reveal").code),
    isNew: true,
    story:
      "Each word rises out of its own clipped line as the paragraph scrolls into view, so the sentence assembles itself in reading order. Screen readers get the whole sentence at once via aria-label; reduced-motion users get plain, instant text.",
    Preview: TextReveal,
    code: get("text-reveal").code,
    usage: `import TextReveal from "@/components/ui/text-reveal"

export function Headline() {
  return <TextReveal text="Ship interfaces that feel designed." className="text-4xl" />
}`,
    dependencies: ["framer-motion"],
    props: [
      { name: "text", type: "string", description: "The sentence to reveal, split on spaces." },
      { name: "stagger", type: "number", default: "0.06", description: "Seconds between each word's entrance." },
      { name: "delay", type: "number", default: "0", description: "Seconds before the first word starts." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the paragraph." },
    ],
  },
  {
    slug: "typewriter",
    name: "Typewriter",
    description: get("typewriter").description ?? "",
    category: "text",
    stack: classifyStack(get("typewriter").code),
    isNew: true,
    story:
      "Phrases type in, hold, and delete on a natural rhythm — typing runs faster than deleting, the way a person actually corrects a line. Under reduced motion the loop never starts: the first phrase renders complete and stays put.",
    Preview: Typewriter,
    code: get("typewriter").code,
    usage: `import Typewriter from "@/components/ui/typewriter"

export function HeroLine() {
  return <Typewriter words={["hover states", "scroll reveals", "page transitions"]} />
}`,
    dependencies: [],
    props: [
      { name: "words", type: "string[]", description: "Phrases to cycle through." },
      { name: "typingSpeed", type: "number", default: "70", description: "Milliseconds per typed character." },
      { name: "deletingSpeed", type: "number", default: "40", description: "Milliseconds per deleted character." },
      { name: "holdTime", type: "number", default: "1400", description: "Milliseconds a completed phrase stays before deleting." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the span." },
    ],
  },
  {
    slug: "displacement-text",
    name: "Displacement Text",
    description: get("displacement-text").description ?? "",
    category: "text",
    stack: classifyStack(get("displacement-text").code),
    isNew: true,
    story:
      "Move the cursor through the word and each glyph lifts, tilts and stretches on a gaussian falloff — type behaving like a field, not a string. Direct style writes mean zero re-renders; touch and reduced-motion users get solid, legible text.",
    Preview: DisplacementText,
    code: get("displacement-text").code,
    usage: `import DisplacementText from "@/components/ui/displacement-text"

export function Headline() {
  return <DisplacementText text="HOVERA" className="text-6xl" />
}`,
    dependencies: [],
    props: [
      { name: "text", type: "string", description: "The string to split into displaceable glyphs." },
      { name: "strength", type: "number", default: "22", description: "Max lift in px at the cursor's center." },
      { name: "radius", type: "number", default: "120", description: "Gaussian falloff radius in px." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the wrapper." },
    ],
  },
  {
    slug: "liquid-text",
    name: "Liquid Text",
    description: get("liquid-text").description ?? "",
    category: "text",
    stack: classifyStack(get("liquid-text").code),
    isNew: true,
    story:
      "Hover and the letters go molten — an SVG turbulence field displaces the glyphs while a rAF loop stirs the noise, then everything sets solid when you leave. Reduced motion never melts: the text stays a stable solid.",
    Preview: LiquidText,
    code: get("liquid-text").code,
    usage: `import LiquidText from "@/components/ui/liquid-text"

export function Brand() {
  return <LiquidText text="HOVERA" intensity={30} />
}`,
    dependencies: [],
    props: [
      { name: "text", type: "string", description: "The text to distort." },
      { name: "intensity", type: "number", default: "26", description: "Peak displacement scale while molten." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the wrapper." },
    ],
  },
];
