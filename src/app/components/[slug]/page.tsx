import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { buttons } from "@/data/button";
import { loaders } from "@/data/loader";
import { navbars } from "@/data/navbar";
import { slugToComponentName } from "@/lib/componentName";
import ComponentTabs from "@/components/ComponentTabs";
import ButtonPreviewWrapper from "@/components/ButtonPreviewWrapper";
import CopyButton from "@/components/CopyButton";

type Kind = "button" | "loader" | "navbar";

function findItem(slug: string) {
  const button = buttons.find((b) => b.slug === slug);
  if (button) return { kind: "button" as Kind, item: button };

  const loader = loaders.find((l) => l.slug === slug);
  if (loader) return { kind: "loader" as Kind, item: loader };

  const navbar = navbars.find((n) => n.slug === slug);
  if (navbar) return { kind: "navbar" as Kind, item: navbar };

  return null;
}

export async function generateStaticParams() {
  return [...buttons, ...loaders, ...navbars].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findItem(slug);
  if (!found) return { title: "Not Found" };
  return {
    title: found.item.name,
    description: found.item.description ?? `${found.item.name} — copy the code or install via the CLI.`,
  };
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = findItem(slug);

  if (!found) {
    notFound();
  }

  const { kind, item } = found;
  const componentName = slugToComponentName(slug);
  const cliCommand = `npx shadcn add @hovera/${slug}`;
  const usage =
    kind === "button"
      ? `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName}>Get Started</${componentName}>\n}`
      : `import ${componentName} from "@/components/ui/${slug}"\n\nexport function ${componentName}Demo() {\n  return <${componentName} />\n}`;

  const Component = item.component;
  const preview = kind === "button" ? <ButtonPreviewWrapper slug={slug} /> : <Component />;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back
      </Link>

      <div className="mt-4 flex items-center gap-2">
        <h1 className="text-2xl font-semibold text-foreground">{item.name}</h1>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium capitalize text-muted-foreground">
          {item.category}
        </span>
      </div>
      {item.description && <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>}

      <div className="mt-6">
        <ComponentTabs preview={preview} code={item.code} needsLightPreview={item.needsLightPreview} />
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Installation</h2>
        <p className="mt-2 text-sm text-muted-foreground">Run the following command</p>
        <div className="mt-3 flex items-center justify-between rounded-md border border-border bg-card px-4 py-3">
          <code className="font-mono text-sm text-foreground">{cliCommand}</code>
          <CopyButton
            code={cliCommand}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Usage</h2>
        <div className="mt-3 overflow-hidden rounded-md border border-border bg-card">
          <div className="flex justify-end border-b border-border px-2 py-1">
            <CopyButton
              code={usage}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            />
          </div>
          <pre className="overflow-x-auto bg-background p-4 font-mono text-xs leading-relaxed text-foreground">
            <code>{usage}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
