import type { Metadata } from "next";
import { CategoryFilter } from "@/components/site/category-filter";
import { fresh } from "@/components/site/nav";
import { Tile } from "@/components/site/tile";
import { registry } from "@/registry";
import { categories } from "@/registry/types";

export const metadata: Metadata = {
  title: "Components",
  description: "Every HoveraUI component, grouped by what it does.",
};

/** Demos built for a full stage are shown smaller here, so each one fits its card whole. */
const zoom: Record<string, number> = {
  "plus-minus-accordion": 0.8,
  "line-accordion": 0.72,
  "shelf-accordion": 0.66,
  "layer-accordion": 0.74,
  "cascade-accordion": 0.74,
  "fan-deck": 0.82,
  "hover-reveal": 0.6,
  "anchor-popover": 0.7,
};

export default function ComponentsIndex() {
  const groups = categories
    .map((category) => ({ ...category, items: registry.filter((entry) => entry.meta.category === category.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="max-w-[1120px]">
      <h1 className="display text-[clamp(40px,5.4vw,56px)]">Components</h1>
      <p className="mt-4 max-w-[34rem] text-[16.5px] leading-relaxed text-ink-2">
        {registry.length} components, each running live below. Try one here, then open it for the code.
      </p>
      <div className="mt-8">
        <CategoryFilter options={groups.map((group) => ({ id: group.id, label: group.label, count: group.items.length }))}>
          {groups.map((group) => (
            <section key={group.id} data-cat={group.id} aria-labelledby={`cat-${group.id}`} className="scroll-mt-36 pt-8">
              <h2 id={`cat-${group.id}`} className="mb-4 flex items-baseline gap-2 text-[15px] font-medium tracking-[-0.01em]">
                {group.label}
                <span className="text-[12.5px] font-normal tabular-nums text-ink-3">{group.items.length}</span>
              </h2>
              <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map(({ meta, Demo }) => (
                  <li key={meta.slug} className="flex">
                    <Tile
                      meta={meta}
                      Demo={Demo}
                      badge={fresh.has(meta.slug) ? "New" : undefined}
                      className="w-full"
                      stageClassName="h-[300px] min-h-0 flex-none px-4 py-6"
                      zoom={zoom[meta.slug]}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </CategoryFilter>
      </div>
    </div>
  );
}
