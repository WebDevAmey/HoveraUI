"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useLayoutEffect, useRef, useState } from "react";
import { github, type SidebarGroup } from "./nav";

const stroke = {
  width: 14,
  height: 14,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const groupIcons: Record<string, React.ReactNode> = {
  "Get started": <path d="M3 2.5h6l4 4v7H3zM9 2.5v4h4" />,
  Essentials: <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" />,
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

/** Guides get a glyph each, the way the docs index reads like a table of contents. */
const itemIcons: Record<string, React.ReactNode> = {
  "/docs/introduction": <path d="M8 3.5c-1.6-1-3.6-1.2-5.5-.8v9.6c1.9-.4 3.9-.2 5.5.8 1.6-1 3.6-1.2 5.5-.8V2.7c-1.9-.4-3.9-.2-5.5.8zM8 3.5v9.6" />,
  "/docs/installation": <path d="M8 2.5v7.5M4.8 7 8 10.2 11.2 7M3 13.5h10" />,
  "/docs/tokens": (
    <>
      <circle cx="5.5" cy="5.5" r="2.5" />
      <circle cx="10.5" cy="10.5" r="2.5" />
      <path d="M10.5 3v5M8 5.5h5" />
    </>
  ),
  "/docs/faq": (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M6.4 6.4a1.7 1.7 0 1 1 2.3 1.6c-.5.2-.7.6-.7 1.1M8 11.2v.1" />
    </>
  ),
  "/docs/changelog": (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5v3l2 1.5" />
    </>
  ),
};

const STORE = "hv-sidebar-closed";

function readClosed(): string[] {
  try {
    const raw = window.localStorage.getItem(STORE);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeClosed(closed: string[]) {
  try {
    window.localStorage.setItem(STORE, JSON.stringify(closed));
  } catch {
    // Private windows can refuse storage; the sidebar still works, it just forgets.
  }
}

type Props = {
  groups: SidebarGroup[];
  /** The desktop panel: search on top, its own scroll area, a footer. Off for the mobile drawer. */
  panel?: boolean;
};

/**
 * The docs sidebar. Groups fold away, a rail ties each item to its group, and one
 * highlight glides between items as you navigate, so the eye follows where you went.
 */
export function DocsSidebar({ groups, panel = false }: Props) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const [closed, setClosed] = useState<string[]>([]);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = groups.reduce((sum, group) => sum + (group.title === "Get started" ? 0 : group.items.length), 0);

  const visible = groups
    .map((group) => ({
      ...group,
      items: deferred ? group.items.filter((item) => item.label.toLowerCase().includes(deferred)) : group.items,
    }))
    .filter((group) => group.items.length > 0);

  // Remember folded groups per visitor, but never hide the page you are on.
  useEffect(() => {
    const stored = readClosed();
    const here = groups.find((group) => group.items.some((item) => item.href === pathname))?.title;
    // Reading storage has to wait for the client, so this runs once after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClosed(stored.filter((title) => title !== here));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const here = groups.find((group) => group.items.some((item) => item.href === pathname))?.title;
    if (!here) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClosed((prev) => (prev.includes(here) ? prev.filter((title) => title !== here) : prev));
  }, [pathname, groups]);

  const toggle = (title: string) => {
    setClosed((prev) => {
      const next = prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title];
      writeClosed(next);
      return next;
    });
  };

  // Place the highlight on the active row. `animate` is false while groups fold,
  // so it tracks the row frame by frame instead of lagging behind it.
  const place = useCallback((animate: boolean) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!active || active.closest("[data-closed]")) {
      pill.style.opacity = "0";
      return;
    }
    const box = nav.getBoundingClientRect();
    const row = active.getBoundingClientRect();
    if (!animate) pill.dataset.instant = "";
    pill.style.left = `${row.left - box.left}px`;
    pill.style.transform = `translateY(${row.top - box.top}px)`;
    pill.style.height = `${active.offsetHeight}px`;
    pill.style.opacity = "1";
    if (!animate) {
      void pill.offsetWidth;
      delete pill.dataset.instant;
    }
  }, []);

  useLayoutEffect(() => {
    const pill = pillRef.current;
    place(Boolean(pill?.dataset.ready));
    if (pill && !pill.dataset.ready) {
      // Let the browser paint the start position before transitions turn on.
      requestAnimationFrame(() => {
        pill.dataset.ready = "true";
      });
    }
  }, [pathname, deferred, place]);

  // Folding a group above the active row moves it; follow along without easing.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(() => place(false));
    observer.observe(nav);
    return () => observer.disconnect();
  }, [place]);

  useLayoutEffect(() => place(false), [closed, place]);

  // On first load, bring a deep-linked item into view inside the sidebar only.
  useEffect(() => {
    const scroller = scrollRef.current;
    const active = navRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!scroller || !active) return;
    const top = active.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    if (top > scroller.clientHeight - 80) scroller.scrollTop = top - scroller.clientHeight / 2;
    // Only on mount: later navigation keeps the user's own scroll position.
  }, []);

  // "/" jumps to the search, the way most docs sites do.
  useEffect(() => {
    if (!panel) return;
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
  }, [panel]);

  const nav = (
    <nav ref={navRef} aria-label="Sections" className="relative text-[13.5px] [overflow-clip-margin:4px] [overflow:clip]">
      <span
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-0 left-0 top-0 rounded-[10px] bg-raised opacity-0 shadow-[0_1px_2px_rgb(0_0_0/0.05)] ring-1 ring-line data-[ready]:transition-[transform,height,opacity] data-[ready]:duration-[220ms] data-[ready]:ease-[var(--hv-ease-in-out)] data-[instant]:!transition-none motion-reduce:!transition-none"
      />
      {visible.length === 0 && <p className="px-2.5 py-2 text-ink-2">No matches for “{query.trim()}”.</p>}
      {visible.map((group) => {
        const isClosed = !deferred && closed.includes(group.title);
        const id = `sidebar-${group.title.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <div key={group.title} className="mb-3 last:mb-0" data-closed={isClosed ? "" : undefined}>
            <h2>
              <button
                type="button"
                aria-expanded={!isClosed}
                aria-controls={id}
                onClick={() => toggle(group.title)}
                className="group/head flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-[12.5px] font-medium text-ink-2 transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              >
                <svg {...stroke} className="shrink-0 text-ink-3 transition-colors group-hover/head:text-ink-2">
                  {groupIcons[group.title]}
                </svg>
                {group.title}
                <span className="ml-auto text-[11.5px] font-normal tabular-nums text-ink-3">{group.items.length}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="shrink-0 text-ink-3 transition-transform duration-200 ease-[var(--hv-ease-out)] group-aria-expanded/head:rotate-0 -rotate-90 motion-reduce:transition-none"
                >
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </h2>
            <div
              id={id}
              inert={isClosed}
              className="grid transition-[grid-template-rows,opacity] duration-200 ease-[var(--hv-ease-out)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isClosed ? "0fr" : "1fr", opacity: isClosed ? 0 : 1 }}
            >
              <ul className="min-h-0 overflow-hidden">
                {group.items.map((item, index) => {
                  const active = pathname === item.href;
                  const icon = itemIcons[item.href];
                  const last = index === group.items.length - 1;
                  return (
                    <li key={item.href} className="relative pl-[18px]">
                      {/* The rail: a vertical line down the group, with a soft bend into each row. */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-[17px] top-0 w-px bg-line ${last ? "h-1/2" : "h-full"}`}
                      />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-[17px] top-1/2 h-px w-2 transition-colors duration-200 ${active ? "bg-ink-3" : "bg-line"}`}
                      />
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="relative ml-3 flex items-center gap-2 rounded-[10px] px-2.5 py-[7px] text-ink-2 transition-colors duration-150 hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
                      >
                        {icon && <svg {...stroke} className="shrink-0 opacity-80">{icon}</svg>}
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto shrink-0 rounded-full bg-accent/10 px-1.5 py-px text-[10.5px] font-medium leading-4 text-accent ring-1 ring-inset ring-accent/20">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );

  if (!panel) return nav;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[20px] bg-surface ring-1 ring-line">
      <div className="p-2.5 pb-1">
        <div className="relative">
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
            onChange={(event) => {
              setQuery(event.target.value);
              if (scrollRef.current) scrollRef.current.scrollTop = 0;
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setQuery("");
            }}
            placeholder="Quick search"
            aria-label="Filter the sidebar"
            className="h-9 w-full rounded-[11px] bg-sunken/80 pl-8 pr-8 text-[13px] text-ink outline-none ring-1 ring-transparent transition-[background-color,box-shadow] duration-150 placeholder:text-ink-2 focus:bg-raised focus:ring-line-strong [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 grid h-5 min-w-5 -translate-y-1/2 place-items-center rounded-md bg-raised px-1 font-sans text-[11px] text-ink-2 ring-1 ring-line">
            /
          </kbd>
        </div>
      </div>
      <div
        ref={scrollRef}
        data-sidebar-scroll
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3 [mask-image:linear-gradient(to_bottom,transparent,black_14px,black_calc(100%-14px),transparent)] [scrollbar-width:thin] [scrollbar-color:var(--hv-line-strong)_transparent]"
      >
        {nav}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3 text-[12px] text-ink-2">
        <span className="tabular-nums">{total} components, MIT</span>
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="grid size-7 place-items-center rounded-lg text-ink-2 transition-colors hover:bg-sunken hover:text-ink"
          aria-label="HoveraUI on GitHub"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
