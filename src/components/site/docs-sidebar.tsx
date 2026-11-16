"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { github, type SidebarGroup } from "./nav";
import { SearchTrigger } from "./search-trigger";

type Props = {
  groups: SidebarGroup[];
  /** The desktop panel: a search button on top, its own scroll area, a footer. Off for the mobile drawer. */
  panel?: boolean;
};

/**
 * The docs sidebar: flat groups under small labels, and one highlight that glides
 * between rows as you navigate, so the eye follows where you went.
 */
export function DocsSidebar({ groups, panel = false }: Props) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = groups.reduce((sum, group) => sum + (group.title === "Get started" ? 0 : group.items.length), 0);

  // Place the highlight on the active row; the first placement is instant.
  const place = useCallback((animate: boolean) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!active) {
      pill.style.opacity = "0";
      return;
    }
    if (!animate) pill.dataset.instant = "";
    pill.style.transform = `translateY(${active.offsetTop}px)`;
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
      requestAnimationFrame(() => {
        pill.dataset.ready = "true";
      });
    }
  }, [pathname, place]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(() => place(false));
    observer.observe(nav);
    return () => observer.disconnect();
  }, [place]);

  // On first load, bring a deep-linked item into view inside the sidebar only.
  useEffect(() => {
    const scroller = scrollRef.current;
    const active = navRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!scroller || !active) return;
    const top = active.offsetTop;
    if (top > scroller.clientHeight - 80) scroller.scrollTop = top - scroller.clientHeight / 2;
  }, []);

  const nav = (
    <nav ref={navRef} aria-label="Sections" className="relative text-[13.5px]">
      <span
        ref={pillRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 rounded-[10px] bg-raised opacity-0 shadow-[0_1px_2px_rgb(0_0_0/0.04)] ring-1 ring-line data-[ready]:transition-[transform,height,opacity] data-[ready]:duration-[240ms] data-[ready]:ease-[var(--hv-ease-out)] data-[instant]:!transition-none motion-reduce:!transition-none"
      />
      {groups.map((group) => (
        <div key={group.title} className="mb-6 last:mb-0">
          <h2 className="flex items-center justify-between px-3 pb-1.5 text-[12px] font-medium text-ink-3">
            {group.title}
            {group.title !== "Get started" && <span className="font-normal tabular-nums">{group.items.length}</span>}
          </h2>
          <ul>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="relative flex items-center gap-2 rounded-[10px] px-3 py-[6px] text-ink-2 transition-colors duration-150 hover:text-ink aria-[current=page]:text-ink"
                  >
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-label={item.badge} title={item.badge} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  if (!panel) return nav;

  return (
    <div className="flex h-full flex-col">
      <SearchTrigger className="mb-2 h-9 rounded-[11px] px-3 text-[13px]" />
      <div
        ref={scrollRef}
        data-sidebar-scroll
        className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain py-4 [mask-image:linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-16px),transparent)] [scrollbar-width:none]"
      >
        {nav}
      </div>
      <div className="flex items-center justify-between px-3 pt-2 text-[12px] text-ink-3">
        <span className="tabular-nums">{total} components · MIT</span>
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="grid size-7 place-items-center rounded-lg transition-colors hover:bg-raised hover:text-ink"
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
