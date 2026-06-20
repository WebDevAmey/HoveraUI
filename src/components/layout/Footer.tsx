const FOOTER_LINKS = [
  { label: "Patterns", href: "#" },
  { label: "Buttons", href: "#" },
  { label: "Favorites", href: "#" },
  { label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-lg font-bold text-transparent">
          Hovera UI
        </span>

        <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Footer">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group px-3 py-2 text-sm font-medium text-zinc-600 dark:text-indigo-400"
            >
              <span className="relative inline-block">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-indigo-600 transition-transform duration-300 ease-out group-hover:scale-x-100 dark:bg-indigo-400" />
              </span>
            </a>
          ))}
        </nav>

        <span className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Hovera UI. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
