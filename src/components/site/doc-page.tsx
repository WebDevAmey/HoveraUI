import type { ReactNode } from "react";

export function DocPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <article className="max-w-[720px]">
      <h1 className="text-[clamp(32px,5vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h1>
      <p className="mt-3 text-[17px] text-ink-2">{lead}</p>
      <div className="prose-docs mt-8">{children}</div>
    </article>
  );
}
