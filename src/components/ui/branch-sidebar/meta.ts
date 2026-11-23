import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "branch-sidebar",
  name: "Branch Sidebar",
  description: "A panel sidebar whose rows hang off a hairline branch; groups fold, the active tick lights and one highlight glides between rows",
  category: "navigation",
  material: "Essential",
  exports: ["BranchSidebar"],
  props: [
    {
      name: "groups",
      type: "{ title: string; icon?: ReactNode; defaultCollapsed?: boolean; items: { href: string; label: string; icon?: ReactNode; badge?: string; keywords?: string }[] }[]",
      description: "The sections, in order. Each group folds under its heading.",
    },
    { name: "activeHref", type: "string", description: "Controlled active row. Pass your router's pathname." },
    { name: "defaultActiveHref", type: "string", description: "Initial active row when uncontrolled." },
    { name: "onNavigate", type: "(href: string, event: MouseEvent) => void", description: "Called on every row click. Call event.preventDefault() to route client-side." },
    { name: "searchable", type: "boolean", default: "true", description: "Show the quick search field that filters rows by label and keywords." },
    { name: "searchPlaceholder", type: "string", default: '"Quick search"', description: "Placeholder for the search field." },
    { name: "shortcut", type: "string | null", default: '"/"', description: "Key that focuses the search from anywhere on the page. null turns it off." },
    { name: "footer", type: "ReactNode", description: "Content for the strip under the scroll area." },
    { name: "label", type: "string", default: '"Sections"', description: "Accessible name for the navigation landmark." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root. Give it a height so the rows scroll." },
  ],
  usage: `import { BranchSidebar } from "@/components/ui/branch-sidebar/branch-sidebar";

const pathname = usePathname();
const router = useRouter();

<aside style={{ position: "sticky", top: 64, height: "calc(100dvh - 64px)" }}>
  <BranchSidebar
    groups={groups}
    activeHref={pathname}
    onNavigate={(href, event) => {
      event.preventDefault();
      router.push(href);
    }}
    footer={<span>38 components</span>}
    style={{ height: "100%" }}
  />
</aside>`,
  accessibility: [
    "Rows are plain links inside a labelled nav landmark; the active one carries aria-current=\"page\".",
    "Each group heading is a button with aria-expanded and aria-controls. A folded group is inert, so its links leave the tab order.",
    "The search field filters as you type, opens every group with a match, Escape clears it and Enter follows the first match. The shortcut never fires while typing in another field.",
    "The branch lines and the gliding highlight are aria-hidden; the active row is also marked by weight and colour.",
    "With reduced motion the highlight jumps and groups fold without animating.",
  ],
};

export default meta;
