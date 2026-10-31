import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/site/code-block";
import { DocsShell } from "@/components/site/docs-shell";
import { Preview } from "@/components/site/preview";
import { SourceTabs } from "@/components/site/source-tabs";
import { getEntry, registry } from "@/registry";
import { formatBytes, getSize, getSource } from "@/registry/source";
import { categories } from "@/registry/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return registry.map((entry) => ({ slug: entry.meta.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getEntry((await params).slug);
  if (!entry) return {};
  return { title: entry.meta.name, description: `${entry.meta.description}.` };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoveraui.vercel.app";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 pt-14">
      <h2 className="text-lg font-medium tracking-[-0.02em]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const { meta, Demo } = entry;
  const files = getSource(slug);
  const size = getSize(slug);
  const category = categories.find((c) => c.id === meta.category);
  const index = registry.findIndex((e) => e.meta.slug === slug);
  const prev = registry[index - 1]?.meta;
  const next = registry[index + 1]?.meta;

  const toc = [
    { id: "preview", label: "Preview" },
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "props", label: "Props" },
    ...(meta.variants?.length ? [{ id: "variants", label: "Variants" }] : []),
    { id: "accessibility", label: "Accessibility" },
  ];

  return (
    <DocsShell toc={toc}>
      <article>
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] text-ink-2">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/docs#components" className="hover:text-ink">
                Components
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/docs?category=${meta.category}#components`} className="hover:text-ink">
                {category?.label}
              </Link>
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-[clamp(32px,5vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">{meta.name}</h1>
        <p className="mt-3 max-w-xl text-[17px] text-ink-2">{meta.description}.</p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] text-ink-2">
          <div className="flex gap-2">
            <dt>Material</dt>
            <dd className="text-ink">{meta.material}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Dependencies</dt>
            <dd className="text-ink">React only</dd>
          </div>
          {size !== undefined && (
            <div className="flex gap-2">
              <dt>Size</dt>
              <dd className="text-ink">{formatBytes(size)} gzip</dd>
            </div>
          )}
        </dl>

        <section id="preview" className="scroll-mt-20 pt-10" aria-labelledby="preview-title">
          <h2 id="preview-title" className="sr-only">
            Preview
          </h2>
          <Preview tall={meta.tall}>
            <Demo />
          </Preview>
        </section>

        <Section id="installation" title="Installation">
          <p className="mb-4 max-w-2xl text-ink-2">
            Copy both files into <code className="font-mono text-[13px] text-ink">components/ui/{slug}/</code>. They need the
            shared <Link href="/docs#tokens" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">tokens</Link> and the
            tiny <code className="font-mono text-[13px] text-ink">cn</code> helper. Or fetch everything with the shadcn CLI:
          </p>
          <CodeBlock title="Terminal" code={`npx shadcn@latest add ${siteUrl}/r/${slug}.json`} />
          <div className="mt-4">
            <SourceTabs files={files} />
          </div>
        </Section>

        <Section id="usage" title="Usage">
          <CodeBlock title={`${meta.exports[0]}.tsx`} code={meta.usage} />
        </Section>

        <Section id="props" title="Props">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
              <thead className="bg-surface font-mono text-[11px] text-ink-2">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-normal">Prop</th>
                  <th scope="col" className="px-4 py-2.5 font-normal">Type</th>
                  <th scope="col" className="px-4 py-2.5 font-normal">Default</th>
                  <th scope="col" className="px-4 py-2.5 font-normal">Description</th>
                </tr>
              </thead>
              <tbody>
                {meta.props.map((prop) => (
                  <tr key={prop.name} className="border-t border-line align-top">
                    <td className="px-4 py-3 font-mono text-[12px] text-ink">{prop.name}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-ink-2">{prop.type}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-ink-2">{prop.default ?? "—"}</td>
                    <td className="px-4 py-3 text-ink-2">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {meta.variants?.length ? (
          <Section id="variants" title="Variants">
            <dl className="divide-y divide-line border-y border-line">
              {meta.variants.map((variant) => (
                <div key={variant.name} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr]">
                  <dt className="font-medium">{variant.name}</dt>
                  <dd className="text-ink-2">{variant.description}</dd>
                </div>
              ))}
            </dl>
          </Section>
        ) : null}

        <Section id="accessibility" title="Accessibility">
          <ul className="space-y-2.5 text-ink-2">
            {meta.accessibility.map((note) => (
              <li key={note} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-ink-3" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Section>

        <nav aria-label="More components" className="mt-20 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className="rounded-xl border border-line p-4 transition-colors hover:border-line-strong">
              <span className="label">Previous</span>
              <span className="mt-1 block font-medium">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${next.slug}`} className="rounded-xl border border-line p-4 text-right transition-colors hover:border-line-strong">
              <span className="label">Next</span>
              <span className="mt-1 block font-medium">{next.name}</span>
            </Link>
          )}
        </nav>
      </article>
    </DocsShell>
  );
}
