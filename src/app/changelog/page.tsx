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
    <div className="mx-auto max-w-[880px] px-4 pb-28 pt-16 sm:px-6">
      <p className="label">Changelog</p>
      <h1 className="mt-3 text-[clamp(36px,6vw,60px)] font-normal leading-none tracking-[-0.02em]">
        <span className="font-serif">What changed, </span>
        <span className="font-serif italic">and why</span>
      </h1>
      <p className="mt-4 max-w-md text-ink-2">Releases, cuts and redesigns, newest first.</p>
      <div className="mt-16">
        <TimelineRail
          items={releases.map((r) => ({ date: formatDate(r.date), dateTime: r.date, title: r.title, body: r.body, tags: r.tags }))}
        />
      </div>
    </div>
  );
}
