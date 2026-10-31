import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/changelog", label: "Changelog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-raised focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-[1240px] items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 text-[13px] sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <a
            href="https://github.com/WebDevAmey/HoveraUI"
            className="hidden rounded-full px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink md:inline-block"
          >
            GitHub
          </a>
          <ThemeToggle />
          <details className="group relative sm:hidden">
            <summary className="grid size-9 cursor-pointer list-none place-items-center rounded-full text-ink-2 hover:bg-sunken hover:text-ink [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Menu</span>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 5h12M2 11h12" stroke="currentColor" strokeWidth="1.5" className="transition-transform" />
              </svg>
            </summary>
            <nav aria-label="Mobile" className="absolute right-0 top-11 w-44 rounded-xl border border-line bg-raised p-1.5 text-sm">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-2 text-ink-2 hover:bg-sunken hover:text-ink">
                  {link.label}
                </Link>
              ))}
              <a href="https://github.com/WebDevAmey/HoveraUI" className="block rounded-lg px-3 py-2 text-ink-2 hover:bg-sunken hover:text-ink">
                GitHub
              </a>
            </nav>
          </details>
          <Link
            href="/docs#components"
            className="ml-1 hidden rounded-full sm:inline-block bg-ink px-4 py-2 text-[13px] font-medium text-canvas transition-opacity hover:opacity-85"
          >
            Browse
          </Link>
        </div>
      </div>
    </header>
  );
}
