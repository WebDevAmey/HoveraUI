import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "ruler-sidebar",
  name: "Ruler Sidebar",
  description: "A sidebar drawn as a fine ruler: rows hang off major ticks, an accent needle glides to the active row and a loupe swells the ticks under the pointer",
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
    { name: "title", type: "string", description: "Heading beside the toggle, with the row count after it. Also names the nav landmark." },
    { name: "magnify", type: "boolean", default: "true", description: "Ticks and labels near the pointer swell and darken, like a loupe passing over the ruler. Fine pointers only." },
    { name: "subdivisions", type: "number", default: "2", description: "Minor ticks between two rows. 0 leaves only the row ticks." },
    { name: "open", type: "boolean", description: "Controlled open state of the panel." },
    { name: "defaultOpen", type: "boolean", default: "true", description: "Initial open state when uncontrolled." },
    { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the button shows or hides the panel." },
    { name: "label", type: "string", description: "Accessible name for the navigation landmark. Defaults to the title, then \"Pages\"." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Give it a height so the rows scroll. Override --rs-pitch, --rs-major or --rs-minor to retune the ruler." },
  ],
  usage: `import { RulerSidebar } from "@/components/ui/ruler-sidebar/ruler-sidebar";

const pathname = usePathname();
const router = useRouter();

<aside style={{ position: "sticky", top: 64, height: "calc(100dvh - 80px)" }}>
  <RulerSidebar
    title="Components"
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
    "Ticks, the needle and the count are aria-hidden. The New dot is read out as \"(New)\". The active row is also marked by colour and indent, not only by the needle.",
    "The loupe also follows keyboard focus, so arrowing down the list sweeps it along the ruler.",
    "The active row is scrolled into the middle of the panel without moving the page. With reduced motion the loupe is off, that scroll jumps, and the panel, needle and icon change without animating.",
  ],
};

export default meta;
