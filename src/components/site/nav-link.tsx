"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  // Changelog lives under /docs but is its own top-level item, so match it exactly first.
  const active =
    pathname === href ||
    (href === "/components" && pathname.startsWith("/components")) ||
    (href === "/docs/introduction" && pathname.startsWith("/docs") && pathname !== "/docs/changelog");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="inline-flex h-9 shrink-0 items-center rounded-full px-3 text-[13.5px] text-ink-2 transition-colors duration-150 hover:text-ink aria-[current=page]:bg-sunken aria-[current=page]:text-ink"
    >
      {children}
    </Link>
  );
}
