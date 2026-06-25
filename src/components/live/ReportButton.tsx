"use client";

import { useState } from "react";

export default function ReportButton({ dropId }: { dropId: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  async function submitReport(reason: string) {
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dropId, reason }),
    }).catch(() => {});
    setSent(true);
    setOpen(false);
  }

  if (sent) {
    return <span className="text-xs text-zinc-500">Reported</span>;
  }

  if (open) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => submitReport("inappropriate")}
          className="rounded-md border border-rose-500/40 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-rose-400"
        >
          Confirm report
        </button>
        <button
          onClick={() => setOpen(false)}
          className="rounded-md border border-white/10 px-2 py-1.5 text-[10px] uppercase tracking-wider text-zinc-400"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Report this drop"
      className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:border-rose-500/40 hover:text-rose-400"
    >
      Report
    </button>
  );
}
