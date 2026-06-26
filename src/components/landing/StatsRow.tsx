import { backgrounds } from "@/data/background";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import RevealSection from "@/components/docs/RevealSection";

export default function StatsRow() {
  const total = backgrounds.length + buttons.length + loaders.length + navbars.length;
  const families = new Set([
    ...backgrounds.map((b) => b.category),
    "buttons",
    "loaders",
    "navbars",
  ]).size;

  const stats = [
    { label: "Components", value: String(total) },
    { label: "Families", value: String(families) },
    { label: "Registry", value: "CLI Ready" },
  ];

  return (
    <RevealSection id="stats" className="border-b border-border px-4 py-10 md:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card px-6 py-8 text-center">
            <p className="text-3xl font-semibold text-foreground">{s.value}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
