import type React from "react";
import type { ComponentItem } from "@/types";

import AnimatedTabs from "@/components/tabs/AnimatedTabs";

export const tabs: ComponentItem[] = [
  {
    name: "Animated Tabs",
    slug: "animated-tabs",
    category: "tabs",
    component: AnimatedTabs as React.ComponentType,
    description: "Radix-powered tabs with a spring-animated shared active pill.",
    dependencies: ["framer-motion", "@radix-ui/react-tabs"],
    code: `"use client";

import { useId, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, useReducedMotion } from "framer-motion";

interface TabDef {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: TabDef[];
  defaultValue?: string;
  className?: string;
}

const DEFAULT_TABS: TabDef[] = [
  { value: "preview", label: "Preview", content: "A live look at the component, exactly as it ships." },
  { value: "code", label: "Code", content: "Copy-paste source with no wrapper abstractions." },
  { value: "props", label: "Props", content: "Every prop typed, defaulted, and documented." },
];

export default function AnimatedTabs({
  tabs = DEFAULT_TABS,
  defaultValue,
  className = "",
}: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value);
  const pillId = useId();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Tabs.Root value={active} onValueChange={setActive} className={"w-full max-w-md " + className}>
      <Tabs.List className="relative flex w-fit gap-1 rounded-full border border-white/10 bg-neutral-900 p-1">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="relative rounded-full px-4 py-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 data-[state=active]:text-white"
          >
            {active === tab.value && (
              <motion.span
                layoutId={pillId}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 32 }
                }
                className="absolute inset-0 rounded-full bg-white/10"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={tab.value} value={tab.value} className="mt-4 text-sm text-neutral-300">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab.content}
          </motion.div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}`,
  },
];
