# Hovera UI

A shadcn-compatible component registry of animated buttons, backgrounds, loaders, and navbars — built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion. Every component ships as a real [shadcn registry item](https://ui.shadcn.com/docs/registry): browse it live, copy the code, or install it straight into your project with the shadcn CLI.

## Install a component

```bash
npx shadcn@latest add https://<registry-host>/r/<slug>.json
```

Each component's doc page shows the exact command (with npm/pnpm/yarn/bun variants), a live interactive preview, the full source, and a props table.

## What's inside

- **Buttons** — ~40 hover/press interaction studies (glow, liquid fill, magnetic, scan rings, …)
- **Backgrounds** — ~24 gradients and patterns
- **Loaders & Navbars** — spinners, dot loaders, animated navigation bars
- **Registry pipeline** — `scripts/build-registry.mjs` builds `public/r/<slug>.json` per item plus a `registry.json` index from the data files in `src/data/`; there's no backend or database.

## Run it locally

```bash
npm install
npm run dev   # builds the registry first (predev), then starts Next.js
```

Open [http://localhost:3000](http://localhost:3000). The registry files are served from `/r/<slug>.json`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · next-themes · class-variance-authority

## Contributing

Components are added by pull request — no forms, no backend. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full flow and the quality bar (reduced-motion support, focus states, light/dark coverage are all required).
