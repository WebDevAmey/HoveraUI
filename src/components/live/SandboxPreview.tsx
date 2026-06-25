"use client";

import { useMemo } from "react";
import { buildSandboxSrcDoc } from "@/lib/sandbox";

interface SandboxPreviewProps {
  sourceCode: string;
  active: boolean;
  className?: string;
}

/**
 * Renders untrusted drop source code inside a sandboxed iframe. The sandbox
 * attribute intentionally excludes allow-same-origin: with allow-scripts
 * alone, the iframe document is forced into a unique opaque origin, so
 * scripts inside it cannot read this page's cookies, DOM, or parent window
 * regardless of which host actually served the iframe.
 *
 * `active` gates whether the iframe mounts at all, so off-screen drops in
 * the feed are not running their scripts, and the iframe unmounts again once
 * it scrolls back out of view.
 */
export default function SandboxPreview({ sourceCode, active, className }: SandboxPreviewProps) {
  const srcDoc = useMemo(() => buildSandboxSrcDoc(sourceCode), [sourceCode]);

  if (!active) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <iframe
      title="Drop preview"
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      className={className}
      loading="lazy"
    />
  );
}
