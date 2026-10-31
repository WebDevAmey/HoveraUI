import Link from "next/link";
import { DitherField } from "@/components/ui/dither-field/dither-field";
import OrbitDemo from "@/components/ui/orbit-gallery/demo";
import { registry } from "@/registry";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div className="mx-auto flex max-w-[1240px] justify-between px-4 pt-6 font-mono text-[11px] text-ink-2 sm:px-6">
        <span>Index of {registry.length} components</span>
        <span className="hidden sm:inline">React · CSS · no runtime dependencies</span>
        <span>Edition 01</span>
      </div>

      <div className="mx-auto grid min-h-[min(760px,calc(100dvh-8rem))] max-w-[1240px] items-center gap-8 px-4 pb-40 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-4">
        <div className="max-w-xl">
          <p className="label">HoveraUI</p>
          <h1
            id="hero-title"
            className="mt-5 text-[clamp(42px,6.4vw,80px)] font-medium leading-[0.98] tracking-[-0.045em]"
          >
            Components with{" "}
            <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">one idea</span> each.
          </h1>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-2">
            Original React pieces in pixel, glass, paper, gilt and light. Copy the source into your project. There is
            nothing to install and nothing to keep updated.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/components"
              className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-opacity hover:opacity-85"
            >
              Browse the index
            </Link>
            <Link
              href="/docs"
              className="rounded-full border border-line-strong px-5 py-2.5 text-[14px] text-ink transition-colors hover:bg-sunken"
            >
              Read the guide
            </Link>
          </div>
        </div>
        <div className="grid min-h-[420px] place-items-center">
          <OrbitDemo />
        </div>
      </div>

      {/* A dithered horizon: the one live texture on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 [mask-image:linear-gradient(to_bottom,transparent,black_70%)]"
      >
        <DitherField className="size-full" pixelSize={3} speed={0.6} />
      </div>
    </section>
  );
}
