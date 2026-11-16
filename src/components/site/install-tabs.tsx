"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { CopyButton } from "./copy-button";
import { Segmented } from "./segmented";
import { SourceTabs, type SourceFile } from "./source-tabs";

type Method = "cli" | "manual";
type Runner = "npm" | "pnpm" | "yarn" | "bun";

const runners: Record<Runner, string> = {
  npm: "npx shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  yarn: "yarn dlx shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

const STORE = "hv-runner";

/** Install a component: one CLI command per package manager, or the files to copy by hand. */
export function InstallTabs({ slug, url, files }: { slug: string; url: string; files: SourceFile[] }) {
  const [method, setMethod] = useState<Method>("cli");
  const [runner, setRunner] = useState<Runner>("npm");
  const id = useId();
  const command = `${runners[runner]} ${url}`;

  // Remember the package manager across pages; storage is only readable after hydration.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORE);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved && saved in runners) setRunner(saved as Runner);
    } catch {}
  }, []);

  const pick = (value: Runner) => {
    setRunner(value);
    try {
      window.localStorage.setItem(STORE, value);
    } catch {}
  };

  return (
    <div>
      <Segmented
        label="Install method"
        idBase={id}
        value={method}
        onChange={setMethod}
        options={[
          { value: "cli", label: "CLI" },
          { value: "manual", label: "Manual" },
        ]}
      />
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${method}`} className="mt-4">
        {method === "cli" ? (
          <div className="overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
            <div className="flex h-11 items-center justify-between border-b border-line pl-1.5 pr-1.5">
              <div role="radiogroup" aria-label="Package manager" className="flex gap-0.5">
                {(Object.keys(runners) as Runner[]).map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={runner === name}
                    onClick={() => pick(name)}
                    className="rounded-lg px-2.5 py-1.5 font-mono text-[12px] text-ink-3 transition-colors duration-150 hover:text-ink-2 aria-checked:bg-raised aria-checked:text-ink aria-checked:shadow-[0_0_0_1px_var(--hv-line)]"
                  >
                    {name}
                  </button>
                ))}
              </div>
              <CopyButton text={command} label="Copy install command" />
            </div>
            <pre className="overflow-x-auto px-[18px] py-4 font-mono text-[12.5px] leading-relaxed [scrollbar-width:thin]">
              <span className="select-none text-ink-3">$ </span>
              <span className="text-ink">{runners[runner]}</span> <span className="text-ink-2">{url}</span>
            </pre>
          </div>
        ) : (
          <ol className="space-y-6">
            <li className="flex gap-3.5">
              <Step n={1} />
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-ink-2">
                  Add the shared{" "}
                  <Link href="/docs/installation" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                    tokens and cn helper
                  </Link>{" "}
                  once, if your project does not have them yet.
                </p>
              </div>
            </li>
            <li className="flex gap-3.5">
              <Step n={2} />
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="mb-3 text-ink-2">
                  Copy both files into <code className="font-mono text-[13px] text-ink">components/ui/{slug}/</code>.
                </p>
                <SourceTabs files={files} />
              </div>
            </li>
          </ol>
        )}
      </div>
    </div>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-6 shrink-0 place-items-center rounded-full bg-surface font-mono text-[11px] text-ink-2 ring-1 ring-line"
    >
      {n}
    </span>
  );
}
