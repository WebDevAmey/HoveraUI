import type { Metadata } from "next";
import { TimelineRail } from "@/components/ui/timeline-rail/timeline-rail";
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
      <h1 className="text-[clamp(32px,5vw,44px)] font-medium leading-[1.05] tracking-[-0.035em]">Changelog</h1>
      <p className="mt-3 text-[17px] text-ink-2">Releases, cuts and redesigns, newest first.</p>
      <h2 className="sr-only">Releases</h2>
      <div className="mt-12">
        <TimelineRail
          items={releases.map((r) => ({ date: formatDate(r.date), dateTime: r.date, title: r.title, body: r.body, tags: r.tags }))}
        />
      </div>
    </article>
  );
}
