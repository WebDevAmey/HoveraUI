import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "rolling-number",
  name: "Rolling Number",
  description: "A number in tabular figures where each digit is a wheel that turns to its new value, lowest place first",
  category: "essentials",
  material: "Essential",
  exports: ["RollingNumber"],
  props: [
    { name: "value", type: "number", description: "The number to show. Change it and the wheels turn." },
    { name: "format", type: "Intl.NumberFormatOptions", description: "Formatting, such as currency, percent or compact notation. Separators and symbols stay still." },
    { name: "locale", type: "string", description: "Locale for formatting. Defaults to the user's." },
    { name: "...props", type: "HTMLAttributes<HTMLSpanElement>", description: "Passed to the root. Set font and colour here; the wheels inherit them." },
  ],
  usage: `import { RollingNumber } from "@/components/ui/rolling-number/rolling-number";

<RollingNumber value={readers} />

<RollingNumber value={price} format={{ style: "currency", currency: "EUR" }} />`,
  accessibility: [
    "Screen readers get the formatted number once, from a visually hidden copy; the wheels are aria-hidden.",
    "Uses tabular figures, so the width does not wobble while digits turn.",
    "It does not announce changes by itself. Wrap it in a live region if updates matter to the user.",
    "With reduced motion the digits change in place.",
  ],
};

export default meta;
