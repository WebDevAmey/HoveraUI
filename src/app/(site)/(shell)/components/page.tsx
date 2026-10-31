import type { Metadata } from "next";
import Link from "next/link";
import { registry } from "@/registry";
import { categories } from "@/registry/types";

export const metadata: Metadata = {
  title: "Components",
  description: "Every HoveraUI component, grouped by what it does.",
};

export default function ComponentsIndex() {
  return (
    <div className="max-w-[960px]">
      <h1 className="display text-[clamp(40px,5.4vw,56px)]">Components</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
        {registry.length} components, each running live on its page and copyable as source.
      </p>
      {categories.map((category) => {
        const items = registry.filter((entry) => entry.meta.category === category.id);
        if (!items.length) return null;
        return (
          <section key={category.id} aria-labelledby={`cat-${category.id}`} className="mt-12">
            <h2 id={`cat-${category.id}`} className="display mb-4 text-[26px]">
              {category.label}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(({ meta }) => (
                <li key={meta.slug}>
                  <Link
                    href={`/components/${meta.slug}`}
                    className="press block h-full rounded-2xl border border-line bg-surface/60 p-5 transition-[border-color,background-color,transform] hover:border-line-strong hover:bg-surface"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-medium tracking-[-0.01em]">{meta.name}</span>
                      <span className="text-[12px] text-ink-2">{meta.material}</span>
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">{meta.description}.</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
