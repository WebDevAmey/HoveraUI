"use client";

import FloatingNavbar from "@/components/navbars/FloatingNavbar";

export default function FloatingNavbarDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <FloatingNavbar fixed={false} />
    </div>
  );
}
