import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "orbit-gallery",
  name: "Orbit Gallery",
  description: "Thumbnails drift on a slow ring around a mark; reaching for one stops the ring and brings its preview to the centre",
  category: "navigation",
  material: "Ethereal",
  exports: ["OrbitGallery"],
  props: [
    { name: "items", type: "{ id, name, category, thumb: ReactNode }[]", description: "Items spaced evenly around the ring. Thumbs are any square artwork." },
    { name: "center", type: "ReactNode", description: "The mark in the middle, set in italic serif by default." },
    { name: "duration", type: "number", default: "90", description: "Seconds per revolution." },
    { name: "onSelect", type: "(item: OrbitItem) => void", description: "Called when an item is clicked or activated with Enter or Space." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { OrbitGallery } from "@/components/ui/orbit-gallery/orbit-gallery";

<OrbitGallery
  center="Atlas"
  items={projects.map((p) => ({
    id: p.slug,
    name: p.title,
    category: p.kind,
    thumb: <img src={p.cover} alt="" />,
  }))}
  onSelect={(item) => router.push(\`/work/\${item.id}\`)}
/>`,
  accessibility: [
    "Items are buttons in a list, labelled with name and category; Tab walks the ring in order.",
    "Hover or focus stops the ring and shows the preview; Escape closes the preview and the ring stays still while focus is inside.",
    "A pause button (aria-pressed) stops the rotation for good, so nothing moves unless the reader wants it to.",
    "With reduced motion the ring is static and the pause control is hidden.",
    "The radius follows the container width, so the ring fits from 280px up without overlapping items.",
  ],
  tall: true,
};

export default meta;
