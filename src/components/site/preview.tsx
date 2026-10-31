"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Theme = "auto" | "light" | "dark";
type Width = "fit" | "mobile";

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
  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-line bg-surface p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className="rounded-full px-2.5 py-1 font-mono text-[11px] text-ink-2 transition-colors hover:text-ink aria-pressed:bg-ink aria-pressed:text-canvas"
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
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2">
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
            { value: "mobile", label: "360" },
          ]}
        />
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="ml-auto rounded-full px-2.5 py-1 font-mono text-[11px] text-ink-2 transition-colors hover:text-ink"
        >
          Replay
        </button>
      </div>
      <div
        data-theme={theme === "auto" ? undefined : theme}
        className={cn(
          "grid place-items-center bg-canvas px-4 py-12 text-ink",
          tall ? "min-h-[520px]" : "min-h-[380px]",
        )}
      >
        <div
          key={run}
          className={cn("grid w-full place-items-center", width === "mobile" && "max-w-[360px] rounded-xl outline outline-1 outline-dashed outline-line-strong outline-offset-8")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
