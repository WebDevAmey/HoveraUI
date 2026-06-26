"use client";

import { usePackageManager, type PackageManager } from "@/context/PackageManagerContext";
import CopyButton from "@/components/CopyButton";

const PM_ORDER: PackageManager[] = ["npm", "pnpm", "bun", "yarn"];

interface PackageManagerTabsProps {
  /** Build the literal command for a given package manager. */
  getCommand: (pm: PackageManager) => string;
}

export default function PackageManagerTabs({ getCommand }: PackageManagerTabsProps) {
  const { packageManager, setPackageManager } = usePackageManager();
  const command = getCommand(packageManager);

  return (
    <div>
      <div role="tablist" aria-label="Package manager" className="flex gap-1 border-b border-border">
        {PM_ORDER.map((pm) => (
          <button
            key={pm}
            role="tab"
            aria-selected={packageManager === pm}
            tabIndex={packageManager === pm ? 0 : -1}
            onClick={() => setPackageManager(pm)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              packageManager === pm
                ? "border-b-2 border-hovera text-foreground"
                : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-[var(--doc-radius)] border border-border bg-code-bg px-4 py-3">
        <code className="overflow-x-auto whitespace-pre font-mono text-sm text-code-foreground">
          {command}
        </code>
        <CopyButton
          code={command}
          label="Copy command"
          className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        />
      </div>
    </div>
  );
}
