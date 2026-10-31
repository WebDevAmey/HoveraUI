import { Logo } from "./logo";
import { github, mainNav } from "./nav";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="-mx-2 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <a
            href={github}
            className="hidden rounded-md px-2 py-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink sm:inline-block"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
