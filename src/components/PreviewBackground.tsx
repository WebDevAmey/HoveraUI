"use client";

import { useState } from "react";
import { backgrounds } from "@/data/background";
import { usePreview } from "@/context/PreviewContext";
import CopyButton from "@/components/CopyButton";

export default function PreviewBackground() {
  const { activeSlug, setActiveSlug } = usePreview();
  const [showCode, setShowCode] = useState(false);

  const item = backgrounds.find((bg) => bg.slug === activeSlug);

  if (!item) return null;

  const close = () => {
    setActiveSlug(null);
    setShowCode(false);
  };

  const Background = item.component;

  return (
    <>
      {/* Background layer — sits behind the page content */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Background />
      </div>

      {/* Floating control pill */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-slide-up">
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-2 py-1.5 text-sm text-white shadow-2xl backdrop-blur-md">
          <span className="px-2 text-sm font-medium">{item.name}</span>

          <div className="mx-1 h-4 w-px bg-white/20" aria-hidden="true" />

          <button
            onClick={() => setShowCode((s) => !s)}
            className="rounded-full px-3 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-expanded={showCode}
          >
            {showCode ? "Hide code" : "Code"}
          </button>

          <CopyButton
            code={item.code}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          />

          <div className="mx-1 h-4 w-px bg-white/20" aria-hidden="true" />

          <button
            onClick={close}
            className="rounded-full px-3 py-1 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close preview"
          >
            ✕ Close
          </button>
        </div>
      </div>

      {/* Code panel — floats above the pill */}
      {showCode && (
        <div className="animate-slide-up fixed bottom-24 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 px-6">
          <div className="rounded-2xl border border-white/10 bg-black/80 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                JSX / Tailwind
              </span>
              <CopyButton
                code={item.code}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
              />
            </div>
            <pre className="max-h-52 overflow-auto font-mono text-[13px] leading-relaxed text-green-300">
              <code>{item.code}</code>
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
