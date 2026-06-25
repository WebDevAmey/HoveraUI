"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FeedCard from "@/components/live/FeedCard";
import type { DropItem } from "@/types";

interface ProfileJoin {
  github_username: string | null;
  avatar_url: string | null;
}

interface DropRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  tags: string[];
  source_code: string;
  maker_note: string;
  behavior_note: string;
  status: "pending" | "approved" | "rejected";
  remixed_from: string | null;
  copies_count: number;
  used_count: number;
  remix_count: number;
  created_at: string;
  author_id: string;
  profiles: ProfileJoin | ProfileJoin[] | null;
}

function toDropItem(row: DropRow): DropItem {
  const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    tags: row.tags,
    sourceCode: row.source_code,
    makerNote: row.maker_note,
    behaviorNote: row.behavior_note,
    status: row.status,
    authorId: row.author_id,
    authorHandle: profile?.github_username ?? "anonymous",
    authorAvatarUrl: profile?.avatar_url ?? null,
    remixedFrom: row.remixed_from,
    copiesCount: row.copies_count,
    usedCount: row.used_count,
    remixCount: row.remix_count,
    createdAt: row.created_at,
  };
}

export default function FeedGrid() {
  const [drops, setDrops] = useState<DropItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadPage = useCallback(async (nextPage: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/drops?page=${nextPage}`);
      const json = await res.json();
      const newDrops: DropItem[] = (json.drops ?? []).map(toDropItem);
      setDrops((prev) => (nextPage === 0 ? newDrops : [...prev, ...newDrops]));
      setHasMore(Boolean(json.hasMore));
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing state from the drops API, an external system
    loadPage(0);
  }, [loadPage]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          loadPage(page + 1);
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, page, loadPage]);

  if (drops.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm text-zinc-500">No drops yet. Be the first to submit one.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {drops.map((drop) => (
          <FeedCard key={drop.id} drop={drop} />
        ))}
      </div>
      <div ref={sentinelRef} className="h-1" aria-hidden="true" />
      {loading && (
        <p className="py-8 text-center text-xs font-mono uppercase tracking-wider text-zinc-500">
          Loading more drops
        </p>
      )}
    </div>
  );
}
