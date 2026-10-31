import type { Metadata } from "next";
import { Gallery } from "@/components/site/gallery";
import { registry } from "@/registry";

export const metadata: Metadata = {
  title: "Components",
  description: "Every HoveraUI component, live, filterable by category.",
};

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-16 sm:px-6">
      <p className="label">Index · {registry.length} pieces</p>
      <h1 className="mt-3 text-[clamp(32px,5vw,48px)] font-medium leading-[1.05] tracking-[-0.035em]">Components</h1>
      <p className="mt-3 max-w-lg text-ink-2">
        Each tile is the real component, running. Open one for its source, props and accessibility notes.
      </p>
      <div className="mt-10">
        <h2 className="sr-only">All components</h2>
        <Gallery syncUrl />
      </div>
    </div>
  );
}
