# Changelog

All notable changes to the Hovera UI registry and site.

## 2026-11-23 — Hairline Accordion and Tile Accordion

### Added

- `hairline-accordion`: a quiet FAQ list between hairlines. Opening a row turns its plus into a minus (one bar swings half a turn, the other falls away) while the answer eases down and lifts into place.
- `tile-accordion`: each question on its own soft tile with a ring that firms on hover. Opening one swings its plus round into a cross with a slight overshoot as the answer grows in and fades up.

### Removed

- `line-accordion` and `shelf-accordion`, with their demos and registry items.

## 2026-11-23 — Branch Sidebar, Ruler Sidebar and Gloss Button

### Added

- `gloss-button`: a glazed button with a lighter top, a deeper rim, a lit inner edge and a soft cast shadow. It lifts a touch on hover and sinks on press (pointer or keyboard). Blue, ink and neutral tones, three sizes, and a rounded or pill shape.
- `ruler-sidebar`: a sidebar drawn as a fine ruler. Each row hangs off a tick with minor ticks between rows, the active tick reaches further out and its label slides with it, edges fade only while there is more to scroll, and one button slides the whole panel away to a hairline.
- `branch-sidebar`: a panel sidebar with quick search, collapsible groups on a hairline branch, a lit tick on the active row and one highlight that glides between rows.
- `branch-sidebar` feels smoother: a soft hover wash follows the pointer from row to row, the active highlight lands on a longer ease-out, rows press in slightly on click, and the active row no longer changes weight, so its text stays still.

### Removed

- `quiet-tooltip` and `rolling-number`, with their demos and registry items.
- The Inputs category: `stepped-otp`, `detent-slider` and `command-palette`. Site search keeps its palette as a site-only component.
- `dither-image` and `led-meter`, with their demos and registry items. The home page features `gloss-button` in place of the LED meter.

### Changed

- `ruler-sidebar` is calmer and has a character of its own: major and minor ticks now differ in length and weight, an accent needle with a bead glides to the active row, a loupe swells and darkens the ticks and labels under the pointer (and follows keyboard focus), and a header carries an optional title and the row count.

### Fixed

- The navbar no longer flashes a large dark box with a pale shadow on page load or reload. Its first measurement used to animate the shell down from its full open size; it now snaps into place, and the bar carries the same shadow before and after hydration.

## 2026-11-17 — A quieter, clearer site

### Changed

- Docs and component pages sit on one raised sheet; the sidebar is a flat list with a gliding active state and a search button.
- The components index shows every demo live, with category filters that also follow `#cat-<id>` links.
- Component pages: Preview and Code tabs share one frame, installation offers CLI (npm, pnpm, yarn, bun) or manual steps, long code folds, and an "On this page" guide tracks your place.
- Search opens from the sidebar, the hero, ⌘K or `/`, and matches descriptions and categories as well as names. `command-palette` gains an optional `keywords` field on items.
- Calmer motion: a shorter navbar morph, a quicker palette entrance, and no spring overshoot on `hover-reveal`. Copy icons swap from 80% scale instead of 50%.

### Fixed

- The navbar shell no longer clips the GitHub button when web fonts load after the first measure.

## 2026-11-16 — Fewer, finer components

### Added

- An Accordions category: the refined `plus-minus-accordion` and four new ones, `line-accordion`, `shelf-accordion`, `layer-accordion` and `cascade-accordion`.
- A morphing navbar: one dark shell that grows into the Components and Docs panels.

### Changed

- `fan-deck` is rebuilt: cards fan from a shared pivot with a staggered spread, lift on hover, and fit narrow containers.
- `plus-minus-accordion` animates height with grid rows, morphs plus into minus and survives rapid toggling.
- `anchor-popover` opens and closes with a short fade and offset, stays tied to its anchor and keeps its content while it exits.
- Previews are one clean stage with a replay button. The site uses one light theme.

### Removed

`stack-toast`, `morph-tabs`, `timeline-rail`, `orbit-gallery`, `sliding-segment`, `aura`, `pixel-wipe`, `ascii-resolve`, `grain`, `halftone-trail`, `dither-field`, `sky-cutout`, `slab-flip`, `corner-fold`, `gilded-frame`, `glass-specimen`, `split-label` and `detent-toggle`, with their registry items. The per-preview Fit, Mobile and theme controls.

## 2026-10-31 — Essentials and a calmer site

### Added

An Essentials category with six everyday components: `morph-button`, `glide-tabs`, `soft-switch`, `quiet-tooltip`, `rolling-number` and `copy-field`. Each ships with a live demo, props, accessibility notes and a registry item.

### Changed

- Warmer neutrals, and Newsreader replaces Instrument Serif as `--hv-font-serif`.
- The docs sidebar has a filter, group icons and counts, and a highlight that glides between items.
- Header search (⌘K) built on the Command Palette. Code is highlighted at build time.
- The landing page is now a centred hero, a curated bento of six live components, an install section and the FAQ.

## 2026-10-30 — A smaller, stranger library

Rebuilt from first principles. All previous components and their registry URLs are retired.

### Added

31 original components across buttons, cards, effects, inputs, navigation and feedback, each with a live demo, props table, accessibility notes and gzipped size. New token system (warm neutrals, one ultramarine accent, an expressive material palette), flash-free theming, and a registry generated directly from component source.

### Removed

Every earlier component, Framer Motion, Lenis, cmdk, Radix, lucide, next-themes, class-variance-authority, the preloader, custom cursor, smooth scroll and dock.

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
