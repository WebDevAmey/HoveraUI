import Link from "next/link";
import { docEntries } from "@/data/docs";
import RevealSection from "@/components/docs/RevealSection";

const STORY_SLUGS = ["x-ray-scanner-button", "chamber-door-button", "meteors"];

export default function StoryStrip() {
  const entries = STORY_SLUGS
    .map((slug) => docEntries.find((e) => e.slug === slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e) && Boolean(e?.story));

  if (entries.length === 0) return null;

  return (
    <RevealSection id="story" className="border-b border-border bg-secondary/10 px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Built with intent, not just markup</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Every component in Hovera UI ships with a note on what its hover state is meant to say.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {entries.map((entry) => (
            <Link key={entry.slug} href={`/components/${entry.slug}`} className="group block">
              <p className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-hovera">
                {entry.name}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.story}</p>
            </Link>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
