"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Option = { id: string; label: string; count: number };

/**
 * Category pills over the component grid. Choosing one hides the other sections in place
 * (the live demos stay mounted), and the choice lives in the URL hash so links can point at it.
 */
export function CategoryFilter({ options, children }: { options: Option[]; children: ReactNode }) {
  const [active, setActive] = useState("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const total = options.reduce((sum, option) => sum + option.count, 0);
  const all: Option[] = [{ id: "all", label: "All", count: total }, ...options];

  // Follow #cat-<id> links from the navbar, on load and while on the page.
  useEffect(() => {
    const read = () => {
      const id = window.location.hash.replace(/^#cat-/, "");
      setActive(options.some((option) => option.id === id) ? id : "all");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [options]);

  useLayoutEffect(() => {
    for (const section of gridRef.current?.querySelectorAll<HTMLElement>("[data-cat]") ?? []) {
      section.hidden = active !== "all" && section.dataset.cat !== active;
    }
    const thumb = thumbRef.current;
    const pill = rowRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!thumb || !pill) return;
    thumb.style.width = `${pill.offsetWidth}px`;
    thumb.style.transform = `translateX(${pill.offsetLeft}px)`;
    if (!thumb.dataset.ready) {
      requestAnimationFrame(() => {
        thumb.dataset.ready = "true";
      });
    }
  }, [active]);

  const choose = (id: string) => {
    setActive(id);
    const url = id === "all" ? window.location.pathname : `#cat-${id}`;
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      <div className="sticky top-[76px] z-10 -mx-2 mb-2 bg-raised px-2 py-3">
        <div
          ref={rowRef}
          role="group"
          aria-label="Filter by category"
          className="relative flex gap-1 overflow-x-auto [scrollbar-width:none]"
        >
          <span
            ref={thumbRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 rounded-full bg-ink data-[ready]:transition-[transform,width] data-[ready]:duration-[260ms] data-[ready]:ease-[var(--hv-ease-out)] motion-reduce:!transition-none"
          />
          {all.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={active === option.id}
              onClick={() => choose(option.id)}
              className="relative flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] text-ink-2 ring-1 ring-inset ring-line transition-[color,box-shadow] duration-200 hover:text-ink aria-pressed:text-raised aria-pressed:ring-transparent"
            >
              {option.label}
              <span className="text-[11.5px] tabular-nums opacity-60">{option.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div ref={gridRef}>{children}</div>
    </>
  );
}
