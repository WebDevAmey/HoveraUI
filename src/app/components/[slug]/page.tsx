import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { docEntries, findDocEntry } from "@/data/docs";
import ComponentDocLayout from "@/components/docs/ComponentDocLayout";

export async function generateStaticParams() {
  return docEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = findDocEntry(slug);
  if (!entry) return { title: "Not Found" };
  return {
    title: entry.name,
    description: entry.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = findDocEntry(slug);

  if (!entry) {
    notFound();
  }

  return <ComponentDocLayout slug={slug} />;
}
