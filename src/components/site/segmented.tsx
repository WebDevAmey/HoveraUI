"use client";

import { useLayoutEffect, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: string };

/**
 * Site-chrome tabs: a row of options with one thumb that glides to the selected one.
 * Arrow keys move between options; the thumb lands without animation on first paint.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  idBase,
  size = "md",
  className,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  /** When set, options become tabs that control `${idBase}-panel`. */
  idBase?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const thumb = thumbRef.current;
    const active = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !thumb || !active) return;
    thumb.style.width = `${active.offsetWidth}px`;
    thumb.style.transform = `translateX(${active.offsetLeft}px)`;
    if (!thumb.dataset.ready) {
      requestAnimationFrame(() => {
        thumb.dataset.ready = "true";
      });
    }
  }, [value]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = options[(index + step + options.length) % options.length];
    onChange(next.value);
    rowRef.current?.querySelector<HTMLElement>(`[data-value="${next.value}"]`)?.focus();
  };

  return (
    <div
      ref={rowRef}
      role="tablist"
      aria-label={label}
      className={cn("relative inline-flex rounded-[11px] bg-sunken/70 p-[3px]", className)}
    >
      <span
        ref={thumbRef}
        aria-hidden="true"
        className="absolute bottom-[3px] left-0 top-[3px] rounded-[8px] bg-raised shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-line data-[ready]:transition-[transform,width] data-[ready]:duration-[240ms] data-[ready]:ease-[var(--hv-ease-out)] motion-reduce:!transition-none"
      />
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            data-value={option.value}
            id={idBase ? `${idBase}-tab-${option.value}` : undefined}
            aria-controls={idBase ? `${idBase}-panel` : undefined}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "relative rounded-[8px] font-medium text-ink-3 transition-colors duration-150 hover:text-ink-2 aria-selected:text-ink",
              size === "sm" ? "h-7 px-2.5 text-[12px]" : "h-8 px-3.5 text-[13px]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
