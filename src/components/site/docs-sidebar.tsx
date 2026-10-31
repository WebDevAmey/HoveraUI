"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarGroup } from "./nav";

export function DocsSidebar({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Sections" className="space-y-7 text-[13px]">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="label mb-2 px-2">{group.title}</h2>
          <ul className="space-y-px">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="block rounded-md px-2 py-1.5 text-ink-2 transition-colors hover:text-ink aria-[current=page]:bg-sunken aria-[current=page]:font-medium aria-[current=page]:text-ink"
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
