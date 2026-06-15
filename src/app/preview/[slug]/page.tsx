import { backgrounds } from "@/data/background";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return backgrounds.map((item) => ({ slug: item.slug }));
}

export default async function PreviewPage({
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
    <div className="relative">
      <Background />

      <Link
        href="/"
        className="fixed top-6 left-6 z-50 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
      >
        ← Back
      </Link>

      <div className="fixed top-6 right-6 z-50 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
        {item.name}
      </div>
    </div>
  );
}
