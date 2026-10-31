import Link from "next/link";
import { Faq } from "@/components/site/faq";
import { Gallery } from "@/components/site/gallery";
import { Hero } from "@/components/site/hero";
import { Tile } from "@/components/site/tile";
import { getEntry } from "@/registry";

const featured: { slug: string; className: string }[] = [
  { slug: "glass-specimen", className: "md:col-span-4 md:row-span-2" },
  { slug: "depth-key", className: "md:col-span-2" },
  { slug: "led-meter", className: "md:col-span-2" },
  { slug: "dither-image", className: "md:col-span-2" },
  { slug: "gilded-frame", className: "md:col-span-2" },
  { slug: "sliding-segment", className: "md:col-span-2" },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="featured-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label">01 · Selected</p>
            <h2 id="featured-title" className="mt-3 max-w-md text-[clamp(26px,3.4vw,36px)] font-medium leading-[1.1] tracking-[-0.03em]">
              Six materials, <span className="font-serif text-[1.12em] font-normal italic tracking-[-0.01em]">one standard</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink-2">
            Glass that refracts, keys that travel, ink that dithers. Each piece is interactive right here.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:auto-rows-[minmax(300px,auto)] md:grid-cols-6">
          {featured.map(({ slug, className }) => {
            const entry = getEntry(slug);
            return entry ? <Tile key={slug} meta={entry.meta} Demo={entry.Demo} className={className} /> : null;
          })}
        </div>
      </section>

      <section aria-labelledby="index-title" className="border-t border-line bg-surface/50">
        <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label">02 · Index</p>
              <h2 id="index-title" className="mt-3 text-[clamp(26px,3.4vw,36px)] font-medium leading-[1.1] tracking-[-0.03em]">
                Everything, live
              </h2>
            </div>
            <Link href="/docs#components" className="text-[13px] text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">
              Open the full index
            </Link>
          </div>
          <Gallery />
        </div>
      </section>

      <Faq />
    </>
  );
}
