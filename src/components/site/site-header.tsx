import { Logo } from "./logo";
import { github, mainNav, searchGroups } from "./nav";
import { NavLink } from "./nav-link";
import { SiteSearch } from "./site-search";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-3 px-4 sm:gap-8 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="-mx-2 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto [scrollbar-width:none]">
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <SiteSearch groups={searchGroups()} />
          <a
            href={github}
            aria-label="HoveraUI on GitHub"
            className="press hidden size-9 place-items-center rounded-full text-ink-2 transition-[color,background-color,transform] hover:bg-sunken hover:text-ink sm:grid"
          >
            <svg width="17" height="17" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
              <path d="M8 .2a8 8 0 0 0-2.53 15.6c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
