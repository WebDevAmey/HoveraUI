"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SubmitForm from "@/components/live/SubmitForm";
import { useAuth } from "@/context/AuthContext";

interface RemixSource {
  id: string;
  name: string;
  sourceCode: string;
  category: string;
}

function SubmitPageContent() {
  const { user, loading, signInWithGitHub } = useAuth();
  const searchParams = useSearchParams();
  const remixId = searchParams.get("remix");
  const [remixOf, setRemixOf] = useState<RemixSource | undefined>(undefined);

  useEffect(() => {
    if (!remixId) return;
    fetch(`/api/drops/${remixId}/remix`)
      .then((res) => res.json())
      .then((json) => {
        if (json.drop) {
          setRemixOf({
            id: json.drop.id,
            name: json.drop.name,
            sourceCode: json.drop.source_code,
            category: json.drop.category,
          });
        }
      })
      .catch(() => {});
  }, [remixId]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050507] text-center text-white">
        <h1 className="text-lg font-bold">Sign in to submit a drop</h1>
        <button
          onClick={() => signInWithGitHub()}
          className="rounded-md border border-cyan-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 transition-colors hover:bg-cyan-500/10"
        >
          Sign in with GitHub
        </button>
        <Link href="/live" className="text-xs text-zinc-500 hover:text-zinc-300">
          Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-lg font-bold text-white">
            {remixOf ? `Remix ${remixOf.name}` : "Submit a drop"}
          </h1>
          <p className="text-xs text-zinc-500">
            Tell people what it does and why you built it, in your own voice.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">
        <SubmitForm remixOf={remixOf} />
      </main>
    </div>
  );
}

export default function SubmitPage() {
  return (
    <Suspense fallback={null}>
      <SubmitPageContent />
    </Suspense>
  );
}
