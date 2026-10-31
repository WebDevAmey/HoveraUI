import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "quiet-tooltip",
  name: "Quiet Tooltip",
  description: "Tooltips that wait before the first one opens, then let neighbours appear instantly and without motion as you scan a toolbar",
  category: "essentials",
  material: "Essential",
  exports: ["QuietTooltip", "TooltipGroup"],
  props: [
    { name: "content", type: "ReactNode", description: "The tooltip text. A few words that name the control." },
    { name: "shortcut", type: "string[]", description: "Keys shown after the text, such as [\"⌘\", \"B\"]." },
    { name: "side", type: '"top" | "bottom"', default: '"top"', description: "Where the bubble sits. It scales out from that edge." },
    { name: "children", type: "ReactElement", description: "One focusable element. It receives aria-describedby pointing at the tooltip." },
    { name: "TooltipGroup delay", type: "number", default: "500", description: "Milliseconds before the first tooltip in the group opens." },
    { name: "TooltipGroup skip", type: "number", default: "300", description: "How long after one closes the next still opens instantly." },
  ],
  usage: `import { QuietTooltip, TooltipGroup } from "@/components/ui/quiet-tooltip/quiet-tooltip";

<TooltipGroup>
  <QuietTooltip content="Bold" shortcut={["⌘", "B"]}>
    <button aria-label="Bold">B</button>
  </QuietTooltip>
  <QuietTooltip content="Italic" shortcut={["⌘", "I"]}>
    <button aria-label="Italic">I</button>
  </QuietTooltip>
</TooltipGroup>`,
  accessibility: [
    "The bubble has role=\"tooltip\" and stays in the DOM, and the trigger points at it with aria-describedby.",
    "Keyboard focus opens it at once, Escape closes it, and pressing the trigger hides it so it never covers the result.",
    "Touch does not open it, because a tap is an action, not a hover. Give icon buttons an aria-label as well.",
    "The bubble never takes pointer events. Reduced motion removes the scale and keeps a short fade.",
  ],
};

export default meta;
