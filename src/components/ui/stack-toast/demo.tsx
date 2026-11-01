"use client";

import { useRef, type CSSProperties } from "react";
import { Toaster, useToaster } from "./stack-toast";

const button: CSSProperties = {
  height: 32,
  padding: "0 14px",
  borderRadius: 999,
  border: 0,
  background: "color-mix(in oklab, var(--hv-raised) 80%, transparent)",
  boxShadow: "inset 0 0 0 1px var(--hv-line-strong)",
  font: "500 12.5px/1 var(--hv-font-sans)",
  color: "var(--hv-ink)",
  cursor: "pointer",
};

const notes = [
  { title: "Draft saved", description: "Your changes are kept on this device." },
  { title: "Draft saved again", description: "Two versions are kept on this device." },
  { title: "Synced", description: "Your drafts are now on every device." },
];

export default function Demo() {
  const toaster = useToaster();
  const count = useRef(0);

  // One button; each press stacks the next note so the pile builds up.
  const show = () => {
    const note = notes[count.current++ % notes.length];
    toaster.toast(note.title, { description: note.description });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        height: 300,
        borderRadius: 16,
        overflow: "hidden",
        background:
          "radial-gradient(60% 70% at 18% 30%, color-mix(in oklab, var(--hv-ether-1) 70%, transparent), transparent 70%), radial-gradient(50% 60% at 85% 80%, color-mix(in oklab, var(--hv-ether-3) 70%, transparent), transparent 70%), radial-gradient(40% 50% at 70% 20%, color-mix(in oklab, var(--hv-ether-2) 60%, transparent), transparent 70%), var(--hv-surface)",
      }}
    >
      <div style={{ padding: 16 }}>
        <button type="button" style={button} onClick={show}>
          Save
        </button>
      </div>
      <Toaster toaster={toaster} contained />
    </div>
  );
}
