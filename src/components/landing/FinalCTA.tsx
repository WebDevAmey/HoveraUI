import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="relative px-4 py-24 md:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Get started</span>
        <h2 className="mt-6 text-[length:var(--text-display-md)] font-semibold tracking-tight text-foreground">
          Start with a component that already knows how to hover.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          No account, no backend, no review queue. Pick one, copy it, ship it.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/components"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-7 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Browse components
            <span aria-hidden="true">↗</span>
          </Link>
          <Link
            href="https://github.com/WebDevAmey/HoveraUI"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Star on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
