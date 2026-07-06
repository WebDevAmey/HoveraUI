import RevealSection from "@/components/docs/RevealSection";
import MagneticLink from "@/components/MagneticLink";

export default function FinalCTA() {
  return (
    <RevealSection id="cta" className="relative px-4 py-24 md:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative mx-auto max-w-3xl">
        <div
          className="rounded-[calc(var(--radius-card)+1px)] p-px"
          style={{
            background:
              "linear-gradient(135deg, var(--glow-1), transparent 45%, transparent 55%, var(--glow-2))",
          }}
        >
          <div className="rounded-[var(--radius-card)] bg-card px-8 py-12 text-center">
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
        </div>
      </div>
    </RevealSection>
  );
}
