import type { Metadata } from "next";
import { releases } from "@/content/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What changed in HoveraUI, newest first.",
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
}

export default function ChangelogPage() {
  return (
    <article className="max-w-[760px]">
      <h1 className="display text-[clamp(38px,5vw,52px)]">Changelog</h1>
      <p className="mt-4 text-[16.5px] text-ink-2">Releases, cuts and redesigns, newest first.</p>
      <h2 className="sr-only">Releases</h2>
      <ol className="mt-12 border-t border-line">
        {releases.map((r) => (
          <li key={r.date + r.title} className="grid gap-x-10 gap-y-2 border-b border-line py-8 sm:grid-cols-[132px_1fr]">
            <time dateTime={r.date} className="pt-1 font-mono text-[12px] tabular-nums text-ink-3">
              {formatDate(r.date)}
            </time>
            <div>
              <h3 className="text-[17px] font-medium tracking-[-0.015em]">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{r.body}</p>
              <p className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-full bg-sunken px-2 py-0.5 text-[11.5px] text-ink-2">
                    {t}
                  </span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
