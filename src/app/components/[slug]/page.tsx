import { redirect } from "next/navigation";

// Legacy route, fully superseded by /docs/[slug] (the shared ComponentDocLayout
// template). The canonical redirect lives in next.config.ts's redirects()
// (permanent 308, /components/:slug -> /docs/:slug) so this file is a defensive
// fallback only. Safe to delete this file and this directory once the
// next.config.ts redirect is confirmed working in production, this was kept
// instead of deleted because the sandboxed session used to build this migration
// could not run destructive filesystem commands (rm).
export default async function LegacyComponentDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/docs/${slug}`);
}
