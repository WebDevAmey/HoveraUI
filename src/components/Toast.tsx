"use client";

import { useEffect, useState } from "react";

interface ToastItem {
  id: number;
  message: string;
}

let _id = 0;

export function showToast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("pl:toast", { detail: { id: _id++, message } })
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const item = (e as CustomEvent<ToastItem>).detail;
      setToasts((t) => [...t, item]);
      setTimeout(
        () => setToasts((t) => t.filter((x) => x.id !== item.id)),
        2200
      );
    };
    window.addEventListener("pl:toast", handler);
    return () => window.removeEventListener("pl:toast", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2"
      role="status"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-slide-up flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-medium text-white shadow-2xl"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 7l3.5 3.5L12 3"
              stroke="rgb(134,239,172)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t.message}
        </div>
      ))}
    </div>
  );
}
