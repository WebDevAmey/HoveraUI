import Link from "next/link";
import { CodeBlock } from "@/components/site/code-block";
import { Faq } from "@/components/site/faq";
import { Hero } from "@/components/site/hero";
import { Tile } from "@/components/site/tile";
import { getEntry, registry } from "@/registry";

const featured: { slug: string; className: string }[] = [
  { slug: "glass-specimen", className: "md:col-span-4 md:row-span-2" },
  { slug: "depth-key", className: "md:col-span-2" },
  { slug: "led-meter", className: "md:col-span-2" },
  { slug: "sliding-segment", className: "md:col-span-2" },
  { slug: "gilded-frame", className: "md:col-span-2" },
  { slug: "stack-toast", className: "md:col-span-2" },
];

const usage = `import { DepthKey } from "@/components/ui/depth-key/depth-key";

export function Toolbar() {
  return <DepthKey variant="accent">Publish</DepthKey>;
}`;

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="featured-title" className="px-2 sm:px-4">
        <div
          style={{ "--i": 5 } as React.CSSProperties}
          className="rise mx-auto max-w-[1320px] rounded-[32px] bg-sunken/70 px-3 py-3 ring-1 ring-line sm:px-4 sm:py-4"
        >
          <h2 id="featured-title" className="sr-only">
            Selected components
          </h2>
          <div className="grid gap-3 sm:gap-4 md:auto-rows-[minmax(320px,auto)] md:grid-cols-6">
            {featured.map(({ slug, className }) => {
              const entry = getEntry(slug);
              return entry ? <Tile key={slug} meta={entry.meta} Demo={entry.Demo} className={className} /> : null;
            })}
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-[1320px] text-center text-[14px] text-ink-2">
          Every one runs live here.{" "}
          <Link href="/components" className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink">
            See all {registry.length}
          </Link>
        </p>
      </section>

      <section aria-labelledby="install-title" className="px-4 py-28 sm:px-6">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 id="install-title" className="display text-[clamp(34px,4.4vw,52px)]">
              Copy it in. Make it yours.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-2">
              Each component is one React file and one CSS module. Pull it in with the shadcn CLI or paste the source,
              then change anything you like. React is the only dependency.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/docs/installation"
                className="press rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-[opacity,transform] hover:opacity-90"
              >
                Installation guide
              </Link>
              <Link
                href="/docs/tokens"
                className="press rounded-full border border-line-strong px-5 py-2.5 text-[14px] text-ink transition-[background-color,transform] hover:bg-surface"
              >
                Design tokens
              </Link>
            </div>
          </div>
          <CodeBlock title="toolbar.tsx" code={usage} />
        </div>
      </section>

      <Faq />
    </>
  );
}
