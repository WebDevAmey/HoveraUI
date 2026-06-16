"use client";

import { useEffect, useState } from "react";
import { backgrounds } from "@/data/background";
import { usePreview } from "@/context/PreviewContext";
import CopyButton from "@/components/CopyButton";

export default function PreviewBackground() {
  const { activeSlug, setActiveSlug } = usePreview();
  const [showCode, setShowCode] = useState(false);

  const item = backgrounds.find((bg) => bg.slug === activeSlug);

  useEffect(() => {
    if (!item) setShowCode(false);
  }, [item]);

  if (!item) return null;

  const Background = item.component;

  return (
    <div
      className="fixed inset-0 z-0"
      role="dialog"
      aria-modal="true"
      aria-label={`Full-screen preview: ${item.name}`}
    >
      <Background />

      {/* Top-left: name + category badge */}
      <div className="fixed left-6 top-6 z-50 flex items-center gap-2">
        <span className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur">
          {item.name}
        </span>
        <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs capitalize text-white/60 backdrop-blur">
          {item.category}
        </span>
      </div>

      {/* Top-right: actions */}
      <div className="fixed right-6 top-6 z-50 flex gap-2">
        <button
          onClick={() => setShowCode((s) => !s)}
          className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
          aria-expanded={showCode}
          aria-controls="preview-code-panel"
        >
          {showCode ? "Hide code" : "Show code"}
        </button>
        <CopyButton
          code={item.code}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
        />
        <button
          onClick={() => setActiveSlug(null)}
          className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-black/70"
          aria-label="Close preview"
        >
          ✕ Close
        </button>
      </div>

      {/* Code panel */}
      {showCode && (
        <div
          id="preview-code-panel"
          className="animate-slide-up fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/85 backdrop-blur-md"
        >
          <div className="mx-auto max-w-4xl px-6 py-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                JSX / Tailwind
              </span>
              <CopyButton
                code={item.code}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
              />
            </div>
            <pre
              className="max-h-52 overflow-x-auto overflow-y-auto font-mono text-[13px] leading-relaxed text-green-300"
              aria-label="Pattern source code"
            >
              <code>{item.code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
