import Link from "next/link";
import { categories } from "@/registry/types";

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
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <p className="display text-[28px]">HoveraUI</p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
            {count} original components, each built around one idea and shipped as source you own.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="label">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
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
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-4 py-6 text-[13px] text-ink-2 sm:px-6">
        <span>MIT licensed</span>
        <span className="sm:ml-auto">© {new Date().getFullYear()} HoveraUI</span>
      </div>
      <p
        aria-hidden="true"
        className="display pointer-events-none select-none overflow-hidden whitespace-nowrap px-2 text-center text-[clamp(64px,17vw,260px)] leading-[0.8] text-ink/[0.06]"
      >
        HoveraUI
      </p>
    </footer>
  );
}
