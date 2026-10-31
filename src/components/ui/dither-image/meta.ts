import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "dither-image",
  name: "Dither Image",
  description: "An image drawn through two-tone ordered dither that resolves to full colour on hover, focus or tap",
  category: "cards",
  material: "Pixel",
  exports: ["DitherImage"],
  props: [
    { name: "src", type: "string", description: "Image URL. Cross-origin images need CORS headers, since pixels are read from a canvas." },
    { name: "alt", type: "string", description: "Alternative text for the image." },
    { name: "pixelSize", type: "number", default: "3", description: "Size of one dither cell in CSS px." },
    { name: "tones", type: "[string, string]", default: "[--hv-ink, --hv-surface]", description: "The two tones, any CSS colours. The darker one always takes the shadows." },
    { name: "ratio", type: "string", default: '"4 / 3"', description: "Aspect ratio of the frame. The image is cover-fitted." },
    { name: "caption", type: "ReactNode", description: "Caption in the mono row under the image." },
    { name: "...props", type: "HTMLAttributes<HTMLElement>", description: "Passed to the figure." },
  ],
  usage: `import { DitherImage } from "@/components/ui/dither-image/dither-image";

<DitherImage
  src="/plates/harbour.jpg"
  alt="Fishing boats at dawn"
  caption="Plate 02 — Harbour"
  tones={["#1b1f3a", "#f4efe6"]}
/>`,
  accessibility: [
    "The figure is focusable; keyboard focus resolves the image, and Enter or Space pins it in colour.",
    "A real img with alt text sits under the dither canvas, which is aria-hidden.",
    "On touch, a tap toggles between dither and full colour.",
    "With reduced motion the image switches in one frame instead of sweeping.",
    "Without script, the plain image shows.",
  ],
};

export default meta;
