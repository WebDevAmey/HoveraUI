import type { ComponentDocEntry } from "@/types/docs";
import { tabs } from "@/data/tab";
import { classifyStack } from "@/lib/classify-stack";
import AnimatedTabs from "@/components/tabs/AnimatedTabs";

const animatedTabs = tabs.find((t) => t.slug === "animated-tabs")!;

export const tabDocs: ComponentDocEntry[] = [
  {
    slug: "animated-tabs",
    name: "Animated Tabs",
    description: animatedTabs.description ?? "",
    category: "tabs",
    stack: classifyStack(animatedTabs.code),
    isNew: true,
    story:
      "The active pill doesn't fade between tabs, it slides — one shared element finding its new home on a spring. Keyboard navigation and ARIA come from Radix; the motion layer only decorates state it doesn't own. With reduced motion, the pill teleports instead of springing.",
    Preview: AnimatedTabs,
    code: animatedTabs.code,
    usage: `import AnimatedTabs from "@/components/ui/animated-tabs"

export function AnimatedTabsDemo() {
  return (
    <AnimatedTabs
      tabs={[
        { value: "account", label: "Account", content: <AccountPanel /> },
        { value: "billing", label: "Billing", content: <BillingPanel /> },
      ]}
    />
  )
}`,
    dependencies: ["framer-motion", "@radix-ui/react-tabs"],
    props: [
      { name: "tabs", type: "{ value: string; label: string; content: React.ReactNode }[]", description: "Tab definitions. Defaults to a three-tab demo set." },
      { name: "defaultValue", type: "string", default: "first tab", description: "Initially active tab value." },
      { name: "className", type: "string", default: '""', description: "Extra classes merged onto the root." },
    ],
  },
];
