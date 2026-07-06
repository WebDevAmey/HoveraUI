import type { ComponentDocEntry } from "@/types/docs";
import { sections } from "@/data/section";
import { classifyStack } from "@/lib/classify-stack";
import BentoGrid from "@/components/sections/BentoGrid";

function get(slug: string) {
  return sections.find((s) => s.slug === slug)!;
}

export const sectionDocs: ComponentDocEntry[] = [
  {
    slug: "bento-grid",
    name: "Bento Grid",
    description: get("bento-grid").description ?? "",
    category: "sections",
    stack: classifyStack(get("bento-grid").code),
    isNew: true,
    story:
      "Cards stagger into place as the grid scrolls into view, then each one answers hover with a three-pixel lift and a brighter border. Spans are plain Tailwind classes on each item, so reshaping the grid is data, not code.",
    Preview: BentoGrid,
    code: get("bento-grid").code,
    usage: `import BentoGrid from "@/components/ui/bento-grid"

export function Features() {
  return (
    <BentoGrid
      items={[
        { title: "Fast", description: "Edge-rendered.", className: "md:col-span-2" },
        { title: "Typed", description: "End to end." },
      ]}
    />
  )
}`,
    dependencies: ["framer-motion"],
    props: [
      { name: "items", type: "{ title: string; description: string; className?: string }[]", description: "Cards to render. className carries col/row span utilities." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the grid." },
    ],
  },
];
