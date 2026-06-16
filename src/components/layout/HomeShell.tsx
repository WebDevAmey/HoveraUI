"use client";

import { usePreview } from "@/context/PreviewContext";

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const { activeSlug } = usePreview();

  return (
    <main
      className={`relative z-10 min-h-screen text-zinc-900 transition-colors duration-300 dark:text-zinc-50 ${
        activeSlug ? "bg-transparent" : "bg-zinc-50 dark:bg-zinc-950"
      }`}
    >
      {children}
    </main>
  );
}
