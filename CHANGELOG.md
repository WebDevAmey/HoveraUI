# Changelog

All notable changes to the Hovera UI registry and site.

## 2026-07-06

### Registry schema (breaking for tooling that parsed the old output)

- Registry items now emit the full shadcn `registry-item.json` surface when present:
  `description`, `dependencies`, `registryDependencies`, `cssVars`, `tailwind`.
  Descriptions are auto-joined from the doc entries, so every one of the 83 items has one.
- Added `public/r/registry.json` — a shadcn `registry.json` index of all items
  (files listed without inline content).
- `scripts/build-registry.mjs` now ships full-module snippets verbatim (imports,
  hooks, `"use client"`); bare-JSX snippets are still wrapped in a component as before.
- Added root `components.json` so the repo can self-consume its own registry.
- Note: no `version` field was added to `registry.json` — the shadcn registry
  schema does not define one. Versioning lives in this changelog instead.

### Install story (verified against the real shadcn CLI)

- Full-URL install (always works): `npx shadcn@latest add <host>/r/<slug>.json`
- Namespaced shorthand (opt-in): add to your project's `components.json`:
  ```json
  "registries": { "@hovera": "https://<registry-host>/r/{name}.json" }
  ```
  then `npx shadcn@latest add @hovera/<slug>`. Verified working, including
  automatic npm dependency installation (`framer-motion`, `@radix-ui/react-tabs`, `cmdk`).

### New components (16)

- **Cards**: Spotlight Card, Tilt Card
- **Tabs**: Animated Tabs (Radix + spring layout pill)
- **Marquee**: Marquee
- **Navbars**: Floating Navbar (scroll-direction aware)
- **Loaders**: Skeleton Loader
- **Backgrounds**: Aurora Flow, Beams, Particle Field — the first animated backgrounds
- **Text**: Text Reveal, Typewriter, Gradient Text
- **Sections**: Bento Grid, Timeline, Testimonial Carousel
- **Command**: Command Menu (cmdk)

All new components: GPU-accelerated transforms/opacity only, `prefers-reduced-motion`
respected with a designed fallback (not just disabled), focus-visible states, touch
guards where cursor-driven, and registry metadata (real `dependencies`) from day one.

### Accessibility & site

- Every button and navbar registry item (41 components + their registry snippets)
  gained `focus-visible` outlines, kept in lockstep between the live component and
  the installable code string.
- `CommandPalette` rebuilt on `cmdk`: combobox ARIA, filtering, and keyboard
  navigation now come from the library. The long-standing `jsx-a11y` combobox
  warning is resolved; `eslint` is fully clean.
- Component gallery gained filter pills for the six new categories; landing page
  gained a "New arrivals" section with live previews.
- `CONTRIBUTING.md` corrected (no fictional `@hovera` alias claim, no fictional
  flat `/components/<slug>` route; doc entries documented as required) and
  `README.md` replaced create-next-app boilerplate.
