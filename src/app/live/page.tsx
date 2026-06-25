"use client";

import Link from "next/link";
import FeedGrid from "@/components/live/FeedGrid";
import { useAuth } from "@/context/AuthContext";

export default function LivePage() {
  const { user, profile, loading, signInWithGitHub, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050507]/90 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">Hovera Live</h1>
            <p className="text-xs text-zinc-500">
              The community feed, every drop made by someone, not a doc page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!loading && user && (
              <Link
                href="/live/submit"
                className="rounded-md border border-cyan-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 transition-colors hover:bg-cyan-500/10"
              >
                Submit a drop
              </Link>
            )}

            {!loading && (
              user ? (
                <button
                  onClick={() => signOut()}
                  className="rounded-md border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
                >
                  @{profile?.githubUsername ?? "you"}, sign out
                </button>
              ) : (
                <button
                  onClick={() => signInWithGitHub()}
                  className="rounded-md border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-200 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
                >
                  Sign in with GitHub
                </button>
              )
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <FeedGrid />
      </main>
    </div>
  );
}
