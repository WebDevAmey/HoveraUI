import type { ComponentDocEntry } from "@/types/docs";
import { cards } from "@/data/card";
import { classifyStack } from "@/lib/classify-stack";
import SpotlightCardDemo from "@/components/cards/SpotlightCardDemo";
import TiltCardDemo from "@/components/cards/TiltCardDemo";
import BorderBeam from "@/components/cards/BorderBeam";

const spotlightCard = cards.find((c) => c.slug === "spotlight-card")!;
const tiltCard = cards.find((c) => c.slug === "tilt-card")!;
const borderBeam = cards.find((c) => c.slug === "border-beam")!;

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
      { name: "spotlightColor", type: "string", default: '"rgba(255,255,255,0.16)"', description: "CSS color of the cursor-following glow." },
      { name: "spotlightRadius", type: "number", default: "260", description: "Radius of the glow circle in pixels." },
    ],
  },
{
    slug: "tilt-card",
    name: "Tilt Card",
    description: tiltCard.description ?? "",
    category: "cards",
    stack: classifyStack(tiltCard.code),
    isNew: true,
    story:
      "The card banks toward your cursor in 3D and springs flat the moment you leave — position maps to rotation through springs, so it always feels damped, never jittery. Touch devices and reduced-motion users get a plain, stable card.",
    Preview: TiltCardDemo,
    code: tiltCard.code,
    usage: `import TiltCard from "@/components/ui/tilt-card"

export function ProductCard() {
  return (
    <TiltCard maxTilt={8} className="w-72">
      <h3 className="text-white">Hover me</h3>
    </TiltCard>
  )
}`,
    dependencies: ["framer-motion"],
    props: [
      { name: "children", type: "React.ReactNode", description: "Card content, floated 24px above the surface in 3D." },
      { name: "maxTilt", type: "number", default: "10", description: "Maximum rotation in degrees on each axis." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the card." },
    ],
  },
{
    slug: "border-beam",
    name: "Border Beam",
    description: borderBeam.description ?? "",
    category: "cards",
    stack: classifyStack(borderBeam.code),
    isNew: true,
    story:
      "A colorful beam runs laps around the card border using offset-path animation from magicui. The beam travels along the card's border path, creating a smooth, continuous glow effect.",
    Preview: BorderBeam,
    code: borderBeam.code,
    usage: `import BorderBeam from "@/components/ui/border-beam"

export function FeatureCard() {
  return (
    <BorderBeam duration={8} className="w-72">
      <h3 className="text-white">Pro plan</h3>
    </BorderBeam>
  )
}`,
    dependencies: [],
    props: [
      { name: "children", type: "React.ReactNode", description: "Card content inside the beam frame." },
      { name: "duration", type: "number", default: "8", description: "Seconds per full lap." },
      { name: "size", type: "number", default: "100", description: "Beam size in pixels." },
      { name: "colorFrom", type: "string", default: '"#ffaa40"', description: "Start color of the beam gradient." },
      { name: "colorTo", type: "string", default: '"#9c40ff"', description: "End color of the beam gradient." },
      { name: "className", type: "string", default: '""', description: "Extra classes on the outer frame." },
    ],
  },
];
