"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PRODUCT_LINKS = [
  { href: "/components", label: "Components" },
  { href: "/components", label: "Browse all" },
  { href: "/#discover", label: "Discover" },
];

const RESOURCE_LINKS = [
  { href: "/docs/getting-started", label: "Getting started" },
  { href: "/components", label: "Installation" },
  { href: "https://github.com/WebDevAmey/HoveraUI", label: "GitHub" },
];

const COMPANY_LINKS = [
  { href: "https://github.com/WebDevAmey/HoveraUI", label: "GitHub" },
  { href: "https://x.com", label: "X (Twitter)" },
];

/** Shared footer used by both the landing page and /docs/* pages. */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-hovera text-sm font-bold text-hovera-foreground">
                H
              </span>
              <span className="text-base font-bold tracking-tight text-foreground">Hovera UI</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Hover-first interaction components, built with React, Next.js, Tailwind and Framer Motion.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">Product</h3>
            <ul className="mt-3 space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <motion.span className="inline-block" whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">Resources</h3>
            <ul className="mt-3 space-y-2">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <motion.span className="inline-block" whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">Company</h3>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <motion.span className="inline-block" whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>Built with React, Next.js, Tailwind CSS and Framer Motion.</p>
          <p>© {new Date().getFullYear()} Hovera UI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
