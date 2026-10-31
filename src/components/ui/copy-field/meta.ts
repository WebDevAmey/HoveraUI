import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "copy-field",
  name: "Copy Field",
  description: "A read-only value with a copy button whose glyph blurs into a check while a small note rises from it",
  category: "essentials",
  material: "Essential",
  exports: ["CopyField"],
  props: [
    { name: "label", type: "ReactNode", description: "Visible label for the field." },
    { name: "value", type: "string", description: "The text to show and copy." },
    { name: "secret", type: "boolean", default: "false", description: "Mask the value and add a show or hide toggle. Copy always copies the real value." },
    { name: "onCopy", type: "(value: string) => void", description: "Called after the value reaches the clipboard." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root." },
  ],
  usage: `import { CopyField } from "@/components/ui/copy-field/copy-field";

<CopyField label="Invite link" value={inviteUrl} />
<CopyField label="API key" value={key} secret />`,
  accessibility: [
    "A labelled read-only input, so the value can be focused, selected and read by screen readers.",
    "Copy and reveal are real buttons with names; reveal reports its state with aria-pressed.",
    "A status region announces Copied to clipboard. The visual note is aria-hidden so it is not read twice.",
    "Reduced motion keeps the crossfade and drops the scale and blur.",
  ],
};

export default meta;
