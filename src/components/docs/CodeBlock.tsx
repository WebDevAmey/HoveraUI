"use client";

import CopyButton from "@/components/CopyButton";

interface CodeBlockProps {
  code: string;
  filename?: string;
  lineNumbers?: boolean;
  className?: string;
}

export default function CodeBlock({ code, filename, lineNumbers = true, className }: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div className={`overflow-hidden rounded-[var(--doc-radius)] border border-border bg-code-bg ${className ?? ""}`}>
      {filename && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
          <CopyButton
            code={code}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          />
        </div>
      )}
      {!filename && (
        <div className="flex justify-end border-b border-border px-2 py-1">
          <CopyButton
            code={code}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          />
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-code-foreground">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {lineNumbers && (
                <span className="mr-4 inline-block w-5 shrink-0 select-none text-right text-muted-foreground/50">
                  {i + 1}
                </span>
              )}
              <span className="whitespace-pre">{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
