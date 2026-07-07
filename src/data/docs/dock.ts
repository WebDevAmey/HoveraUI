import type { ComponentDocEntry } from "@/types/docs";
import { navbars } from "@/data/navbar";
import { classifyStack } from "@/lib/classify-stack";
import DockPreview from "@/components/docks/DockPreview";

const dock = navbars.find((n) => n.slug === "dock")!;

export const dockDoc: ComponentDocEntry = {
  slug: "dock",
  name: "Dock",
  description: dock.description ?? "",
  category: "navbars",
  stack: classifyStack(dock.code),
  isNew: true,
  story:
    "A macOS-inspired bottom dock built with Framer Motion layout animations. Clicking any icon springs the active pill to that position — the white background ring smoothly re-targets via a shared layoutId. A subtle glass backdrop and separator between app groups complete the desktop-dock feel.",
  Preview: DockPreview,
  code: dock.code,
  usage: `import Dock from "@/components/ui/dock"

export function BottomNav() {
  return (
    <Dock
      items={[
        { label: "Home", icon: <HomeIcon /> },
        { label: "Search", icon: <SearchIcon />, separatorAfter: true },
        { label: "Profile", icon: <UserIcon /> },
      ]}
    />
  )
}`,
  dependencies: ["framer-motion"],
  props: [
    { name: "items", type: "DockItem[]", description: "Array of dock items. Each item has icon, label, and optional separatorAfter." },
    { name: "defaultActive", type: "string", default: "items[0].label", description: "Label of the initially active item." },
    { name: "className", type: "string", default: '""', description: "Extra classes merged onto the dock container." },
  ],
};
