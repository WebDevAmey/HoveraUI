import type { ComponentDocEntry } from "@/types/docs";
import { sections } from "@/data/section";
import { classifyStack } from "@/lib/classify-stack";
import BentoGrid from "@/components/sections/BentoGrid";
import Timeline from "@/components/sections/Timeline";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";

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
  {
    slug: "timeline",
    name: "Timeline",
    description: get("timeline").description ?? "",
    category: "sections",
    stack: classifyStack(get("timeline").code),
    isNew: true,
    story:
      "Entries slide in from the left one after another as they enter the viewport, each anchored to a dot on a continuous line — the reveal order mirrors the chronology it describes.",
    Preview: Timeline,
    code: get("timeline").code,
    usage: `import Timeline from "@/components/ui/timeline"

export function Changelog() {
  return (
    <Timeline
      items={[
        { date: "v2.0", title: "Registry launch", description: "CLI installs from any host." },
      ]}
    />
  )
}`,
    dependencies: ["framer-motion"],
    props: [
      { name: "items", type: "{ date: string; title: string; description: string }[]", description: "Timeline entries, rendered top to bottom." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the container." },
    ],
  },
  {
    slug: "testimonial-carousel",
    name: "Testimonial Carousel",
    description: get("testimonial-carousel").description ?? "",
    category: "sections",
    stack: classifyStack(get("testimonial-carousel").code),
    isNew: true,
    story:
      "Quotes slide out the way you pushed them and the next one arrives from the opposite side, so direction always matches intent. Hand-rolled on Motion rather than a carousel library: for a handful of slides with button navigation, AnimatePresence is the whole engine — reach for embla only when you need drag physics.",
    Preview: TestimonialCarousel,
    code: get("testimonial-carousel").code,
    usage: `import TestimonialCarousel from "@/components/ui/testimonial-carousel"

export function SocialProof() {
  return (
    <TestimonialCarousel
      testimonials={[
        { quote: "It just works.", author: "J. Doe", role: "CTO" },
      ]}
    />
  )
}`,
    dependencies: ["framer-motion"],
    props: [
      { name: "testimonials", type: "{ quote: string; author: string; role: string }[]", description: "Slides to cycle through." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the container." },
    ],
  },
];
