"use client";

import { useState } from "react";

interface CopyButtonProps {
  code: string;
  className?: string;
}

export default function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} className={className}>
      {copied ? "Copied!" : "Copy code"}
    </button>
  );
}
