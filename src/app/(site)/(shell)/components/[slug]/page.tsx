import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/site/code-block";
import { InstallTabs } from "@/components/site/install-tabs";
import { Preview } from "@/components/site/preview";
import { Toc } from "@/components/site/toc";
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
    <section id={id} className="scroll-mt-28 pt-16" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-[20px] font-medium tracking-[-0.02em]">
        {title}
      </h2>
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
  const sections = [
    { id: "installation", label: "Installation" },
    { id: "usage", label: "Usage" },
    { id: "props", label: "Props" },
    ...(meta.variants?.length ? [{ id: "variants", label: "Variants" }] : []),
    { id: "accessibility", label: "Accessibility" },
  ];

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_168px] xl:gap-14">
      <article className="min-w-0 max-w-[880px]">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink-3">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/components" className="transition-colors hover:text-ink">
                Components
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/components#cat-${meta.category}`} className="transition-colors hover:text-ink">
                {category?.label}
              </Link>
            </li>
          </ol>
        </nav>
        <h1 className="display mt-5 text-[clamp(38px,5vw,52px)]">{meta.name}</h1>
        <p className="mt-4 max-w-[36rem] text-[16.5px] leading-relaxed text-ink-2">{meta.description}.</p>
        <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] text-ink-3">
          <span>{meta.material}</span>
          <span aria-hidden="true">·</span>
          <span>React only</span>
          {size !== undefined && (
            <>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{formatBytes(size)} gzip</span>
            </>
          )}
        </p>

        <section id="preview" className="scroll-mt-28 pt-10" aria-labelledby="preview-title">
          <h2 id="preview-title" className="sr-only">
            Preview
          </h2>
          <Preview tall={meta.tall} files={files}>
            <Demo />
          </Preview>
        </section>

        <Section id="installation" title="Installation">
          <InstallTabs slug={slug} url={`${siteUrl}/r/${slug}.json`} files={files} />
        </Section>

        <Section id="usage" title="Usage">
          <CodeBlock title={`${meta.exports[0]}.tsx`} code={meta.usage} />
        </Section>

        <Section id="props" title="Props">
          <div className="overflow-x-auto rounded-2xl bg-surface ring-1 ring-line [scrollbar-width:thin]">
            <table className="w-full min-w-[600px] border-collapse text-left text-[13px]">
              <thead className="text-[12px] text-ink-3">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Prop
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Default
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-raised">
                {meta.props.map((prop) => (
                  <tr key={prop.name} className="border-t border-line align-top">
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[12px] text-ink ring-1 ring-line">
                        {prop.name}
                      </code>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[12px] leading-relaxed text-ink-2">{prop.type}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 font-mono text-[12px] text-ink-2">{prop.default ?? "—"}</td>
                    <td className="px-4 py-3.5 leading-relaxed text-ink-2">{prop.description}</td>
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
              className="press group flex items-center gap-3 rounded-2xl p-4 ring-1 ring-line transition-[background-color,box-shadow,transform] duration-150 hover:bg-surface hover:ring-line-strong"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="shrink-0 text-ink-3 transition-[color,translate] duration-200 ease-[var(--hv-ease-out)] group-hover:-translate-x-0.5 group-hover:text-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.5 8h-9M7 4.5 3.5 8 7 11.5" />
              </svg>
              <span>
                <span className="block text-[12px] text-ink-3">Previous</span>
                <span className="block font-medium tracking-[-0.01em]">{prev.name}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/components/${next.slug}`}
              className="press group flex items-center justify-end gap-3 rounded-2xl p-4 text-right ring-1 ring-line transition-[background-color,box-shadow,transform] duration-150 hover:bg-surface hover:ring-line-strong"
            >
              <span>
                <span className="block text-[12px] text-ink-3">Next</span>
                <span className="block font-medium tracking-[-0.01em]">{next.name}</span>
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="shrink-0 text-ink-3 transition-[color,translate] duration-200 ease-[var(--hv-ease-out)] group-hover:translate-x-0.5 group-hover:text-ink"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
              </svg>
            </Link>
          )}
        </nav>
      </article>
      <aside className="hidden xl:block">
        <div className="sticky top-[108px]">
          <Toc sections={sections} />
        </div>
      </aside>
    </div>
  );
}
