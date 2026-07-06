import type { ComponentDocEntry } from "@/types/docs";
import { textEffects } from "@/data/text";
import { classifyStack } from "@/lib/classify-stack";
import TextReveal from "@/components/text/TextReveal";
import Typewriter from "@/components/text/Typewriter";

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
];
