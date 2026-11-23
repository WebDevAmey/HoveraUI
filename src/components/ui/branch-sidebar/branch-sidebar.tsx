"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./branch-sidebar.module.css";

export type BranchSidebarItem = {
  href: string;
  label: string;
  icon?: ReactNode;
  /** A short pill after the label, such as "New". */
  badge?: string;
  /** Extra words the quick search matches on. */
  keywords?: string;
};

export type BranchSidebarGroup = {
  title: string;
  icon?: ReactNode;
  items: BranchSidebarItem[];
  /** Start collapsed. Groups are open by default. */
  defaultCollapsed?: boolean;
};

export type BranchSidebarProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  groups: BranchSidebarGroup[];
  /** Controlled active href. */
  activeHref?: string;
  /** Initial active href when uncontrolled. */
  defaultActiveHref?: string;
  /** Called on every item click. Call event.preventDefault() to route client-side. */
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  /** Show the quick search field. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Key that focuses the quick search from anywhere on the page. null turns it off. */
  shortcut?: string | null;
  /** Content for the bottom strip, such as a count or a link. */
  footer?: ReactNode;
  /** Accessible name for the navigation landmark. */
  label?: string;
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * A panel sidebar: collapsible groups hang off a hairline branch, the active row's tick lights up,
 * and one raised highlight glides between rows as the active page changes.
 */
export function BranchSidebar({
  groups,
  activeHref,
  defaultActiveHref,
  onNavigate,
  searchable = true,
  searchPlaceholder = "Quick search",
  shortcut = "/",
  footer,
  label = "Sections",
  className,
  ...props
}: BranchSidebarProps) {
  const id = useId();
  const [innerActive, setInnerActive] = useState(defaultActiveHref);
  const active = activeHref ?? innerActive;
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((group) => [group.title, Boolean(group.defaultCollapsed)])),
  );

  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter by label and keywords; a search opens every group that still has a match.
  const term = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      groups
        .map((group) => ({
          ...group,
          items: term
            ? group.items.filter((item) => `${item.label} ${item.keywords ?? ""}`.toLowerCase().includes(term))
            : group.items,
        }))
        .filter((group) => group.items.length > 0),
    [groups, term],
  );

  // Place the highlight under the active row; the first placement is instant.
  const place = useCallback((animate: boolean) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    const link = nav.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!link || link.closest("[inert]")) {
      pill.style.opacity = "0";
      return;
    }
    const box = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    if (!animate) pill.dataset.instant = "";
    pill.style.left = `${rect.left - box.left}px`;
    pill.style.transform = `translateY(${rect.top - box.top}px)`;
    pill.style.height = `${rect.height}px`;
    pill.style.opacity = "1";
    if (!animate) {
      void pill.offsetWidth;
      delete pill.dataset.instant;
    }
  }, []);

  useLayoutEffect(() => {
    const pill = pillRef.current;
    place(Boolean(pill?.dataset.ready));
    if (pill && !pill.dataset.ready) requestAnimationFrame(() => (pill.dataset.ready = "true"));
  }, [active, collapsed, visible, place]);

  // Groups opening and closing change the nav's height; keep the highlight pinned meanwhile.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(() => place(false));
    observer.observe(nav);
    return () => observer.disconnect();
  }, [place]);

  // Bring a deep-linked row into view inside the panel only, on first paint.
  useEffect(() => {
    const scroller = scrollRef.current;
    const link = navRef.current?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!scroller || !link) return;
    const top = link.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
    if (top > scroller.clientHeight - 80) scroller.scrollTop = top - scroller.clientHeight / 2;
  }, []);

  // The shortcut focuses the search unless the reader is already typing somewhere.
  useEffect(() => {
    if (!searchable || !shortcut) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== shortcut || event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchable, shortcut]);

  const onSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && query) {
      event.preventDefault();
      setQuery("");
    } else if (event.key === "Enter") {
      const links = navRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [];
      Array.from(links).find((link) => !link.closest("[inert]"))?.click();
    }
  };

  const toggle = (title: string) => setCollapsed((state) => ({ ...state, [title]: !state[title] }));

  return (
    <div className={cn(styles.root, className)} {...props}>
      {searchable && (
        <div className={styles.search}>
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className={styles.searchIcon} fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onSearchKey}
            placeholder={searchPlaceholder}
            aria-label={`Filter ${label.toLowerCase()}`}
            aria-controls={`${id}-nav`}
            className={styles.input}
          />
          {shortcut && !query && (
            <kbd className={styles.kbd} aria-hidden="true">
              {shortcut}
            </kbd>
          )}
        </div>
      )}

      <div ref={scrollRef} className={styles.scroll}>
        <nav ref={navRef} id={`${id}-nav`} aria-label={label} className={styles.nav}>
          <span ref={pillRef} aria-hidden="true" className={styles.pill} />
          {visible.map((group) => {
            const open = term ? true : !collapsed[group.title];
            const regionId = `${id}-${slugify(group.title)}`;
            return (
              <div key={group.title} className={styles.group}>
                <h2 className={styles.heading}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={regionId}
                    onClick={() => toggle(group.title)}
                    disabled={Boolean(term)}
                    className={styles.head}
                  >
                    {group.icon && <span className={styles.headIcon}>{group.icon}</span>}
                    <span className={styles.headLabel}>{group.title}</span>
                    <span className={styles.count}>{group.items.length}</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true" className={styles.chevron}>
                      <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h2>
                <div id={regionId} className={styles.region} data-open={open || undefined} inert={!open}>
                  <ul className={styles.list}>
                    {group.items.map((item, i) => {
                      const current = item.href === active;
                      return (
                        <li key={item.href} className={styles.row} data-last={i === group.items.length - 1 || undefined}>
                          <span aria-hidden="true" className={styles.stem} />
                          <span aria-hidden="true" className={styles.tick} data-active={current || undefined} />
                          <a
                            href={item.href}
                            aria-current={current ? "page" : undefined}
                            onClick={(event) => {
                              onNavigate?.(item.href, event);
                              if (activeHref === undefined) setInnerActive(item.href);
                            }}
                            className={styles.link}
                          >
                            {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                            <span className={styles.itemLabel}>{item.label}</span>
                            {item.badge && <span className={styles.badge}>{item.badge}</span>}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className={styles.empty} role="status">
              Nothing matches “{query.trim()}”
            </p>
          )}
        </nav>
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
