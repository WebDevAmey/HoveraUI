import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "timeline-rail",
  name: "Timeline Rail",
  description: "A changelog rail with mono dates, a hairline of nodes and serif headlines, latest node lit",
  category: "navigation",
  material: "Editorial",
  exports: ["TimelineRail"],
  props: [
    { name: "items", type: "{ date, dateTime?, title, body?, tags?, href? }[]", description: "Entries, newest first. The first node is drawn as the latest." },
    { name: "reveal", type: "boolean", default: "true", description: "Fades entries in as they scroll into view. Skipped under reduced motion." },
    { name: "...props", type: "OlHTMLAttributes<HTMLOListElement>", description: "Passed to the ordered list." },
  ],
  usage: `import { TimelineRail } from "@/components/ui/timeline-rail/timeline-rail";

<TimelineRail
  items={[
    { date: "Oct 2026", dateTime: "2026-10", title: "Exports to PDF", tags: ["New"] },
    { date: "Sep 2026", dateTime: "2026-09", title: "Faster search", body: "Results now stream in." },
  ]}
/>`,
  accessibility: [
    "Renders an ordered list, so screen readers announce the number of entries and each position.",
    "Dates are time elements; pass dateTime for a machine-readable value.",
    "Nodes and the rail are decorative and hidden from assistive technology.",
    "Entries are visible without JavaScript; the reveal fade only starts after mount and is skipped under reduced motion.",
    "Below 440px of container width the dates move above each entry instead of shrinking.",
  ],
};

export default meta;
