"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/layout/sidebar-provider";

const NAV_ITEMS = [
  {
    label: "Explore",
    links: [
      { href: "/components", label: "Components" },
      { href: "/docs/getting-started", label: "Docs" },
    ],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { open, toggle } = useSidebar();

  return (
    <>
      {open && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-sidebar-border bg-sidebar"
        >
          <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center bg-primary text-sm font-bold text-primary-foreground">
                H
              </span>
              <span className="text-base font-bold tracking-tight text-sidebar-foreground">
                Hovera UI
              </span>
            </Link>
            <button
              onClick={toggle}
              aria-label="Collapse sidebar"
              className="flex h-7 w-7 items-center justify-center text-sidebar-foreground/50 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="15" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="15" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4">
            {NAV_ITEMS.map((group) => (
              <div key={group.label} className="mb-6">
                <p className="mb-2 px-2 font-mono text-[11px] uppercase tracking-[0.15em] text-sidebar-foreground/40">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.links.map((link) => {
                    const active = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2.5 px-2 py-2 text-sm transition-colors ${
                          active
                            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-sidebar-border px-3 py-3">
            <Link
              href="https://github.com/WebDevAmey/HoveraUI"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-2 py-2 text-sm text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.01 8.01 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38c0-.27.01-1.13.01-2.2c0-.75-.25-1.23-.54-1.48c1.78-.2 3.65-.88 3.65-3.95c0-.88-.31-1.59-.82-2.15c.08-.2.36-1.02-.08-2.12c0 0-.67-.22-2.2.82c-.64-.18-1.32-.27-2-.27s-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82c-.44 1.1-.16 1.92-.08 2.12c-.51.56-.82 1.28-.82 2.15c0 3.06 1.86 3.75 3.64 3.95c-.23.2-.44.55-.51 1.07c-.46.21-1.61.55-2.33-.66c-.15-.24-.6-.83-1.23-.82c-.67.01-.27.38.01.53c.34.19.73.9.82 1.13c.16.45.68 1.31 2.69.94c0 .67.01 1.3.01 1.49c0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8" />
              </svg>
              GitHub
            </Link>
          </div>
        </motion.aside>
      )}
    </>
  );
}
