import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "ruler-sidebar",
  name: "Ruler Sidebar",
  description: "A sidebar drawn as a fine ruler: each row hangs off a tick, minor ticks fill the gaps and the active tick reaches further out",
  category: "navigation",
  material: "Essential",
  exports: ["RulerSidebar"],
  props: [
    {
      name: "items",
      type: "{ href: string; label: string; isNew?: boolean }[]",
      description: "The rows, in order. isNew adds a small accent dot.",
    },
    { name: "activeHref", type: "string", description: "Controlled active row. Pass your router's pathname." },
    { name: "defaultActiveHref", type: "string", description: "Initial active row when uncontrolled." },
    { name: "onNavigate", type: "(href: string, event: MouseEvent) => void", description: "Called on every row click. Call event.preventDefault() to route client-side." },
    { name: "subdivisions", type: "number", default: "2", description: "Minor ticks between two rows. 0 leaves only the row ticks." },
    { name: "open", type: "boolean", description: "Controlled open state of the panel." },
    { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the button shows or hides the panel." },
    { name: "label", type: "string", default: '"Pages"', description: "Accessible name for the navigation landmark." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Give it a height so the rows scroll. Override --rs-pitch or --rs-tick-length to retune the ruler." },
  ],
  usage: `import { RulerSidebar } from "@/components/ui/ruler-sidebar/ruler-sidebar";

const pathname = usePathname();
const router = useRouter();

<aside style={{ position: "sticky", top: 64, height: "calc(100dvh - 80px)" }}>
  <RulerSidebar
    items={components.map((c) => ({ href: \`/components/\${c.slug}\`, label: c.name, isNew: c.isNew }))}
    activeHref={pathname}
    onNavigate={(href, event) => {
      event.preventDefault();
      router.push(href);
    }}
    style={{ height: "100%" }}
  />
</aside>`,
  accessibility: [
    "Rows are plain links in a list inside a labelled nav landmark; the active one carries aria-current=\"page\".",
    "Arrow Up and Arrow Down move focus between rows, Home and End jump to the first and last.",
    "The show and hide button carries aria-expanded and aria-controls. A hidden panel is inert, so its links leave the tab order.",
    "Ticks are aria-hidden. The New dot is read out as \"(New)\". The active row is also marked by colour and indent, not only tick length.",
    "The active row is scrolled into the middle of the panel without moving the page. With reduced motion that scroll jumps and the panel, ticks and icon change without animating.",
  ],
};

export default meta;
