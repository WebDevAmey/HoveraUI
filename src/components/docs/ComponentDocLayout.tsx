"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findDocEntry } from "@/data/docs";
import { getRegistryUrl, getRegistryBaseUrl } from "@/lib/registry";
import { PackageManagerProvider, usePackageManager } from "@/context/PackageManagerContext";
import { useApp } from "@/context/AppContext";
import SiteNav from "@/components/layout/SiteNav";
import CommandPalette from "@/components/CommandPalette";
import DocsSidebar from "@/components/docs/DocsSidebar";
import TabToggle from "@/components/docs/TabToggle";
import PackageManagerTabs from "@/components/docs/PackageManagerTabs";
import CodeBlock from "@/components/docs/CodeBlock";
import PreviewCanvas from "@/components/docs/PreviewCanvas";
import PropsTable from "@/components/docs/PropsTable";
import FlowThreadTOC from "@/components/docs/FlowThreadTOC";
import RevealSection from "@/components/docs/RevealSection";
import CopyButton from "@/components/CopyButton";
import Footer from "@/components/layout/Footer";
import type { FlowThreadSection } from "@/components/docs/useFlowThreadProgress";

const PAGE_SECTIONS: FlowThreadSection[] = [
  { id: "overview", label: "Overview" },
  { id: "preview", label: "Preview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
  { id: "props", label: "Props" },
];

const DEP_INSTALL: Record<string, (deps: string) => string> = {
  npm: (deps) => `npm install ${deps}`,
  pnpm: (deps) => `pnpm add ${deps}`,
  bun: (deps) => `bun add ${deps}`,
  yarn: (deps) => `yarn add ${deps}`,
};

const CLI_ADD: Record<string, (url: string) => string> = {
  npm: (url) => `npx shadcn@latest add ${url}`,
  pnpm: (url) => `pnpm dlx shadcn@latest add ${url}`,
  bun: (url) => `bunx shadcn@latest add ${url}`,
  yarn: (url) => `yarn dlx shadcn@latest add ${url}`,
};

interface ComponentDocLayoutProps {
  slug: string;
}

export default function ComponentDocLayout({ slug }: ComponentDocLayoutProps) {
  const entry = findDocEntry(slug);
  if (!entry) notFound();

  return (
    <PackageManagerProvider>
      <ComponentDocLayoutInner entry={entry} />
    </PackageManagerProvider>
  );
}

function ComponentDocLayoutInner({ entry }: { entry: NonNullable<ReturnType<typeof findDocEntry>> }) {
  const [previewTab, setPreviewTab] = useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = useState<"cli" | "manual">("cli");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const { packageManager } = usePackageManager();
  const { setCommandOpen } = useApp();

  const registryUrl = getRegistryUrl(entry.slug);
  const baseUrl = getRegistryBaseUrl();
  const installCommand = CLI_ADD[packageManager](registryUrl);
  const Preview = entry.Preview;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteNav onOpenSidebar={() => setSidebarOpen(true)} onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette />

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 md:px-8">
        {/* Left sidebar (desktop) */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8">
            <DocsSidebar activeSlug={entry.slug} />
          </div>
        </aside>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Component navigation"
            className="fixed inset-0 z-50 flex lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            <div
              className="relative z-10 flex h-full w-72 flex-col bg-card p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close navigation"
                className="mb-4 flex h-8 w-8 items-center justify-center self-end rounded-md text-muted-foreground hover:bg-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <DocsSidebar activeSlug={entry.slug} className="overflow-y-auto" />
            </div>
          </div>
        )}

        {/* Center column */}
        <main className="min-w-0 flex-1 max-w-3xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-muted-foreground">
            <Link href="/components" className="hover:text-foreground">Components</Link>
            <span className="mx-1.5">/</span>
            <span className="text-foreground">{entry.name}</span>
          </nav>

          {/* Mobile "on this page" dropdown */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setTocOpen((v) => !v)}
              aria-expanded={tocOpen}
              className="flex w-full items-center justify-between rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground"
            >
              On this page
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={tocOpen ? "rotate-180" : ""}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {tocOpen && (
              <div className="mt-2 rounded-md border border-border bg-card p-3">
                <FlowThreadTOC sections={PAGE_SECTIONS} />
              </div>
            )}
          </div>

          <RevealSection id="overview" className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {entry.name}
              {entry.isNew && (
                <span className="ml-2 rounded-full bg-hovera px-2 py-0.5 text-[11px] font-semibold text-hovera-foreground align-middle">
                  New
                </span>
              )}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>
            {entry.story && (
              <p className="mt-1 text-sm italic text-muted-foreground/80">{entry.story}</p>
            )}
          </RevealSection>

          <RevealSection id="preview" className="mb-12">
            <div className="overflow-hidden rounded-[var(--doc-radius)] border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
                <TabToggle
                  label="Preview or code"
                  value={previewTab}
                  onChange={setPreviewTab}
                  options={[
                    { value: "preview", label: "Preview" },
                    { value: "code", label: "Code" },
                  ]}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/20 px-3 py-2">
                <code className="overflow-x-auto whitespace-pre text-xs text-muted-foreground">
                  {installCommand}
                </code>
                <CopyButton
                  code={installCommand}
                  className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                />
              </div>

              {previewTab === "preview" ? (
                <PreviewCanvas needsLightPreview={entry.needsLightPreview}>
                  <Preview />
                </PreviewCanvas>
              ) : (
                <CodeBlock code={entry.code} filename={`${entry.slug}.tsx`} className="rounded-none border-none" />
              )}
            </div>
          </RevealSection>

          <RevealSection id="installation" className="mb-12">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">Installation</h2>
            <TabToggle
              label="Installation method"
              value={installTab}
              onChange={setInstallTab}
              options={[
                { value: "cli", label: "CLI" },
                { value: "manual", label: "Manual" },
              ]}
              className="mb-4"
            />

            {installTab === "cli" ? (
              <div>
                <p className="mb-3 text-sm text-muted-foreground">Run the following command.</p>
                <PackageManagerTabs getCommand={(pm) => CLI_ADD[pm](registryUrl)} />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">Install the following dependencies.</p>
                  <PackageManagerTabs
                    getCommand={(pm) =>
                      entry.dependencies.length > 0
                        ? DEP_INSTALL[pm](entry.dependencies.join(" "))
                        : "No additional dependencies are required."
                    }
                  />
                </div>
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">
                    Copy and paste the following code into your project.
                  </p>
                  <CodeBlock code={entry.code} filename={`${entry.slug}.tsx`} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Update the import paths to match your project structure.
                </p>
              </div>
            )}
          </RevealSection>

          <RevealSection id="usage" className="mb-12">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">Usage</h2>
            <CodeBlock code={entry.usage} />
          </RevealSection>

          <RevealSection id="props" className="mb-12">
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-foreground">Props</h2>
            <PropsTable props={entry.props} />
          </RevealSection>

          <p className="text-xs text-muted-foreground">
            Registry served from {baseUrl}/r/{entry.slug}.json
          </p>
        </main>

        {/* Right sidebar (desktop) */}
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-20">
            <FlowThreadTOC sections={PAGE_SECTIONS} />
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
