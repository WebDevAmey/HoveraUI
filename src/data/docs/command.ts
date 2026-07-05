import type { ComponentDocEntry } from "@/types/docs";
import { commands } from "@/data/command";
import { classifyStack } from "@/lib/classify-stack";
import CommandMenu from "@/components/command/CommandMenu";

const commandMenu = commands.find((c) => c.slug === "command-menu")!;

export const commandDocs: ComponentDocEntry[] = [
  {
    slug: "command-menu",
    name: "Command Menu",
    description: commandMenu.description ?? "",
    category: "command",
    stack: classifyStack(commandMenu.code),
    isNew: true,
    story:
      "Cmd+K opens a real combobox — filtering, arrow-key selection, and ARIA all come from cmdk rather than a re-implementation, so keyboard behavior matches what muscle memory expects from Raycast or Linear. Groups and actions are plain data.",
    Preview: CommandMenu,
    code: commandMenu.code,
    usage: `import CommandMenu from "@/components/ui/command-menu"

export function Header() {
  return (
    <CommandMenu
      actions={[
        { group: "Navigate", label: "Home", onSelect: () => router.push("/") },
        { group: "Theme", label: "Toggle dark mode", onSelect: toggleTheme },
      ]}
    />
  )
}`,
    dependencies: ["cmdk"],
    props: [
      { name: "actions", type: "{ group: string; label: string; hint?: string; onSelect?: () => void }[]", description: "Grouped commands shown in the palette." },
      { name: "placeholder", type: "string", default: '"Type a command or search…"', description: "Input placeholder text." },
      { name: "showTrigger", type: "boolean", default: "true", description: "Render the visible trigger button (the Cmd/Ctrl+K shortcut always works)." },
    ],
  },
];
