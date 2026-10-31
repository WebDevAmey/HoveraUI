import Link from "next/link";
import { categories } from "@/registry/types";
import { Logo } from "./logo";

const columns = [
  {
    title: "Library",
    links: categories.map((c) => ({ href: `/components#cat-${c.id}`, label: c.label })),
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/tokens", label: "Tokens" },
      { href: "/docs/faq", label: "FAQ" },
    ],
  },
  {
    title: "Project",
    links: [
      { href: "/docs/changelog", label: "Changelog" },
      { href: "https://github.com/WebDevAmey/HoveraUI", label: "Source" },
      { href: "https://github.com/WebDevAmey/HoveraUI/issues", label: "Issues" },
    ],
  },
];

export function SiteFooter({ count }: { count: number }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[13px] text-ink-2">
            A small library of original components. Each one is built around a single idea and ships as source you own.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="label">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-2 transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-5 font-mono text-[11px] text-ink-2 sm:px-6">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            {count} components, all typed, all documented
          </span>
          <span>MIT licensed</span>
          <span className="sm:ml-auto">© {new Date().getFullYear()} HoveraUI</span>
        </div>
      </div>
    </footer>
  );
}
