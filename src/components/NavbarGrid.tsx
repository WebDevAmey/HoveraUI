"use client";

import { navbars } from "@/data/navbar";
import { useApp } from "@/context/AppContext";
import NavbarCard from "@/components/NavbarCard";

export default function NavbarGrid() {
  const { category, searchQuery } = useApp();

  if (category !== "all" && category !== "navbars") return null;

  const filtered = navbars.filter((navbar) =>
    navbar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
        Navbars
      </h2>
      <p className="mb-5 text-xs text-zinc-500" aria-live="polite" aria-atomic="true">
        {filtered.length} navbar{filtered.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 gap-5">
        {filtered.map((item, i) => (
          <NavbarCard key={item.slug} {...item} stagger={i} />
        ))}
      </div>
    </div>
  );
}
