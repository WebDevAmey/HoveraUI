"use client";

import SiteNav from "@/components/layout/SiteNav";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/CommandPalette";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { useApp } from "@/context/AppContext";

interface GuideLayoutProps {
  slug: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}

/** Shared shell for the /docs/* guide pages: nav, sidebar, prose column. */
export default function GuideLayout({ slug, title, lead, children }: GuideLayoutProps) {
  const { setCommandOpen } = useApp();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandPalette />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-10 px-4 py-10 md:px-8">
        <DocsSidebar
          activeSlug={slug}
          className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-56 shrink-0 self-start overflow-y-auto lg:block"
        />
        <main className="min-w-0 max-w-3xl flex-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{lead}</p>
          <div className="prose-hovera mt-10 flex flex-col gap-8">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function GuideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export function GuideCode({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-code-bg p-4 font-mono text-xs leading-relaxed text-code-foreground">
      {children}
    </pre>
  );
}
