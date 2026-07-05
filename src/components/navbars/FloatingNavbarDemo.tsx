"use client";

import FloatingNavbar from "@/components/navbars/FloatingNavbar";

export default function FloatingNavbarDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-2">
      <FloatingNavbar fixed={false} />
      <p className="text-xs text-neutral-500">
        Fixed to the top in a real page — hides on scroll down, returns on scroll up.
      </p>
    </div>
  );
}
