"use client";

import { backgrounds } from "@/data/background";
import { usePreview } from "@/context/PreviewContext";
import CopyButton from "@/components/CopyButton";

export default function PreviewBackground() {
  const { activeSlug, setActiveSlug } = usePreview();

  const item = backgrounds.find((bg) => bg.slug === activeSlug);

  if (!item) {
    return null;
  }

  const Background = item.component;

  return (
    <div className="fixed inset-0 z-0">
      <Background />

      <div className="fixed top-6 left-6 z-50 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur">
        {item.name}
      </div>

      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <CopyButton
          code={item.code}
          className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
        />

        <button
          onClick={() => setActiveSlug(null)}
          className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          Close preview
        </button>
      </div>
    </div>
  );
}
