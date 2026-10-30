# Audit

Snapshot of `main` at `a3d67fd`, taken before the revamp.

## Stack

- Next.js 16.2 (App Router, Turbopack), React 19.2, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/postcss`), ESLint 9 flat config with `eslint-config-next`.
- npm with `package-lock.json`. Package name is still `pattern-lab`.
- React Compiler babel plugin is installed but not enabled in `next.config.ts`.
- No license file. No tests. No CI config.

## What exists

| Area | Contents |
| --- | --- |
| Components | 14 registry items across cards, loaders, navbars, tabs, text and sections (`spotlight-card`, `tilt-card`, `border-beam`, `command-menu`, `skeleton-profile`, `mercury-loader`, `floating-navbar`, `navbar`, `bento-grid`, `animated-tabs`, `text-reveal`, `typewriter`, `displacement-text`, `liquid-text`), plus site-only pieces in `src/components/{motion,chrome,landing}` and copied third-party pieces in `src/components/ui` (`animated-beam`, `border-beam`, `animated-theme-toggler`). |
| Data | Each component is described twice: a data file in `src/data/*.ts` holding a hand-maintained `code` string, and a doc entry in `src/data/docs/*.ts`. The `code` strings can drift from the real component. |
| Site | Landing page with marquee, pixel hero, showcase grid, stats row, story strip, tech stack and CTA; gallery at `/components`; component pages at `/components/[slug]`; six guide pages under `/docs`. Site chrome adds a preloader, custom cursor, Lenis smooth scroll and a dock. |
| Registry | `scripts/build-registry.mjs` bundles the data files with esbuild and writes shadcn registry items to `public/r`. Generated JSON is committed. |
| Redirects | `next.config.ts` carries ~80 permanent redirects for slugs that were removed in earlier cuts. |
| API | `/api/github-stars` falls back to a hard-coded star count when GitHub is unreachable, which shows invented data. |
| Dependencies | `framer-motion` and `motion` (two copies of the same library), `lenis`, `cmdk`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `class-variance-authority`, `lucide-react`, `next-themes`, `clsx`, `tailwind-merge`. |
| Other | `.github/screens` (screenshots of the old site), `CHANGELOG.md` (history of earlier cuts), `CONTRIBUTING.md`, and editor tooling in `.agents/`, `AGENTS.md`, `CLAUDE.md`, `skills-lock.json`. |

## Keep

- The stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4. It fits the brief, so there is no reason to migrate.
- The idea of a static, build-time registry in `public/r`, rewritten so it reads the component files directly instead of duplicated strings.
- Geist and Geist Mono through `next/font`.
- `CHANGELOG.md` history, extended with the revamp entry. The new changelog page renders from typed data.
- Editor tooling (`.agents/`, `AGENTS.md`, `CLAUDE.md`, `skills-lock.json`). It is the owner's local workflow, not part of the library, so it is left untouched.

## Delete

- Every existing component, demo, data file and doc entry. None of them clear the originality bar (spotlight card, tilt card, border beam, typewriter, text reveal and animated tabs all exist in shadcn, Aceternity or Magic UI in near-identical form), and the duplicated `code` strings are the main source of drift.
- Site chrome that fights the calm brief: preloader, custom cursor, Lenis smooth scroll, dock, marquee, stats row.
- `/api/github-stars` and its invented fallback number.
- The redirect table for slugs that no longer exist.
- Dependencies that the new library does not need: `framer-motion`, `motion`, `lenis`, `cmdk`, `@radix-ui/*`, `class-variance-authority`, `lucide-react`, `next-themes`, `clsx`, `tailwind-merge`, `babel-plugin-react-compiler`. Components use CSS for motion and a ten-line `cn` helper.
- `.github/screens`, `components.json` (pointed at a third-party registry) and `tailwind.config.js` (a v3 leftover that only set `darkMode`).
