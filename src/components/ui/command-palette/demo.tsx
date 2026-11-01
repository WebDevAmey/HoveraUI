"use client";

import { CommandPalette, type CommandGroup } from "./command-palette";
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

export default function Demo() {
  return (
    <div className={styles.stage}>
      <div className={styles.field} aria-hidden="true" />
      <CommandPalette groups={groups} placeholder="Search tools" className={styles.inline} />
    </div>
  );
}
