"use client";

import { usePreview } from "@/context/PreviewContext";

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const { activeSlug } = usePreview();

  return (
    <main
      className={`relative z-10 min-h-screen text-white transition-colors ${
        activeSlug ? "bg-black/60 backdrop-blur-sm" : "bg-black"
      }`}
    >
      {children}
    </main>
  );
}
