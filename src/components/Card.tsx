"use client";

import { usePreview } from "@/context/PreviewContext";
import { useApp } from "@/context/AppContext";
import CopyButton from "@/components/CopyButton";

interface CardProps {
  title: string;
  slug: string;
  code: string;
  category: string;
  stagger: number;
  children: React.ReactNode;
}

export default function Card({ title, slug, code, category, stagger, children }: CardProps) {
  const { setActiveSlug } = usePreview();
  const { toggleFavorite, isFavorite } = useApp();
  const favorited = isFavorite(slug);

  return (
    <article
      className="animate-fade-up group overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-foreground/30"
      style={{ "--stagger": `${stagger * 55}ms` } as React.CSSProperties}
      aria-label={`${title} pattern`}
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        {children}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center gap-2 pb-4 opacity-0 transition-all duration-200 group-hover:bg-black/50 group-hover:opacity-100"
          aria-hidden="true"
        >
          <button
            onClick={() => setActiveSlug(slug)}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:bg-zinc-100 active:scale-95"
            tabIndex={-1}
          >
            Preview
          </button>
          <CopyButton
            code={code}
            className="flex items-center gap-1.5 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-transform hover:bg-black/70 active:scale-95"
            tabIndex={-1}
          />
          <CopyButton
            code={`npx shadcn add @hovera/${slug}`}
            label="Copy CLI"
            className="flex items-center gap-1.5 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-transform hover:bg-black/70 active:scale-95"
            tabIndex={-1}
          />
        </div>

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(slug)}
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border bg-black/50 backdrop-blur transition-all duration-200 ${
            favorited
              ? "border-rose-500/60 text-rose-400 opacity-100"
              : "border-white/20 text-white/60 opacity-0 group-hover:opacity-100 hover:border-rose-400/50 hover:text-rose-400"
          }`}
          aria-label={favorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          aria-pressed={favorited}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill={favorited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium capitalize text-muted-foreground">
            {category}
          </span>
          <button
            onClick={() => setActiveSlug(slug)}
            className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={`Preview ${title}`}
          >
            Preview
          </button>
        </div>
      </div>
    </article>
  );
}
