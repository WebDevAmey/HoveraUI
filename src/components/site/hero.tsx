import Link from "next/link";
import { registry } from "@/registry";
import { CopyButton } from "./copy-button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoveraui.vercel.app";

export function Hero() {
  const install = `npx shadcn@latest add ${siteUrl.replace(/^https?:\/\//, "")}/r/depth-key.json`;
  return (
    <section aria-labelledby="hero-title" className="px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
      <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
        <Link
          href="/docs/changelog"
          style={{ "--i": 0 } as React.CSSProperties}
          className="rise press inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1.5 pr-3.5 text-[13px] text-ink-2 transition-[color,border-color,transform] hover:border-line-strong hover:text-ink"
        >
          <span className="rounded-full bg-ink px-2 py-0.5 text-[11.5px] font-medium text-canvas">New</span>
          {registry.length} components, rebuilt docs
        </Link>
        <h1
          id="hero-title"
          style={{ "--i": 1 } as React.CSSProperties}
          className="rise display mt-8 text-[clamp(48px,8vw,96px)] leading-[0.98] tracking-[-0.035em]"
        >
          Components with one idea each.
        </h1>
        <p
          style={{ "--i": 2 } as React.CSSProperties}
          className="rise mt-7 max-w-[34rem] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]"
        >
          Original React pieces in glass, paper, pixels and gilt. Copy the source into your project and own every
          line, with no package to install.
        </p>
        <div style={{ "--i": 3 } as React.CSSProperties} className="rise mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/components/depth-key"
            className="press rounded-full bg-ink px-6 py-3 text-[14.5px] font-medium text-canvas transition-[opacity,transform] hover:opacity-90"
          >
            Browse components
          </Link>
          <Link
            href="/docs/introduction"
            className="press rounded-full border border-line-strong bg-surface px-6 py-3 text-[14.5px] text-ink transition-[background-color,transform] hover:bg-raised"
          >
            Read the docs
          </Link>
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
