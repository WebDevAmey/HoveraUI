"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export type SidebarGroup = { label: string; items: { href: string; label: string }[] };

export function DocsSidebar({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="space-y-7 text-[13px]">
      {groups.map((group) => (
        <div key={group.label}>
          <h2 className="label mb-2 px-2">{group.label}</h2>
          <ul className="space-y-px">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2 py-1.5 transition-colors",
                      active ? "bg-sunken font-medium text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
