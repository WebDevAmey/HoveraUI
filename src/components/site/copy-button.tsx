"use client";

import { useEffect, useState } from "react";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {}
      }}
      className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line bg-raised px-3 font-mono text-[11px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
    >
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
