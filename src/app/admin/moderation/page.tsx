"use client";

import { useCallback, useEffect, useState } from "react";
import SandboxPreview from "@/components/live/SandboxPreview";
import { useAuth } from "@/context/AuthContext";

interface PendingDrop {
  id: string;
  name: string;
  slug: string;
  category: string;
  source_code: string;
  maker_note: string;
  behavior_note: string;
  created_at: string;
  profiles: { github_username: string | null } | { github_username: string | null }[] | null;
}

interface Report {
  id: string;
  reason: string;
  created_at: string;
  drop_id: string;
  drops: { name: string; slug: string; status: string } | { name: string; slug: string; status: string }[] | null;
}

function authorOf(profiles: PendingDrop["profiles"]) {
  const p = Array.isArray(profiles) ? profiles[0] : profiles;
  return p?.github_username ?? "anonymous";
}

export default function ModerationPage() {
  const { user, profile, loading: authLoading, signInWithGitHub } = useAuth();
  const [pending, setPending] = useState<PendingDrop[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/queue");
    if (res.status === 403 || res.status === 401) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    const json = await res.json();
    setPending(json.pending ?? []);
    setReports(json.reports ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading && user) loadQueue();
  }, [authLoading, user, loadQueue]);

  async function moderate(id: string, action: "approve" | "reject") {
    await fetch(`/api/drops/${id}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setPending((prev) => prev.filter((d) => d.id !== id));
  }

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050507] text-center text-white">
        <h1 className="text-lg font-bold">Sign in required</h1>
        <button
          onClick={() => signInWithGitHub()}
          className="rounded-md border border-cyan-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  if (forbidden || (profile && profile.role !== "maintainer")) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-[#050507] text-center text-white">
        <h1 className="text-lg font-bold">Maintainer access required</h1>
        <p className="text-sm text-zinc-500">
          Ask an existing maintainer to set your profiles.role to &quot;maintainer&quot; in Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] px-6 py-10 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-lg font-bold text-white">Moderation queue</h1>

        <section className="mb-12">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Pending drops ({pending.length})
          </h2>
          {loading && <p className="text-sm text-zinc-500">Loading</p>}
          {!loading && pending.length === 0 && (
            <p className="text-sm text-zinc-500">Nothing waiting for review.</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {pending.map((drop) => (
              <div key={drop.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-3 flex h-40 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0d]">
                  <SandboxPreview
                    sourceCode={drop.source_code}
                    active
                    className="h-full w-full border-0"
                  />
                </div>
                <h3 className="text-sm font-semibold text-white">{drop.name}</h3>
                <p className="text-xs text-zinc-500">
                  @{authorOf(drop.profiles)} · {drop.category}
                </p>
                <p className="mt-2 text-xs text-zinc-400">{drop.maker_note}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => moderate(drop.id, "approve")}
                    className="rounded-md border border-cyan-500/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:bg-cyan-500/10"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => moderate(drop.id, "reject")}
                    className="rounded-md border border-rose-500/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Reports ({reports.length})
          </h2>
          {!loading && reports.length === 0 && (
            <p className="text-sm text-zinc-500">No reports filed.</p>
          )}
          <div className="space-y-2">
            {reports.map((report) => {
              const drop = Array.isArray(report.drops) ? report.drops[0] : report.drops;
              return (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-white">{drop?.name ?? "Unknown drop"}</p>
                    <p className="text-xs text-zinc-500">{report.reason}</p>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                    {drop?.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
