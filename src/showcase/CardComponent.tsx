"use client";

import { usePreview } from "@/context/PreviewContext";
import CopyButton from "@/components/CopyButton";

interface CardProps {
  title: string;
  slug: string;
  code: string;
  children: React.ReactNode;
}

export default function ComponentCard({ title, slug, code, children }: CardProps) {
  const { setActiveSlug } = usePreview();

  return (
    <div className="group rounded-2xl border border-zinc-800 overflow-hidden">

      <div className="h-72 relative overflow-hidden">
        {children}

        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:bg-black/50">
          <button
            onClick={() => setActiveSlug(slug)}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Preview
          </button>

          <CopyButton
            code={code}
            className="rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-black/60"
          />
        </div>
      </div>

      <div className="p-4">
        <h3>{title}</h3>
      </div>

    </div>
  );
}
