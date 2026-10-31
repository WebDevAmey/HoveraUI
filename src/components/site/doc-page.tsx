import type { ReactNode } from "react";

export function DocPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <article className="max-w-[720px]">
      <h1 className="display text-[clamp(40px,5.4vw,56px)]">{title}</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{lead}</p>
      <div className="prose-docs mt-8">{children}</div>
    </article>
  );
}
