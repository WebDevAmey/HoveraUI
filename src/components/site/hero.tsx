import Link from "next/link";
import { registry } from "@/registry";
import { CopyButton } from "./copy-button";
import { SearchTrigger } from "./search-trigger";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoveraui.vercel.app";

export function Hero() {
  const install = `npx shadcn@latest add ${siteUrl.replace(/^https?:\/\//, "")}/r/depth-key.json`;
  return (
    <section aria-labelledby="hero-title" className="px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
        <Link
          href="/docs/changelog"
          style={{ "--i": 0 } as React.CSSProperties}
          className="rise press inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1.5 pr-3.5 text-[13px] text-ink-2 transition-[color,border-color,transform] hover:border-line-strong hover:text-ink"
        >
          <span className="rounded-full bg-ink px-2 py-0.5 text-[11.5px] font-medium text-canvas">New</span>
          Four new accordions, {registry.length} components in all
        </Link>
        <h1
          id="hero-title"
          style={{ "--i": 1 } as React.CSSProperties}
          className="rise display mt-8 text-[clamp(48px,8vw,96px)] leading-[0.98] tracking-[-0.035em]"
        >
          Components, made with care.
        </h1>
        <p
          style={{ "--i": 2 } as React.CSSProperties}
          className="rise mt-7 max-w-[34rem] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]"
        >
          A small, curated library of React components. Each one is finished down to its motion and keyboard
          behaviour, and ships as source you own.
        </p>
        <div style={{ "--i": 3 } as React.CSSProperties} className="rise mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/components"
            className="press rounded-full bg-ink px-6 py-3 text-[14.5px] font-medium text-canvas transition-[opacity,transform] hover:opacity-90"
          >
            Browse components
          </Link>
          <SearchTrigger label="Search components" className="h-[46px] w-[260px] rounded-full pl-5 pr-3 text-[14.5px]" />
        </div>
        <div
          style={{ "--i": 4 } as React.CSSProperties}
          className="rise mt-8 flex max-w-full items-center gap-3 rounded-full border border-line bg-surface py-1 pl-4 pr-1"
        >
          <code className="truncate font-mono text-[12.5px] text-ink-2">
            <span className="select-none text-ink-3">$ </span>
            {install}
          </code>
          <CopyButton text={install} label="Copy install command" />
        </div>
      </div>
    </section>
  );
}
