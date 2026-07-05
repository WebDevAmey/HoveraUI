# Contributing to Hovera UI

Hovera UI has no backend, no submission form, and no account system, by design — the same as shadcn/ui. Adding a component means opening a pull request, not filling out a form.

## Add a component

1. Pick the category and create your component under `src/components/{buttons,loaders,navbars,backgrounds}/` as a plain React component (see any existing file in that folder for the pattern).
2. Add an entry in the matching data file, `src/data/{button,loader,navbar,background}.ts`. Each entry needs:
   - `name` — display name shown on its card.
   - `slug` — unique, kebab-case, used for the URL and the registry file name.
   - `category` — used for the badge and sidebar filter.
   - `component` — the component you just added.
   - `code` — the exact JSX/Tailwind snippet shown in "Copy code" and served by the registry. Keep it copy-paste runnable on its own, and keep it in sync with the component — they are two representations of the same thing.
   - Registry metadata as applicable: `dependencies` (npm packages the snippet imports), `registryDependencies` (other Hovera items it composes), and `cssVars` (any `--hovera-*` tokens the snippet references, with light and dark values). If your snippet uses `var(--anything)` that isn't a stock shadcn token, it must ship `cssVars`, or it will render broken in consumer apps.
3. Add a documentation entry (required, not optional): create `src/data/docs/<slug>.ts` exporting a `ComponentDocEntry` (see `src/types/docs.ts`) or add it to the category file in `src/data/docs/`, then register it in `src/data/docs/index.ts`. Every component page routes through `/docs/<slug>` — an item without a doc entry has no page at all. The sidebar (`src/data/docs/nav.ts`) picks it up automatically from the data arrays.
4. Run `npm run build:registry && npm run build && npm run lint && npx tsc --noEmit` — all four must pass.
5. Open a PR.

That's it — there's no review queue or moderation step beyond normal PR review.

## How installs work (no backend)

`npm run build:registry` (wired as `predev`/`prebuild`, implemented in `scripts/build-registry.mjs`) reads the data files and writes one shadcn `registry-item.json`-shaped file per component to `public/r/<slug>.json`, plus a `public/r/registry.json` index. The shadcn CLI fetches those static files directly:

```bash
npx shadcn@latest add ${NEXT_PUBLIC_REGISTRY_URL}/r/<slug>.json
```

Set `NEXT_PUBLIC_REGISTRY_URL` in `.env.local` (see `.env.example`) to whatever host you deploy to. Consumers can also opt into the `@hovera/<slug>` shorthand by adding `"registries": { "@hovera": "<host>/r/{name}.json" }` to their own `components.json` — this is verified working with the current shadcn CLI, but the full-URL form is what every doc page shows since it needs no setup.

## Quality bar for new components

- Framer Motion for animation, GPU-accelerated transforms/opacity only.
- `prefers-reduced-motion` respected in every animated component (see `src/lib/motion.ts`).
- Visible `focus-visible` states on every interactive element.
- Works in both light and dark themes using the tokens in `src/app/globals.css`.
- Doc prose explains the interaction rationale (see `src/data/docs/buttons.ts` for the bar), not just what the component is called.
