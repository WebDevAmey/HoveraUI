import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "sliding-segment",
  name: "Sliding Segment",
  description: "A segmented control whose thumb stretches toward its target, leading edge first, then settles",
  category: "inputs",
  material: "Elastic",
  exports: ["SlidingSegment"],
  props: [
    { name: "options", type: "{ value: string; label: ReactNode }[]", description: "The segments, in order." },
    { name: "value", type: "string", description: "Controlled selected value." },
    { name: "defaultValue", type: "string", default: "options[0].value", description: "Initial value when uncontrolled." },
    { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "32px or 40px segments." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the radiogroup root. Name it with aria-label or aria-labelledby." },
  ],
  usage: `import { SlidingSegment } from "@/components/ui/sliding-segment/sliding-segment";

<SlidingSegment
  aria-label="Calendar range"
  value={range}
  onValueChange={setRange}
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>`,
  accessibility: [
    "A radiogroup of radio buttons with roving focus: Tab enters on the selected segment, arrow keys move and select, Home and End jump.",
    "The thumb is decorative; the selected state is exposed through aria-checked and a stronger label colour.",
    "Segment positions are measured with ResizeObserver, so the thumb stays aligned through font loading and resizes.",
    "With reduced motion the thumb jumps to its target without stretching.",
  ],
};

export default meta;
