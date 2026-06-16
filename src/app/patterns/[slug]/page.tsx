import { backgrounds } from "@/data/background";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export async function generateStaticParams() {
  return backgrounds.map((bg) => ({ slug: bg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = backgrounds.find((bg) => bg.slug === slug);
  if (!item) return { title: "Not Found" };
  return {
    title: item.name,
    description: `Preview the ${item.name} background — production-ready CSS/Tailwind code, copy and use instantly.`,
    openGraph: {
      title: `${item.name} | BackLab`,
      description: `${item.name} — a production-ready CSS background pattern.`,
      type: "website",
    },
  };
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = backgrounds.find((bg) => bg.slug === slug);

  if (!item) {
    notFound();
  }

  const Background = item.component;

  return (
    <div className="relative min-h-screen bg-zinc-950">
      <Background />

      {/* Top-left: back + name */}
      <div className="fixed left-6 top-6 z-50 flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
          aria-label="Back to home"
        >
          ← Back
        </Link>
        <span className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur">
          {item.name}
        </span>
      </div>

      {/* Top-right: copy */}
      <div className="fixed right-6 top-6 z-50">
        <CopyButton
          code={item.code}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
        />
      </div>

      {/* Code panel at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/85 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              JSX / Tailwind
            </span>
            <CopyButton
              code={item.code}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
            />
          </div>
          <pre
            className="max-h-52 overflow-x-auto overflow-y-auto font-mono text-[13px] leading-relaxed text-green-300"
            aria-label="Source code"
          >
            <code>{item.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
