import { CopyButton } from "./copy-button";

export function CodeBlock({ code, title, maxHeight }: { code: string; title?: string; maxHeight?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex h-10 items-center justify-between border-b border-line pl-4 pr-1.5">
        <span className="font-mono text-[11px] text-ink-2">{title ?? "Code"}</span>
        <CopyButton text={code} />
      </div>
      <pre
        tabIndex={0}
        className="overflow-auto p-4 font-mono text-[12.5px] leading-[1.7] text-ink"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
