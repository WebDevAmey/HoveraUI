import type { ComponentDocEntry } from "@/types/docs";
import { cards } from "@/data/card";
import { classifyStack } from "@/lib/classify-stack";
import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";

const spotlightCard = cards.find((c) => c.slug === "spotlight-card")!;

export const cardDocs: ComponentDocEntry[] = [
  {
    slug: "spotlight-card",
    name: "Spotlight Card",
    description: spotlightCard.description ?? "",
    category: "cards",
    stack: classifyStack(spotlightCard.code),
    isNew: true,
    story:
      "A radial glow chases the cursor across the card surface while the whole card lifts two pixels — the light responds before the layout does. Cursor tracking writes CSS variables directly, so following the mouse never re-renders the card.",
    Preview: SpotlightCardDemo,
    code: spotlightCard.code,
    usage: `import SpotlightCard from "@/components/ui/spotlight-card"

export function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-72">
      <p className="text-sm font-medium text-white">Ship faster</p>
      <p className="mt-1 text-sm text-neutral-400">Hover to see the light follow.</p>
    </SpotlightCard>
  )
}`,
    dependencies: ["framer-motion"],
    props: [
      { name: "children", type: "React.ReactNode", description: "Card content, rendered above the glow layer." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the card container." },
      { name: "spotlightColor", type: "string", default: '"rgba(139, 92, 246, 0.22)"', description: "CSS color of the cursor-following glow." },
      { name: "spotlightRadius", type: "number", default: "260", description: "Radius of the glow circle in pixels." },
    ],
  },
];
