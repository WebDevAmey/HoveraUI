import { highlight, langFor, type Lang } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export async function CodeBlock({ code, title, lang }: { code: string; title?: string; lang?: Lang }) {
  const html = await highlight(code, lang ?? langFor(title));
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex h-11 items-center justify-between border-b border-line pl-4 pr-1.5">
        <span className="text-[12.5px] text-ink-2">{title ?? "Code"}</span>
        <CopyButton text={code} label={`Copy ${title ?? "code"}`} />
      </div>
      <div tabIndex={0} className="code-scroll overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
