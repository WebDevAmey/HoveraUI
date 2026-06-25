import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#050507] text-center text-white">
      <h1 className="text-xl font-bold">Sign in failed</h1>
      <p className="max-w-sm text-sm text-zinc-400">
        Something went wrong while signing you in with GitHub. Try again, and if it keeps
        happening, check that the GitHub OAuth app is configured correctly in Supabase.
      </p>
      <Link
        href="/live"
        className="rounded-md border border-cyan-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 transition-colors hover:bg-cyan-500/10"
      >
        Back to feed
      </Link>
    </div>
  );
}
