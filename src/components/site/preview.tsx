"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Theme = "auto" | "light" | "dark";
type Width = "fit" | "mobile";

/** Segmented control whose thumb slides to the chosen option. */
function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const thumb = thumbRef.current;
    const active = groupRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!thumb || !active) return;
    thumb.style.transform = `translateX(${active.offsetLeft}px)`;
    thumb.style.width = `${active.offsetWidth}px`;
    if (!thumb.dataset.ready) requestAnimationFrame(() => (thumb.dataset.ready = "true"));
  }, [value]);

  return (
    <div ref={groupRef} role="group" aria-label={label} className="relative flex rounded-full bg-sunken p-[3px]">
      <span
        ref={thumbRef}
        aria-hidden="true"
        className="absolute inset-y-[3px] left-0 rounded-full bg-raised shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_0.5px_rgb(0_0_0/0.06)] data-[ready]:transition-[transform,width] data-[ready]:duration-[220ms] data-[ready]:ease-[var(--hv-ease-in-out)] motion-reduce:!transition-none"
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="relative rounded-full px-3 py-1 text-[12.5px] text-ink-2 transition-colors duration-200 hover:text-ink aria-pressed:text-ink"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Preview({ children, tall }: { children: ReactNode; tall?: boolean }) {
  const [theme, setTheme] = useState<Theme>("auto");
  const [width, setWidth] = useState<Width>("fit");
  const [run, setRun] = useState(0);

  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-surface">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2.5">
        <Segmented
          label="Preview theme"
          value={theme}
          onChange={setTheme}
          options={[
            { value: "auto", label: "Auto" },
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
          ]}
        />
        <Segmented
          label="Preview width"
          value={width}
          onChange={setWidth}
          options={[
            { value: "fit", label: "Fit" },
            { value: "mobile", label: "Mobile" },
          ]}
        />
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="press ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-ink-2 transition-[color,background-color,transform] hover:bg-sunken hover:text-ink"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M13.5 8A5.5 5.5 0 1 1 11.9 4.1M13.5 2.5v3h-3" />
          </svg>
          Replay
        </button>
      </div>
      <div className="px-2 pb-2">
        <div
          data-theme={theme === "auto" ? undefined : theme}
          className={cn(
            "grid place-items-center rounded-[14px] border border-line bg-canvas px-4 py-14 text-ink transition-colors duration-200",
            tall ? "min-h-[540px]" : "min-h-[400px]",
          )}
        >
          <div
            key={run}
            className={cn(
              "grid w-full place-items-center",
              width === "mobile" && "max-w-[360px] rounded-xl outline outline-1 outline-offset-8 outline-dashed outline-line-strong",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
