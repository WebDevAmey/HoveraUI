import Link from "next/link";
import RevealSection from "@/components/docs/RevealSection";

export default function FinalCTA() {
  return (
    <RevealSection id="cta" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-border bg-card px-8 py-12 text-center shadow-[var(--shadow-glow)]">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Start with a component that already knows how to hover.
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No account, no backend, no review queue. Pick one, copy it, ship it.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-hovera px-5 py-2.5 text-sm font-medium text-hovera-foreground transition-colors hover:bg-hovera/90"
          >
            Browse components
          </Link>
          <Link
            href="https://github.com/WebDevAmey/HoveraUI"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Star on GitHub
          </Link>
        </div>
      </div>
    </RevealSection>
  );
}
