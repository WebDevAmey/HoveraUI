# Contributing to Hovera UI

Hovera UI has no backend, no submission form, and no account system, by design — the same as shadcn/ui. Adding a component means opening a pull request, not filling out a form.

## Add a component

1. Pick the category: `src/components/{buttons,loaders,navbars,backgrounds}/`.
2. Create your component there as a plain React component (see any existing file in that folder for the pattern).
3. Add an entry for it in the matching data file: `src/data/{button,loader,navbar,background}.ts`. Each entry needs:
   - `name` — display name shown on its card.
   - `slug` — unique, kebab-case, used for the URL and the `npx shadcn add @hovera/<slug>` command.
   - `category` — used for the badge and sidebar filter.
   - `component` — the component you just added.
   - `code` — the exact JSX/Tailwind snippet shown in "Copy code" and served by the registry. Keep it copy-paste runnable on its own.
4. Open a PR.

That's it — there's no review queue or moderation step beyond normal PR review.

## Why no backend

The registry (`src/app/api/registry/[slug]/route.ts`) is a static lookup built from those same data files at module load, no database, no auth, no network call. The same data also gets written out as static files in `public/r/<slug>.json` by `npm run build:registry` (wired as `predev`/`prebuild`), which is what the shadcn CLI actually fetches in production via `npx shadcn@latest add ${NEXT_PUBLIC_REGISTRY_URL}/r/<slug>.json`. Set `NEXT_PUBLIC_REGISTRY_URL` in `.env.local` (see `.env.example`) to whatever host you deploy to.

## Adding a full documentation page (optional)

A handful of components (currently `glow-button` and `spinner-loader`) also render through the richer doc template at `/docs/<slug>` instead of the older flat `/components/<slug>` page. To opt a component into that template:

1. Add a `src/data/docs/<slug>.ts` file exporting a `ComponentDocEntry` (see `src/types/docs.ts`): `slug`, `name`, `description`, `category`, `Preview` (a real React component, wrap your component in a small props-driven demo if it needs configurable props for the Props table), `code`, `usage`, `dependencies`, and `props`.
2. Register it in `src/data/docs/index.ts` and add a nav entry in `src/data/docs/nav.ts`.

This is optional. Components that skip it keep working on the existing `/components/<slug>` page, no change to the basic contribution flow above.
