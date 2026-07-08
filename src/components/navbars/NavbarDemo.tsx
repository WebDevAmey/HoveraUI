"use client";

import { House, Compass, SquareTerminal, User } from "lucide-react";
import Navbar from "@/components/navbars/Navbar";

export default function NavbarDemo() {
  return (
    <div className="flex min-h-48 w-full items-center justify-center bg-neutral-900/60 p-6">
      <Navbar
        fixed={false}
        items={[
          { label: "Home", icon: <House className="h-4 w-4" /> },
          { label: "Explore", icon: <Compass className="h-4 w-4" />, separatorAfter: true },
          { label: "Terminal", icon: <SquareTerminal className="h-4 w-4" /> },
          { label: "Profile", icon: <User className="h-4 w-4" /> },
        ]}
      />
    </div>
  );
}
