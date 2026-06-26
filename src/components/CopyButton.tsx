"use client";

import { useState } from "react";
import { showToast } from "@/components/Toast";

interface CopyButtonProps {
  code: string;
  className?: string;
  label?: string;
  tabIndex?: number;
}

export default function CopyButton({
  code,
  className,
  label = "Copy code",
  tabIndex,
}: CopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      showToast("Copied to clipboard!");
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 1600);
    } catch {
      showToast("Failed to copy, please copy it manually.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      aria-label={`${label} to clipboard`}
      tabIndex={tabIndex}
    >
      {status === "copied" ? (
        <svg
          width="13"
          height="13"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 7l3.5 3.5L12 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {status === "copied" ? "Copied" : label}
      <span className="sr-only" role="status" aria-live="polite">
        {status === "copied" ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
