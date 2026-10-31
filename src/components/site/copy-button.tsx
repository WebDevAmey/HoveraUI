"use client";

import { useEffect, useState } from "react";

const icon = "absolute inset-0 m-auto transition-[opacity,transform,filter] duration-200 ease-[var(--hv-ease-out)] motion-reduce:transition-opacity";

/**
 * Copy with a morphing glyph: the copy icon blurs out as the check blurs in,
 * so the confirmation lands exactly where the eye already is.
 */
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
      aria-label={label}
      title={label}
      className="press relative grid size-8 place-items-center rounded-lg text-ink-2 transition-[color,background-color,transform] hover:bg-sunken hover:text-ink"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={`${icon} ${copied ? "scale-50 opacity-0 blur-[3px]" : "scale-100 opacity-100 blur-0"}`}
      >
        <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
        <path d="M10.5 3.5v-.25A1.25 1.25 0 0 0 9.25 2H3.75A1.25 1.25 0 0 0 2.5 3.25v5.5A1.25 1.25 0 0 0 3.75 10h.25" />
      </svg>
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${icon} text-ink ${copied ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[3px]"}`}
      >
        <path d="m3.5 8.5 3 3 6-7" />
      </svg>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
