import RevealSection from "@/components/docs/RevealSection";
import MagneticLink from "@/components/MagneticLink";

export default function FinalCTA() {
  return (
    <RevealSection id="cta" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-border bg-card px-8 py-12 text-center shadow-[var(--shadow-glow)]">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Start with a component that already knows how to hover.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          No account, no backend, no review queue. Pick one, copy it, ship it.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticLink href="/docs" primary>
            Browse components
          </MagneticLink>
          <MagneticLink href="https://github.com/WebDevAmey/HoveraUI" external>
            Star on GitHub
          </MagneticLink>
        </div>
      </div>
    </RevealSection>
  );
}
