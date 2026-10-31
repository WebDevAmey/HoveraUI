"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDeferredValue, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SidebarGroup } from "./nav";

const icons: Record<string, React.ReactNode> = {
  "Get started": <path d="M3 2.5h6l4 4v7H3zM9 2.5v4h4" />,
  Buttons: <rect x="2" y="5" width="12" height="6" rx="3" />,
  Cards: (
    <>
      <rect x="2.5" y="3.5" width="11" height="9" rx="2" />
      <path d="M2.5 9.5h11" />
    </>
  ),
  Effects: <path d="M8 2v3M8 11v3M2 8h3M11 8h3M3.8 3.8l2 2M10.2 10.2l2 2M3.8 12.2l2-2M10.2 5.8l2-2" />,
  Inputs: (
    <>
      <rect x="2" y="4.5" width="12" height="7" rx="1.5" />
      <path d="M5 6.5v3" />
    </>
  ),
  Navigation: <path d="M2.5 4h11M2.5 8h7M2.5 12h9" />,
  Feedback: <path d="M3 3.5h10v7H7l-3 2.5v-2.5H3z" />,
};

function GroupIcon({ title }: { title: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {icons[title]}
    </svg>
  );
}

/**
 * The docs sidebar. One highlight glides between items as you navigate, so the
 * eye follows where you went instead of re-finding the active row.
 */
export function DocsSidebar({ groups, filterable = true }: { groups: SidebarGroup[]; filterable?: boolean }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const visible = groups
    .map((group) => ({
      ...group,
      items: deferred ? group.items.filter((item) => item.label.toLowerCase().includes(deferred)) : group.items,
    }))
    .filter((group) => group.items.length > 0);

  // Position the highlight on the active row. The first placement is instant;
  // after that, transform transitions carry it to the next row.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!active) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.transform = `translateY(${active.offsetTop}px)`;
    pill.style.height = `${active.offsetHeight}px`;
    pill.style.opacity = "1";
    if (!pill.dataset.ready) {
      // Let the browser paint the start position before transitions turn on.
      requestAnimationFrame(() => {
        pill.dataset.ready = "true";
      });
    }
  }, [pathname, deferred]);

  // On first load, bring a deep-linked item into view inside the sidebar only.
  useEffect(() => {
    const nav = navRef.current;
    const scroller = nav?.closest<HTMLElement>("[data-sidebar-scroll]");
    const active = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!scroller || !active) return;
    const top = active.offsetTop;
    if (top > scroller.clientHeight - 80) scroller.scrollTop = top - scroller.clientHeight / 2;
    // Only on mount: later navigation keeps the user's own scroll position.
  }, []);

  // "/" jumps to the filter, the way most docs sites do.
  useEffect(() => {
    if (!filterable) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable=true]")) return;
      if (!inputRef.current?.offsetParent) return;
      event.preventDefault();
      inputRef.current.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filterable]);

  return (
    <div>
      {filterable && (
        <div className="relative mb-6">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setQuery("");
            }}
            placeholder="Filter"
            aria-label="Filter the sidebar"
            className="h-9 w-full rounded-lg border border-line bg-sunken/60 pl-8 pr-8 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-2 focus:border-line-strong focus:bg-raised [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 grid h-5 min-w-5 -translate-y-1/2 place-items-center rounded border border-line bg-raised px-1 font-sans text-[11px] text-ink-2">
            /
          </kbd>
        </div>
      )}

      <nav ref={navRef} aria-label="Sections" className="relative text-[13.5px]">
        <span
          ref={pillRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 rounded-lg bg-sunken opacity-0 ring-1 ring-line data-[ready]:transition-[transform,height] data-[ready]:duration-[220ms] data-[ready]:ease-[var(--hv-ease-in-out)] motion-reduce:!transition-none"
        />
        {visible.length === 0 && <p className="px-2.5 text-ink-2">No matches for “{query.trim()}”.</p>}
        {visible.map((group) => (
          <div key={group.title} className="mb-7 last:mb-0">
            <h2 className="mb-1.5 flex items-center gap-2 px-2.5 text-[12.5px] font-medium text-ink">
              <span className="text-ink-2">
                <GroupIcon title={group.title} />
              </span>
              {group.title}
              <span className="ml-auto text-[11.5px] font-normal tabular-nums text-ink-3">{group.items.length}</span>
            </h2>
            <ul>
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="relative flex items-center rounded-lg px-2.5 py-[7px] text-ink-2 transition-colors duration-150 hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
