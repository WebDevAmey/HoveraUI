"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";

interface CommandAction {
  group: string;
  label: string;
  hint?: string;
  onSelect?: () => void;
}

interface CommandMenuProps {
  actions?: CommandAction[];
  placeholder?: string;
  /** Render the trigger button. The dialog itself opens on Cmd/Ctrl+K. */
  showTrigger?: boolean;
}

const DEFAULT_ACTIONS: CommandAction[] = [
  { group: "Navigate", label: "Go to Components", hint: "G then C" },
  { group: "Navigate", label: "Go to Docs", hint: "G then D" },
  { group: "Theme", label: "Toggle dark mode", hint: "T" },
  { group: "Theme", label: "Use system theme" },
];

export default function CommandMenu({
  actions = DEFAULT_ACTIONS,
  placeholder = "Type a command or search…",
  showTrigger = true,
}: CommandMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const groups = Array.from(new Set(actions.map((a) => a.group)));

  return (
    <>
      {showTrigger && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:border-white/20 hover:text-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Search commands
          <kbd className="rounded border border-white/10 bg-neutral-950 px-1.5 py-0.5 text-[10px] text-neutral-500">
            ⌘K
          </kbd>
        </button>
      )}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command menu"
        className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50"
      >
        <Command.Input
          placeholder={placeholder}
          className="w-full border-b border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-neutral-500">
            No results found.
          </Command.Empty>
          {groups.map((group) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-neutral-500"
            >
              {actions
                .filter((a) => a.group === group)
                .map((action) => (
                  <Command.Item
                    key={action.label}
                    onSelect={() => {
                      action.onSelect?.();
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm text-neutral-200 data-[selected=true]:bg-white/10"
                  >
                    {action.label}
                    {action.hint && <span className="text-xs text-neutral-500">{action.hint}</span>}
                  </Command.Item>
                ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
