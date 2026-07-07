import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/components/docs/DocsSidebar";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Guides and reference for using Hovera UI in your projects.",
};

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Documentation</h1>
      <p className="mt-2 text-base text-muted-foreground">
        Everything you need to get started with Hovera UI.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/docs/${guide.slug}`}
            className="group border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-card)]"
          >
            <h2 className="text-sm font-semibold tracking-tight text-foreground group-hover:underline">
              {guide.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
