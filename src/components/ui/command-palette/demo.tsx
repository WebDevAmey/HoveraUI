"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CommandPalette, type CommandGroup, type CommandItem } from "./command-palette";
import styles from "./demo.module.css";

const groups: CommandGroup[] = [
  {
    label: "Adjust",
    items: [
      { id: "exposure", label: "Exposure", hint: "Light", shortcut: ["E"] },
      { id: "white-balance", label: "White balance", hint: "Color", shortcut: ["W"] },
      { id: "straighten", label: "Straighten horizon", hint: "Geometry" },
      { id: "grain", label: "Add film grain", hint: "Effects" },
    ],
  },
  {
    label: "Library",
    items: [
      { id: "flag", label: "Flag as pick", shortcut: ["P"] },
      { id: "compare", label: "Compare with original", shortcut: ["\\"] },
      { id: "rename", label: "Rename frame", hint: "Roll 14" },
    ],
  },
  {
    label: "Export",
    items: [
      { id: "jpeg", label: "Export as JPEG", shortcut: ["⌘", "E"] },
      { id: "contact", label: "Print contact sheet", hint: "A4, 6 × 6" },
    ],
  },
];

const subscribe = () => () => {};
const isMac = () => /Mac|iPhone|iPad/.test(navigator.userAgent);

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const mac = useSyncExternalStore(subscribe, isMac, () => true);

  const stageRef = useRef<HTMLDivElement>(null);

  // The shortcut is live only while this demo is mounted. With several demos on a page,
  // the first one claims the key and the rest see defaultPrevented.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey)) return;
      const ours = stageRef.current?.querySelector("dialog[open]");
      if (!ours && document.querySelector("dialog[open]")) return;
      event.preventDefault();
      setOpen(!ours);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onSelect = useCallback((item: CommandItem) => setLast(item.label), []);

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.field} aria-hidden="true" />
      <div className={styles.bar}>
        <button type="button" className={styles.trigger} onClick={() => setOpen(true)}>
          Open palette
          <span className={styles.keys} aria-hidden="true">
            <kbd>{mac ? "⌘" : "Ctrl"}</kbd>
            <kbd>K</kbd>
          </span>
        </button>
        <span className={styles.last} role="status">
          {last ? `Ran: ${last}` : "Nothing run yet"}
        </span>
      </div>
      <CommandPalette groups={groups} onSelect={onSelect} placeholder="Search tools" className={styles.inline} />
      <CommandPalette variant="dialog" open={open} onOpenChange={setOpen} groups={groups} onSelect={onSelect} placeholder="Search tools" />
    </div>
  );
}
