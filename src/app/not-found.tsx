import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
      <p className="text-6xl font-bold text-zinc-800" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-white">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-100"
      >
        ← Back to home
      </Link>
    </div>
  );
}
