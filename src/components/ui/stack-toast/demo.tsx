"use client";

import type { CSSProperties } from "react";
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

export default function Demo() {
  const toaster = useToaster();

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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 16 }}>
        <button type="button" style={button} onClick={() => toaster.toast("Draft saved", { description: "Your changes are kept on this device." })}>
          Save
        </button>
        <button type="button" style={button} onClick={() => toaster.toast("Published", { tone: "success", description: "The page is live for everyone." })}>
          Publish
        </button>
        <button
          type="button"
          style={button}
          onClick={() =>
            toaster.toast("Moved to archive", {
              action: { label: "Undo", onClick: () => toaster.toast("Restored from archive", { duration: 2500 }) },
              duration: 7000,
            })
          }
        >
          Archive
        </button>
      </div>
      <Toaster toaster={toaster} contained />
    </div>
  );
}
