# Changelog

All notable changes to the Hovera UI registry and site.

## 2026-07-06 — The Monochrome Cut (86 → 32 → 36 items)

HoveraUI is now a curated monochrome effect library: every component expresses
through light, shadow, blur, displacement and motion — never color.

### Added (4 signature effects)

`displacement-text`, `liquid-text`, `light-lines`, `pixel-trail` — all pure
black/white, reduced-motion-safe, registry snippets byte-identical to the live
components.

### Removed (54 retired slugs — install URLs now 404)

`aether-navbar`, `aurora`, `aurora-warm`, `blob-hover-button`, `border-reveal`, `bouncing-dots-loader`, `conic-swirl`, `crosshatch`, `diagonal-lines`, `dot-grid`, `dot-matrix`, `duotone-drift`, `ember-drift`, `frosted-glass-button`, `glass-shard`, `glow-button`, `gradient-link-button`, `gradient-text`, `grid-pattern`, `hex-grid`, `hover-arrow-button`, `link-button`, `luminance-flux-button`, `magma-vein`, `marquee`, `mesh-gradient`, `neon-swipe-button`, `new-button`, `noise-veil`, `outline-button`, `play-now-button`, `press-button`, `prism-spectrum`, `radical-navbar`, `read-more-button`, `rivet-press-button`, `rose-border-button`, `shimmer-swipe-button`, `skeleton-loader`, `slide-fill-button`, `slide-text-button`, `spinner-loader`, `spotlight-2`, `spotlight-3`, `spotlight-4`, `spotlight-5`, `spotlight-6`, `square-pattern`, `swipe-button`, `testimonial-carousel`, `timeline`, `underline-hover-button`, `vertex-navbar`, `violet-border-button`

### Changed

- All 32 surviving components converted to strict monochrome (chromatic hues →
  neutral scale, colored glows → grayscale via max-channel; BorderBeam is now a
  white-head/gray-tail comet). Registry snippets stayed byte-identical to sources.
- Site IA: component pages moved to `/components/<slug>` (old `/docs/<slug>`
  URLs 301 for survivors), gallery at `/components`, six real guide pages under
  `/docs/*`, sidebar split into Documentation / Components.
- Homepage rebuilt effect-forward: the hero headline IS the DisplacementText
  component over the LightLines component; live signature bento; quick-start
  with copy buttons. WebGL chrome (`ogl`) removed — the effects are the wow.
- Glow/gradient color tokens removed from `globals.css`; chrome is pure B&W.
- Lighthouse (prod): desktop 99 perf / 100 a11y; mobile 88 perf / 100 a11y
  (FCP 0.9s, TBT 0ms, CLS 0; remaining mobile LCP gap is the webfont repaint
  under 4G throttling).

## 2026-07-06 — Site redesign (glow identity)

### New components (3 → 86 items total)

- **Border Beam** (cards): a light lapping the card border, one composited rotation
- **Magnetic Button** (buttons): spring-pulled toward the cursor, mouse-only
- **Meteors** (backgrounds): staggered CSS streaks over a dotted night field

### Site experience (chrome only — library components untouched)

- Signature glow identity: `--glow-1`/`--glow-2` (electric violet → cyan),
  `--gradient-brand`/`--gradient-glow` tokens added alongside the monochrome set
- Lenis smooth scroll app-wide (root mode, so native scroll events and the
  docs scroll-spy keep working); disabled under `prefers-reduced-motion`
- Cinematic hero: ogl WebGL duotone glow (dynamically imported, DPR-capped,
  pauses off-screen, CSS poster fallback), per-word kinetic headline,
  scroll-linked parallax; the hero is a scoped dark panel in both themes
- Pinned three-beat story section (`AnticipatoryScenes`), velocity-coupled
  marquee, count-up stats (now counting all 10 data arrays), gradient CTA ring
- Once-per-session preloader, custom magnetic cursor (fine pointers only),
  CSS-driven route transitions via `template.tsx`
- Hydration-safe reduced-motion handling (`useReducedMotionSafe`) across all
  structurally-branching chrome; `AnimatedTabs` snippet fixed for SSR consumers
- Verified in a real browser: zero console errors full-motion and reduced-motion,
  docs TOC tracks under Lenis, WebGL/preloader/cursor/Lenis all disabled under
  reduced motion. Lighthouse (prod build, desktop): **99 performance /
  100 accessibility**, LCP 0.8s, CLS 0. Mobile-emulated: 63 performance
  (throttled hydration cost; acceptable for a desktop-first showcase).
  Screenshots in `.github/screens/`.

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
