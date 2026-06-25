"use client";

import { usePreview } from "@/context/PreviewContext";
import { backgrounds } from "@/data/background";

export default function HomeShell({ children }: { children: React.ReactNode }) {
  const { activeSlug } = usePreview();
  const isBackgroundActive = activeSlug ? backgrounds.some((bg) => bg.slug === activeSlug) : false;

  return (
    <main
      className={`relative z-10 flex-1 overflow-y-auto text-foreground transition-colors duration-300 ${
        isBackgroundActive ? "bg-transparent" : "bg-background"
      }`}
    >
      {children}
    </main>
  );
}
