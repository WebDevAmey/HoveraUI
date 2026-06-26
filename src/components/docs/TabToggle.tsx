"use client";

interface TabOption<T extends string> {
  value: T;
  label: string;
}

interface TabToggleProps<T extends string> {
  options: [TabOption<T>, TabOption<T>];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

export default function TabToggle<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: TabToggleProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/40 p-1 ${className ?? ""}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={value === opt.value}
          tabIndex={value === opt.value ? 0 : -1}
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
