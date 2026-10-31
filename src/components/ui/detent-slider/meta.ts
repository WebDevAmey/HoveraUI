import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "detent-slider",
  name: "Detent Slider",
  description: "A fader on a machined track whose labelled detents catch the thumb, which settles on each step with a short spring",
  category: "inputs",
  material: "Mechanical",
  exports: ["DetentSlider"],
  props: [
    { name: "min", type: "number", default: "0", description: "Lowest value." },
    { name: "max", type: "number", default: "100", description: "Highest value." },
    { name: "step", type: "number", default: "1", description: "Value granularity. Minor ticks sit at each step, thinned to a round interval past 48." },
    { name: "value", type: "number", description: "Controlled value." },
    { name: "defaultValue", type: "number", default: "min", description: "Starting value when uncontrolled." },
    { name: "onValueChange", type: "(value: number) => void", description: "Called with each new value." },
    { name: "format", type: "(value: number) => string", default: "String", description: "Formats the readout, the accessible value text and default mark labels." },
    { name: "marks", type: "(number | { value: number; label?: string })[]", default: "[]", description: "Detents: labelled major ticks. Drags within 2% of one snap to it; PageUp and PageDown jump between them." },
    { name: "...props", type: "InputHTMLAttributes<HTMLInputElement>", description: "Passed to the native range input (aria-label, name, disabled…). className and style go to the wrapper." },
  ],
  usage: `import { DetentSlider } from "@/components/ui/detent-slider/detent-slider";

<DetentSlider
  aria-label="Focal length"
  min={24}
  max={200}
  defaultValue={50}
  format={(v) => \`\${v} mm\`}
  marks={[24, 35, 50, 85, 135, 200]}
/>`,
  accessibility: [
    "Built on a native input type=range, so it is a slider to screen readers and joins the tab order; aria-valuetext reads the formatted value.",
    "Arrow keys move by one step and Home and End jump to the ends. With marks, PageUp and PageDown travel detent to detent.",
    "Detent snapping applies only to pointer drags, so keyboard steps stay exact.",
    "The value readout appears while dragging or on keyboard focus; the focus ring sits around the cap.",
    "With reduced motion the cap and fill move instantly instead of springing.",
  ],
  variants: [
    { name: "Fine with detents", description: "Step 1 across 24–200 mm with thinned ticks and six labelled lenses." },
    { name: "Coarse", description: "Step 10 with a tick at every step and three marks." },
  ],
};

export default meta;
