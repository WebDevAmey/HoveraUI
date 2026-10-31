import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "anchor-popover",
  name: "Anchor Popover",
  description: "One paper popover shared by several anchors that glides between them while its arrow slides along the edge",
  category: "feedback",
  material: "Paper",
  exports: ["AnchorPopover", "AnchorTerm"],
  props: [
    { name: "width", type: "number", default: "240", description: "AnchorPopover. Card width in px; it never exceeds the container minus 16px." },
    { name: "tip", type: "ReactNode", description: "AnchorTerm. What the popover says about this term." },
    { name: "heading", type: "ReactNode", description: "AnchorTerm. Optional italic serif title above the tip." },
    { name: "...props", type: "HTMLAttributes / ButtonHTMLAttributes", description: "AnchorPopover passes them to its root div, AnchorTerm to its button." },
  ],
  usage: `import { AnchorPopover, AnchorTerm } from "@/components/ui/anchor-popover/anchor-popover";

<AnchorPopover>
  <p>
    Billing runs on the <AnchorTerm tip="The first day of each month, in UTC.">cycle date</AnchorTerm>{" "}
    unless you set a <AnchorTerm heading="Grace period" tip="Seven days before access pauses.">grace period</AnchorTerm>.
  </p>
</AnchorPopover>`,
  accessibility: [
    "Each term is a native button; the shared card has role tooltip and the active term points at it with aria-describedby.",
    "Keyboard focus shows the tip, Tab moves it to the next term, and Escape dismisses it.",
    "On touch, a tap toggles the tip and tapping elsewhere closes it. With a mouse, the card stays open while the pointer is over it.",
    "Uses CSS anchor positioning where supported and measures in JS elsewhere; both paths share the same glide.",
    "With reduced motion the card moves instantly and only fades.",
  ],
};

export default meta;
