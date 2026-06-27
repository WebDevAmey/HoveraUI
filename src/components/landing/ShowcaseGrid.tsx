"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { docEntries } from "@/data/docs";
import CursorGlowCard from "@/components/CursorGlowCard";
import LazyMount from "@/components/LazyMount";
import RevealSection from "@/components/docs/RevealSection";

const FEATURED_SLUGS = [
  "glow-button",
  "liquid-fill-button",
  "radial-bloom-button",
  "x-ray-scanner-button",
  "chamber-door-button",
  "aurora",
  "conic-swirl",
  "mercury-loader",
];

export default function ShowcaseGrid() {
  const router = useRouter();
  const entries = FEATURED_SLUGS
    .map((slug) => docEntries.find((e) => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <RevealSection id="showcase" className="border-b border-border px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">A few favorites</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Hover any card. Click through for the live preview, the code, and the install command.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => {
            const Preview = entry.Preview;
            return (
              <CursorGlowCard key={entry.slug}>
                {/* Not a <Link>: some previews (e.g. navbar demos) render their own
                    <a> tags, and nesting an anchor inside an anchor is invalid HTML. */}
                <div
                  role="link"
                  tabIndex={0}
                  onClick={() => router.push(`/docs/${entry.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(`/docs/${entry.slug}`);
                  }}
                  className="block cursor-pointer"
                >
                  <LazyMount
                    className={`flex h-36 items-center justify-center overflow-hidden p-5 ${
                      entry.needsLightPreview ? "bg-white" : "bg-secondary/20"
                    }`}
                  >
                    <Preview />
                  </LazyMount>
                </div>
                <div className="border-t border-border px-4 py-3">
                  <Link href={`/docs/${entry.slug}`}>
                    <h3 className="truncate text-sm font-medium tracking-tight text-foreground hover:underline">
                      {entry.name}
                    </h3>
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">{entry.category}</p>
                </div>
              </CursorGlowCard>
            );
          })}
        </div>
      </div>
    </RevealSection>
  );
}
