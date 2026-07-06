"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { getShadcnAddCommand, type PackageManager } from "@/lib/registry";

/* -------------------------------------------------------------------------- */
/*  useCopy                                                                   */
/* -------------------------------------------------------------------------- */

function useCopy() {
  const [hasCopied, setHasCopied] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = React.useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setHasCopied(false), 2000);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { hasCopied, copy };
}

/* -------------------------------------------------------------------------- */
/*  Icons (inline SVG, no lucide dependency)                                  */
/* -------------------------------------------------------------------------- */

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  CLIInstall                                                                */
/* -------------------------------------------------------------------------- */

interface CLIInstallProps {
  componentName: string;
  className?: string;
  packageManager?: PackageManager;
}

export function CLIInstall({ componentName, className, packageManager = "npm" }: CLIInstallProps) {
  const [copied, setCopied] = React.useState(false);
  const command = getShadcnAddCommand(componentName, packageManager);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-1 dark:bg-neutral-900/80 rounded-lg border border-border font-mono text-sm">
        <TerminalIcon className="h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
        <code className="text-foreground overflow-x-auto whitespace-nowrap flex-1">
          {command}
        </code>
        <button
          onClick={copyToClipboard}
          className="shrink-0 p-1.5 rounded-md hover:bg-surface-2 transition-colors"
          aria-label="Copy command"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-emerald-500" />
          ) : (
            <CopyIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ManualStep                                                                */
/* -------------------------------------------------------------------------- */

interface ManualStepProps {
  step: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const STEP_COLORS = [
  "text-indigo-500 border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
  "text-violet-500 border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  "text-fuchsia-500 border-fuchsia-200 bg-fuchsia-50 dark:border-fuchsia-800 dark:bg-fuchsia-950/50 dark:text-fuchsia-300",
];

const STEP_LINE_COLORS = [
  "bg-indigo-200 dark:bg-indigo-800",
  "bg-violet-200 dark:bg-violet-800",
  "bg-fuchsia-200 dark:bg-fuchsia-800",
];

const STEP_ICONS = [TerminalIcon, PackageIcon, CodeIcon];

export function ManualStep({ step, title, children, className }: ManualStepProps) {
  const index = Math.min(step - 1, STEP_COLORS.length - 1);
  const StepIcon = STEP_ICONS[index];

  return (
    <div className={cn("relative pl-10 pb-8 last:pb-0", className)}>
      {/* Step circle */}
      <div
        className={cn(
          "absolute left-0 top-0 flex items-center justify-center w-7 h-7 rounded-full border text-xs font-semibold",
          STEP_COLORS[index]
        )}
      >
        <StepIcon className="h-3.5 w-3.5" />
      </div>
      {/* Connecting line */}
      <div
        className={cn(
          "absolute left-[13px] top-7 bottom-0 w-px last:hidden",
          STEP_LINE_COLORS[index]
        )}
      />
      {/* Content */}
      <div className="pt-0.5">
        <h4 className="text-sm font-medium text-foreground mb-3">{title}</h4>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  InstallHeading                                                            */
/* -------------------------------------------------------------------------- */

interface InstallHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function InstallHeading({ children, className }: InstallHeadingProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-foreground mt-8 mb-4 first:mt-0 flex items-center gap-2",
        className
      )}
    >
      {children}
    </h3>
  );
}

/* -------------------------------------------------------------------------- */
/*  Installation (section wrapper)                                           */
/* -------------------------------------------------------------------------- */

interface InstallationProps {
  children: React.ReactNode;
  className?: string;
}

export function Installation({ children, className }: InstallationProps) {
  return <div className={cn("space-y-8", className)}>{children}</div>;
}

/* -------------------------------------------------------------------------- */
/*  PackageCommand (multi-pm command display)                                  */
/* -------------------------------------------------------------------------- */

const PM_ORDER: PackageManager[] = ["npm", "pnpm", "bun", "yarn"];

interface PackageCommandProps {
  commands: Record<PackageManager, string>;
}

export function PackageCommand({ commands }: PackageCommandProps) {
  const [activeManager, setActiveManager] = React.useState<PackageManager>("npm");
  const { hasCopied, copy } = useCopy();
  const command = commands[activeManager];

  return (
    <div className="space-y-2">
      <div className="inline-flex items-center rounded-md bg-surface-2 p-0.5 text-sm text-muted-foreground">
        {PM_ORDER.map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => setActiveManager(pm)}
            className={cn(
              "rounded px-3 py-1 font-medium transition-colors",
              activeManager === pm
                ? "bg-background text-foreground shadow-sm"
                : "hover:text-foreground"
            )}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="group/command relative inline-flex max-w-full items-center overflow-hidden rounded-lg border border-border bg-surface-1 text-sm">
        <span className="border-r border-border px-3 py-2 font-mono text-muted-foreground">
          bash
        </span>
        <code className="overflow-x-auto px-3 py-2 pr-12 font-mono text-foreground">
          {command}
        </code>
        <button
          onClick={() => copy(command)}
          className="absolute right-1.5 top-1/2 h-7 w-7 -translate-y-1/2 flex items-center justify-center rounded-md opacity-0 transition-opacity group-hover/command:opacity-100 bg-surface-2 hover:bg-border text-muted-foreground hover:text-foreground"
          aria-label="Copy command"
        >
          {hasCopied ? (
            <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
