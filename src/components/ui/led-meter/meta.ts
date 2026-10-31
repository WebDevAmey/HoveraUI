import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "led-meter",
  name: "LED Meter",
  description: "A segmented LED meter whose lit segments glow green, amber and red by zone, or scan when indeterminate",
  category: "feedback",
  material: "Pixel",
  exports: ["LedMeter"],
  props: [
    { name: "value", type: "number", description: "Current value. Leave undefined for an indeterminate scanning meter." },
    { name: "min", type: "number", default: "0", description: "Lower bound." },
    { name: "max", type: "number", default: "100", description: "Upper bound." },
    { name: "segments", type: "number", default: "16", description: "Number of LED segments." },
    { name: "warn", type: "number", default: "0.7", description: "Fraction of the scale where segments turn amber." },
    { name: "peak", type: "number", default: "0.9", description: "Fraction of the scale where segments turn red." },
    { name: "tone", type: '"zones" | "phosphor" | "amber" | "red"', default: '"zones"', description: "Zones colours by threshold; the others light every segment in one colour." },
    { name: "label", type: "ReactNode", description: "Visible mono label that also names the meter." },
    { name: "readout", type: "boolean", default: "false", description: "Shows the value as a tabular percentage beside the label." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Use aria-label when there is no visible label." },
  ],
  usage: `import { LedMeter } from "@/components/ui/led-meter/led-meter";

<LedMeter label="Upload" value={progress} readout />
<LedMeter label="Connecting" />`,
  accessibility: [
    'With a value it renders role="meter" with aria-valuenow, aria-valuemin, aria-valuemax and a percentage aria-valuetext.',
    'Without a value it renders role="progressbar" with no value and aria-busy, which screen readers announce as busy.',
    "The visible label names the meter through aria-labelledby; pass aria-label when there is none.",
    "Segments are aria-hidden; colour is never the only signal, since lit count and readout carry the value.",
    "With reduced motion the indeterminate scan becomes a steady dim band and segments switch without fading.",
  ],
  variants: [
    { name: "Zones", description: "Phosphor green, amber past 70%, red past 90%." },
    { name: "Indeterminate", description: "A soft band scans left to right." },
  ],
};

export default meta;
