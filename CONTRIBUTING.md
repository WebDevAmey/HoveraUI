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

The registry (`src/app/api/registry/[slug]/route.ts`) is a static lookup built from those same data files at module load — no database, no auth, no network call. `npx shadcn add @hovera/<slug>` just fetches that JSON and copies the file in, exactly like shadcn's own registry.
