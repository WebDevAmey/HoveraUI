import type { ComponentMeta } from "@/registry/types";

const meta: ComponentMeta = {
  slug: "perforated-ticket",
  name: "Perforated Ticket",
  description: "A notched ticket whose stub tears off along the perforation and can be reattached",
  category: "cards",
  material: "Luxury",
  exports: ["PerforatedTicket"],
  props: [
    { name: "title", type: "ReactNode", description: "Large serif line on the ticket body." },
    { name: "serial", type: "string", description: "Printed on the stub and used in its accessible name." },
    { name: "eyebrow", type: "ReactNode", description: "Small caps line above the title." },
    { name: "stubLabel", type: "ReactNode", default: "\"Admit one\"", description: "Second line printed on the stub." },
    { name: "torn", type: "boolean", description: "Controlled torn state." },
    { name: "defaultTorn", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
    { name: "onTornChange", type: "(torn: boolean) => void", description: "Called when the stub is torn or reattached." },
    { name: "children", type: "ReactNode", description: "Details under a hairline (seat, time)." },
    { name: "...props", type: "HTMLAttributes<HTMLDivElement>", description: "Passed to the root div." },
  ],
  usage: `import { PerforatedTicket } from "@/components/ui/perforated-ticket/perforated-ticket";

<PerforatedTicket eyebrow="Hall B" title="The Night Garden" serial="Nº 004127" onTornChange={setUsed}>
  Row F · Seat 12 · 20:30
</PerforatedTicket>`,
  accessibility: [
    "The stub is a native button; Enter or Space tears it, and a Reattach button takes its place and receives focus.",
    "Tearing and reattaching are announced through a polite live region.",
    "Dragging the stub away with a pointer or finger tears it; a short drag springs back.",
    "With reduced motion the stub disappears and returns without the fall animation.",
  ],
};

export default meta;
