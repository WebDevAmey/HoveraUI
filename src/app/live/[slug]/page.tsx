import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import RemixLineageGraph, { type LineageNode } from "@/components/live/RemixLineageGraph";
import SandboxPreview from "@/components/live/SandboxPreview";

interface DropRow {
  id: string;
  name: string;
  slug: string;
  source_code: string;
  maker_note: string;
  behavior_note: string;
  remixed_from: string | null;
  copies_count: number;
  used_count: number;
  remix_count: number;
}

async function getAncestors(
  supabase: Awaited<ReturnType<typeof createClient>>,
  remixedFrom: string | null
): Promise<LineageNode[]> {
  const chain: LineageNode[] = [];
  let nextId = remixedFrom;

  // Lineage chains are short in practice (a handful of remix generations),
  // so a simple loop is clearer here than a recursive SQL query.
  while (nextId) {
    const { data } = await supabase
      .from("drops")
      .select("id, slug, name, source_code, remixed_from")
      .eq("id", nextId)
      .eq("status", "approved")
      .single();

    if (!data) break;
    chain.unshift({ id: data.id, slug: data.slug, name: data.name, sourceCode: data.source_code });
    nextId = data.remixed_from;
  }

  return chain;
}

export default async function DropPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  const { data: drop } = await supabase
    .from("drops")
    .select(
      "id, name, slug, source_code, maker_note, behavior_note, remixed_from, copies_count, used_count, remix_count"
    )
    .eq(isUuid ? "id" : "slug", slug)
    .eq("status", "approved")
    .single<DropRow>();

  if (!drop) {
    notFound();
  }

  const [ancestors, descendantsRes] = await Promise.all([
    getAncestors(supabase, drop.remixed_from),
    supabase
      .from("remixes")
      .select("drops!remixes_drop_id_fkey(id, slug, name, source_code, status)")
      .eq("parent_drop_id", drop.id),
  ]);

  const descendants: LineageNode[] = (descendantsRes.data ?? [])
    .map((row) => (Array.isArray(row.drops) ? row.drops[0] : row.drops))
    .filter((d): d is { id: string; slug: string; name: string; source_code: string; status: string } =>
      Boolean(d && d.status === "approved")
    )
    .map((d) => ({ id: d.id, slug: d.slug, name: d.name, sourceCode: d.source_code }));

  return (
    <div className="min-h-screen bg-[#050507] px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-2xl">
        <Link href="/live" className="text-xs text-zinc-500 hover:text-zinc-300">
          Back to feed
        </Link>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="flex h-72 items-center justify-center border-b border-white/10 bg-[#0a0a0d] p-6">
            <SandboxPreview sourceCode={drop.source_code} active className="h-full w-full border-0" />
          </div>
          <div className="p-5">
            <h1 className="text-lg font-bold text-white">{drop.name}</h1>
            <p className="mt-2 text-sm text-zinc-300">{drop.maker_note}</p>
            <p className="mt-1 text-xs font-mono uppercase tracking-wider text-zinc-500">
              {drop.behavior_note}
            </p>
            <div className="mt-4 flex gap-4 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              <span>{drop.copies_count} copies</span>
              <span>{drop.used_count} used</span>
              <span>{drop.remix_count} remixed</span>
            </div>
            <Link
              href={`/live/submit?remix=${drop.id}`}
              className="mt-4 inline-block rounded-md border border-cyan-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:bg-cyan-500/10"
            >
              Remix this
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <RemixLineageGraph
            ancestors={ancestors}
            current={{ id: drop.id, slug: drop.slug, name: drop.name, sourceCode: drop.source_code }}
            descendants={descendants}
          />
        </div>
      </div>
    </div>
  );
}
