import Link from "next/link";
import type { Metadata } from "next";
import { docsNav } from "@/data/docs/nav";
import DocsTopNav from "@/components/docs/DocsTopNav";

export const metadata: Metadata = {
  title: "Docs",
  description: "Browse Hovera UI component documentation, installation steps, usage and props.",
};

export default function DocsIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <DocsTopNav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 md:px-8">
        <h1 className="text-2xl font-semibold text-foreground">Components</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick a component below to view its preview, installation steps and props.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          {docsNav.map((group) => (
            <div key={group.label}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {group.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/docs/${item.slug}`}
                    className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-hovera"
                  >
                    {item.name}
                    {item.isNew && (
                      <span className="rounded-full bg-hovera px-1.5 py-0.5 text-[10px] font-semibold text-hovera-foreground">
                        New
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
