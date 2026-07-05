import type { ComponentDocEntry } from "@/types/docs";
import { marquees } from "@/data/marquee";
import { classifyStack } from "@/lib/classify-stack";
import MarqueeDemo from "@/components/marquee/MarqueeDemo";

const marquee = marquees.find((m) => m.slug === "marquee")!;

export const marqueeDocs: ComponentDocEntry[] = [
  {
    slug: "marquee",
    name: "Marquee",
    description: marquee.description ?? "",
    category: "marquee",
    stack: classifyStack(marquee.code),
    isNew: true,
    story:
      "A seamless belt of content that never visibly loops — the children render twice and the belt translates exactly half its width, so the seam always lands off-screen. Hover pauses it so reading is a choice, not a race; reduced-motion users get it paused from the start.",
    Preview: MarqueeDemo,
    code: marquee.code,
    usage: `import Marquee from "@/components/ui/marquee"

export function LogoBelt() {
  return (
    <Marquee speed={24}>
      {logos.map((logo) => (
        <img key={logo.alt} {...logo} className="h-8 opacity-70" />
      ))}
    </Marquee>
  )
}`,
    dependencies: [],
    props: [
      { name: "children", type: "React.ReactNode", description: "Items to scroll. Rendered twice internally for the seamless loop." },
      { name: "speed", type: "number", default: "30", description: "Seconds per full loop — lower is faster." },
      { name: "reverse", type: "boolean", default: "false", description: "Scroll right-to-left instead of left-to-right." },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "Pause the belt while hovered." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the outer container." },
    ],
  },
];
