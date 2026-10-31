"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import styles from "./command-palette.module.css";

export type CommandItem = {
  id: string;
  label: string;
  /** Muted text after the label, such as a section or a path. */
  hint?: string;
  /** Keys shown on the right, e.g. ["⌘", "E"]. */
  shortcut?: string[];
  onSelect?: () => void;
};

export type CommandGroup = {
  label: string;
  items: CommandItem[];
};

export type CommandPaletteProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  groups: CommandGroup[];
  placeholder?: string;
  /** Called after the item's own onSelect. */
  onSelect?: (item: CommandItem) => void;
  /** "inline" renders the panel in place; "dialog" renders it in a native modal dialog. */
  variant?: "inline" | "dialog";
  /** Dialog variant: whether the dialog is open. */
  open?: boolean;
  /** Dialog variant: called on Escape, backdrop click and after a selection. */
  onOpenChange?: (open: boolean) => void;
  /** Shown when nothing matches. */
  empty?: ReactNode;
};

type Match = { item: CommandItem; hits: number[]; score: number; index: number };

/**
 * Subsequence matcher. Every query character must appear in order; characters that start a
 * word or continue a run score higher, gaps cost a little.
 */
function fuzzy(query: string, text: string): { score: number; hits: number[] } | null {
  if (!query) return { score: 0, hits: [] };
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  const hits: number[] = [];
  let score = 0;
  let from = 0;
  for (const char of q) {
    if (char === " ") continue;
    const at = t.indexOf(char, from);
    if (at === -1) return null;
    if (at === 0) score += 10;
    else if (/[\s\-_/.]/.test(t[at - 1])) score += 8;
    if (hits.length && at === hits[hits.length - 1] + 1) score += 6;
    score -= Math.min(at - from, 6);
    hits.push(at);
    from = at + 1;
  }
  return { score: score - t.length * 0.05, hits };
}

function Highlight({ text, hits }: { text: string; hits: number[] }) {
  if (!hits.length) return <>{text}</>;
  const set = new Set(hits);
  const parts: ReactNode[] = [];
  let start = 0;
  for (let i = 1; i <= text.length; i++) {
    if (i === text.length || set.has(i) !== set.has(start)) {
      const run = text.slice(start, i);
      parts.push(set.has(start) ? <mark key={start}>{run}</mark> : run);
      start = i;
    }
  }
  return <>{parts}</>;
}

/** A keyboard-first command palette on frosted glass, with grouped results and fuzzy matching. */
export function CommandPalette({
  variant = "inline",
  open = false,
  onOpenChange,
  className,
  ...props
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  if (variant === "inline") return <Panel className={className} {...props} />;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command palette"
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange?.(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange?.(false);
      }}
    >
      {/* Mounting the panel only while open resets the query each time. */}
      {open ? <Panel className={className} onClose={() => onOpenChange?.(false)} {...props} /> : null}
    </dialog>
  );
}

type PanelProps = Omit<CommandPaletteProps, "variant" | "open" | "onOpenChange"> & {
  onClose?: () => void;
};

function Panel({
  groups,
  placeholder = "Type a command or search",
  onSelect,
  empty,
  onClose,
  className,
  ...props
}: PanelProps) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const trimmed = query.trim();

  // Flat indices are assigned here so render stays pure.
  const { results, flat } = useMemo(() => {
    const flat: Match[] = [];
    const results = groups
      .map((group) => {
        const matches: Match[] = [];
        for (const item of group.items) {
          const result = fuzzy(trimmed, item.label);
          if (result) matches.push({ item, ...result, index: 0 });
        }
        if (trimmed) matches.sort((a, b) => b.score - a.score);
        return { label: group.label, matches };
      })
      .filter((group) => group.matches.length > 0);
    for (const group of results) {
      for (const match of group.matches) {
        match.index = flat.length;
        flat.push(match);
      }
    }
    return { results, flat };
  }, [groups, trimmed]);

  const activeIndex = Math.min(active, flat.length - 1);
  const optionId = (index: number) => `${id}-opt-${index}`;

  useEffect(() => {
    // Scroll only the listbox; scrollIntoView would also move the page.
    const list = listRef.current;
    const option = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !option) return;
    const top = option.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
    const pad = activeIndex === 0 ? top : 8;
    if (top - pad < list.scrollTop) list.scrollTop = top - pad;
    else if (top + option.offsetHeight + 8 > list.scrollTop + list.clientHeight)
      list.scrollTop = top + option.offsetHeight + 8 - list.clientHeight;
  }, [activeIndex, flat]);

  const choose = (item: CommandItem) => {
    item.onSelect?.();
    onSelect?.(item);
    onClose?.();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const count = flat.length;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = count ? (activeIndex + 1) % count : 0;
    else if (event.key === "ArrowUp") next = count ? (activeIndex - 1 + count) % count : 0;
    else if (event.key === "Home" && !event.shiftKey) next = 0;
    else if (event.key === "End" && !event.shiftKey) next = Math.max(count - 1, 0);
    else if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0) choose(flat[activeIndex].item);
      return;
    } else if (event.key === "Escape" && !onClose && query) {
      // Inline: Escape clears. In a dialog it falls through to the native cancel.
      event.preventDefault();
      setQuery("");
      setActive(0);
      return;
    }
    if (next === null) return;
    event.preventDefault();
    setActive(next);
  };

  const count = flat.length;

  return (
    <div className={cn(styles.panel, className)} {...props}>
      <div className={styles.search}>
        <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5 14 14" />
        </svg>
        <input
          className={styles.input}
          role="combobox"
          aria-expanded="true"
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-label="Search commands"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
        <kbd className={styles.esc} aria-hidden="true">
          esc
        </kbd>
      </div>

      <div ref={listRef} id={`${id}-list`} role="listbox" aria-label="Commands" className={styles.list}>
        {results.map((group, g) => (
          <div key={group.label} role="group" aria-labelledby={`${id}-g${g}`} className={styles.group}>
            <div id={`${id}-g${g}`} className={styles.heading} role="presentation">
              {group.label}
            </div>
            {group.matches.map(({ item, hits, index }) => (
              <div
                key={item.id}
                id={optionId(index)}
                role="option"
                aria-selected={index === activeIndex}
                className={styles.option}
                onPointerMove={() => index !== activeIndex && setActive(index)}
                // Keep focus in the input so typing continues after a click.
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(item)}
              >
                <span className={styles.label}>
                  <Highlight text={item.label} hits={hits} />
                </span>
                {item.hint ? <span className={styles.hint}>{item.hint}</span> : null}
                {item.shortcut ? (
                  <span className={styles.shortcut} aria-hidden="true">
                    {item.shortcut.map((key) => (
                      <kbd key={key}>{key}</kbd>
                    ))}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ))}
        {count === 0 ? (
          <div className={styles.empty}>
            {empty ?? (
              <>
                Nothing matches <q>{trimmed}</q>
              </>
            )}
          </div>
        ) : null}
      </div>

      <div className={styles.footer}>
        <span aria-hidden="true">
          <kbd>↑</kbd>
          <kbd>↓</kbd> move
        </span>
        <span aria-hidden="true">
          <kbd>↵</kbd> run
        </span>
        <span className={styles.count} role="status">
          {count === 1 ? "1 result" : `${count} results`}
        </span>
      </div>
    </div>
  );
}
