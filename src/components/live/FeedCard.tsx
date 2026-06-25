"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SandboxPreview from "@/components/live/SandboxPreview";
import ReportButton from "@/components/live/ReportButton";
import { useApp } from "@/context/AppContext";
import type { DropItem } from "@/types";

interface FeedCardProps {
  drop: DropItem;
}

function track(dropId: string, signal: "copy" | "use") {
  fetch(`/api/drops/${dropId}/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ signal }),
  }).catch(() => {});
}

export default function FeedCard({ drop }: FeedCardProps) {
  const { toggleFavorite, isFavorite } = useApp();
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const articleRef = useRef<HTMLDivElement>(null);
  const saved = isFavorite(drop.slug);

  useEffect(() => {
    const el = articleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleCopy() {
    navigator.clipboard.writeText(drop.sourceCode);
    track(drop.id, "copy");
  }

  function handleCopyCli() {
    navigator.clipboard.writeText(`npx shadcn@latest add @hovera/${drop.slug}`);
    track(drop.id, "use");
  }

  return (
    <article
      ref={articleRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 motion-reduce:transition-none ${
        hovered ? "-translate-y-1 border-cyan-500/30 shadow-[0_20px_60px_-20px_rgba(34,211,238,0.25)]" : ""
      }`}
      aria-label={`${drop.name} drop`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 motion-reduce:hidden group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(34,211,238,0.12), transparent 60%)`,
        }}
      />

      <div className="relative flex h-64 items-center justify-center overflow-hidden border-b border-white/10 bg-[#0a0a0d] p-6">
        <SandboxPreview
          sourceCode={drop.sourceCode}
          active={inView}
          className="h-full w-full border-0"
        />
        {drop.remixedFrom && (
          <Link
            href={`/live/${drop.remixedFrom}`}
            className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 backdrop-blur transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
          >
            remixed
          </Link>
        )}
      </div>

      <div className="p-4">
        <p className="text-sm leading-relaxed text-zinc-300">{drop.makerNote}</p>
        <p className="mt-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
          {drop.behaviorNote}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {drop.authorAvatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- external GitHub avatar, no next/image domain config for this yet
              <img
                src={drop.authorAvatarUrl}
                alt=""
                className="h-6 w-6 rounded-full border border-white/10"
              />
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-zinc-400">
                {drop.authorHandle.slice(0, 1).toUpperCase()}
              </span>
            )}
            <span className="text-xs text-zinc-400">@{drop.authorHandle}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            <span>{drop.copiesCount} copies</span>
            <span>{drop.usedCount} used</span>
            <span>{drop.remixCount} remixed</span>
          </div>
        </div>

        <div
          className={`mt-4 flex items-center gap-2 overflow-hidden transition-all duration-200 motion-reduce:max-h-none motion-reduce:opacity-100 ${
            hovered ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <button
            onClick={handleCopy}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
          >
            Copy
          </button>
          <button
            onClick={handleCopyCli}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
          >
            Copy CLI
          </button>
          <Link
            href={`/live/${drop.id}`}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
          >
            View
          </Link>
          <Link
            href={`/live/submit?remix=${drop.id}`}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
          >
            Remix
          </Link>
          <button
            onClick={() => toggleFavorite(drop.slug)}
            aria-pressed={saved}
            className={`ml-auto rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              saved
                ? "border-cyan-500/40 text-cyan-400"
                : "border-white/10 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-400"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
          <ReportButton dropId={drop.id} />
        </div>
      </div>
    </article>
  );
}
