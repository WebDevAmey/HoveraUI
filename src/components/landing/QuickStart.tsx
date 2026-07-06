import RevealSection from "@/components/docs/RevealSection";
import CopyButton from "@/components/CopyButton";

const INSTALL = "npx shadcn@latest add @hovera/spotlight-card";
const USAGE = `import SpotlightCard from "@/components/ui/spotlight-card"

export function Feature() {
  return (
    <SpotlightCard className="w-72">
      <h3 className="text-white">Ship faster</h3>
    </SpotlightCard>
  )
}`;

export default function QuickStart() {
  return (
    <RevealSection id="quick-start" className="border-b border-border px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Install one, own it.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          One command copies the exact file into your project — dependencies resolved, no wrapper
          package, nothing to unwind later.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Install</p>
              <CopyButton code={INSTALL} label="Copy install command" />
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-code-bg p-4 font-mono text-xs leading-relaxed text-code-foreground">
              {INSTALL}
            </pre>
          </div>
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Use</p>
              <CopyButton code={USAGE} label="Copy usage example" />
            </div>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-code-bg p-4 font-mono text-xs leading-relaxed text-code-foreground">
              {USAGE}
            </pre>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
