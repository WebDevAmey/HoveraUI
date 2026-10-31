import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/site/code-block";
import { Preview } from "@/components/site/preview";
import { SourceTabs } from "@/components/site/source-tabs";
import { highlight, langFor } from "@/lib/highlight";
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
    <section id={id} className="scroll-mt-24 pt-16">
      <h2 className="display text-[26px]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const { meta, Demo } = entry;
  const files = await Promise.all(
    getSource(slug).map(async (file) => ({ ...file, html: await highlight(file.code, langFor(file.name)) })),
  );
  const size = getSize(slug);
  const category = categories.find((c) => c.id === meta.category);
  const index = registry.findIndex((e) => e.meta.slug === slug);
  const prev = registry[index - 1]?.meta;
  const next = registry[index + 1]?.meta;

  return (
    <article className="max-w-[860px]">
      <nav aria-label="Breadcrumb" className="text-[13px] text-ink-2">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/components" className="transition-colors hover:text-ink">
              Components
            </Link>
          </li>
          <li aria-hidden="true" className="text-ink-3">
            /
          </li>
          <li>{category?.label}</li>
        </ol>
      </nav>
      <h1 className="display mt-4 text-[clamp(40px,5.4vw,56px)]">{meta.name}</h1>
      <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-2">{meta.description}.</p>
      <dl className="mt-6 flex flex-wrap gap-2 text-[12.5px]">
        {[
          ["Material", meta.material],
          ["Dependencies", "React only"],
          ...(size !== undefined ? [["Size", `${formatBytes(size)} gzip`]] : []),
        ].map(([term, value]) => (
          <div key={term} className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1">
            <dt className="text-ink-2">{term}</dt>
            <dd className="font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <section id="preview" className="scroll-mt-24 pt-10" aria-labelledby="preview-title">
        <h2 id="preview-title" className="sr-only">
          Preview
        </h2>
        <Preview tall={meta.tall}>
          <Demo />
        </Preview>
      </section>

      <Section id="installation" title="Installation">
        <p className="mb-4 max-w-2xl text-ink-2">
          Fetch the component, its styles, the shared{" "}
          <Link href="/docs/tokens" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            tokens
          </Link>{" "}
          and the <code className="font-mono text-[13px] text-ink">cn</code> helper with the shadcn CLI. Or copy both files
          below into <code className="font-mono text-[13px] text-ink">components/ui/{slug}/</code>.
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
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-[13px]">
            <thead className="bg-surface text-[12.5px] text-ink-2">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-medium">Prop</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Default</th>
                <th scope="col" className="px-4 py-2.5 font-medium">Description</th>
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

      <nav aria-label="More components" className="mt-24 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/components/${prev.slug}`}
            className="press group rounded-2xl border border-line p-5 transition-[border-color,background-color,transform] hover:border-line-strong hover:bg-surface"
          >
            <span className="text-[12.5px] text-ink-2">Previous</span>
            <span className="display mt-1 block text-[22px]">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/components/${next.slug}`}
            className="press group rounded-2xl border border-line p-5 text-right transition-[border-color,background-color,transform] hover:border-line-strong hover:bg-surface"
          >
            <span className="text-[12.5px] text-ink-2">Next</span>
            <span className="display mt-1 block text-[22px]">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
