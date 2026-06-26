import Link from "next/link";
import RevealSection from "@/components/docs/RevealSection";

const PATHS = [
  {
    title: "Forge the interaction",
    description: "Buttons that answer the cursor before the click, glows, ripples, sweeps and lifts.",
    href: "/docs/glow-button",
    cta: "Browse buttons",
  },
  {
    title: "Tune the motion",
    description: "Backgrounds and loaders that carry presence on their own, auroras, spotlights, drift.",
    href: "/docs/aurora",
    cta: "Browse motion",
  },
  {
    title: "Ship via registry",
    description: "One CLI command per component, resolved from your own registry URL, no copy paste required.",
    href: "/docs/glow-button#installation",
    cta: "See installation",
  },
];

export default function DiscoverPaths() {
  return (
    <RevealSection id="discover" className="border-b border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold text-foreground">Three ways in</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Start wherever you're building, the interaction, the motion behind it, or the way it ships.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PATHS.map((path) => (
            <Link
              key={path.title}
              href={path.href}
              className="group flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-6 transition-colors hover:border-hovera/50"
            >
              <h3 className="text-base font-semibold text-foreground">{path.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {path.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-hovera">
                {path.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
