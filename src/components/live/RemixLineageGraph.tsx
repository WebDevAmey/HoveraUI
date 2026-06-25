"use client";

import { useState } from "react";
import Link from "next/link";
import SandboxPreview from "@/components/live/SandboxPreview";

export interface LineageNode {
  id: string;
  slug: string;
  name: string;
  sourceCode: string;
}

interface RemixLineageGraphProps {
  ancestors: LineageNode[];
  current: LineageNode;
  descendants: LineageNode[];
}

function Node({ node, isCurrent }: { node: LineageNode; isCurrent?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={isCurrent ? "#" : `/live/${node.slug}`}
        className={`block whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
          isCurrent
            ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-400"
            : "border-white/10 text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-400"
        }`}
      >
        {node.name}
      </Link>

      {hovered && (
        <div className="absolute left-1/2 top-full z-30 mt-2 w-48 -translate-x-1/2 rounded-lg border border-white/10 bg-[#0a0a0d] p-2 shadow-xl">
          <SandboxPreview
            sourceCode={node.sourceCode}
            active={hovered}
            className="h-24 w-full rounded border-0"
          />
        </div>
      )}
    </div>
  );
}

export default function RemixLineageGraph({ ancestors, current, descendants }: RemixLineageGraphProps) {
  if (ancestors.length === 0 && descendants.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Remix lineage
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {ancestors.map((node) => (
          <div key={node.id} className="flex items-center gap-2">
            <Node node={node} />
            <span aria-hidden="true" className="text-zinc-600">
              {">"}
            </span>
          </div>
        ))}

        <Node node={current} isCurrent />

        {descendants.length > 0 && (
          <span aria-hidden="true" className="text-zinc-600">
            {">"}
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {descendants.map((node) => (
            <Node key={node.id} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}
