import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "command-palette",
  name: "Command Palette",
  description: "A frosted-glass command palette with grouped results and a tiny fuzzy matcher that highlights what you typed",
  category: "inputs",
  material: "Glass",
  exports: ["CommandPalette"],
  props: [
    { name: "groups", type: "CommandGroup[]", description: "Groups of { label, items }. Each item has id, label, and optional hint, shortcut and onSelect." },
    { name: "placeholder", type: "string", default: '"Type a command or search"', description: "Placeholder for the search input." },
    { name: "onSelect", type: "(item: CommandItem) => void", description: "Called when an item runs, after the item's own onSelect." },
    { name: "variant", type: '"inline" | "dialog"', default: '"inline"', description: "Inline renders the panel in place. Dialog renders it in a native modal dialog." },
    { name: "open", type: "boolean", default: "false", description: "Dialog variant: whether the dialog is open. The query resets each time it opens." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Dialog variant: called with false on Escape, a backdrop click or after an item runs." },
    { name: "empty", type: "ReactNode", default: '"Nothing matches …"', description: "Shown when no item matches the query." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the glass panel." },
  ],
  usage: `import { CommandPalette } from "@/components/ui/command-palette/command-palette";

const [open, setOpen] = useState(false);

<CommandPalette
  variant="dialog"
  open={open}
  onOpenChange={setOpen}
  groups={[
    { label: "Adjust", items: [{ id: "exposure", label: "Exposure", shortcut: ["E"] }] },
    { label: "Export", items: [{ id: "jpeg", label: "Export as JPEG" }] },
  ]}
  onSelect={(item) => run(item.id)}
/>`,
  accessibility: [
    "The input is a combobox that controls a listbox; aria-activedescendant points at the active option, so focus never leaves the input.",
    "Arrow keys move and wrap, Home and End jump, Enter runs the active item. Escape clears the query inline and closes the dialog.",
    "The dialog variant uses a native dialog with showModal, so focus is trapped and returned and the page behind is inert.",
    "Group headings label their option groups, and the result count is announced as a status while typing.",
    "With reduced motion the dialog fades in instead of rising.",
  ],
  variants: [
    { name: "Inline", description: "The panel sits in place, for docs and settings pages." },
    { name: "Dialog", description: "A modal opened from a trigger or ⌘K / Ctrl+K, which the host wires up." },
  ],
  tall: true,
};

export default meta;
