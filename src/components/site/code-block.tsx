import { highlight, langFor, type Lang } from "@/lib/highlight";
import { CodeView } from "./code-view";
import { CopyButton } from "./copy-button";

/** A titled, highlighted snippet with a copy button. Long snippets fold to an excerpt. */
export async function CodeBlock({ code, title, lang }: { code: string; title?: string; lang?: Lang }) {
  const html = await highlight(code, lang ?? langFor(title));
  return (
    <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
      <div className="flex h-11 items-center justify-between border-b border-line pl-4 pr-1.5">
        <span className="font-mono text-[12px] text-ink-2">{title ?? "Code"}</span>
        <CopyButton text={code} label={`Copy ${title ?? "code"}`} />
      </div>
      <CodeView html={html} />
    </div>
  );
}
