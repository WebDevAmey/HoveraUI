# Plan

HoveraUI becomes 31 copy-paste React components, each with one idea, shown on a calm near-monochrome site. The site stays quiet so the components can be loud in their own materials: pixels, paper, glass, soft clay, gilt and sky.

## Components

Every component lists the material it explores. Items marked with † replace a brief idea that turned out to be a clone of existing libraries.

| # | Component | Category | Material | Idea |
| --- | --- | --- | --- | --- |
| 1 | Depth Key | Buttons | Tactile | Keycap with a visible side wall; press travels down and the wall compresses. Light, dark, accent. |
| 2 | Dither Fill | Buttons | Pixel | A 4×4 Bayer matrix fills the button threshold by threshold on hover and focus, then drains on leave. |
| 3 | Pillow Press † | Buttons | Neumorphism | Replaces Magnetic Pill. A soft extruded pill that sinks into the surface on press; light and shade swap sides. |
| 4 | Split Label | Buttons | Editorial | The sans label splits on a hairline and slides apart to reveal a second verb set in italic serif. |
| 5 | Hold to Confirm | Buttons | Tactile | Press and hold fills a progress ring; early release drains it. Keyboard hold and live status. |
| 6 | Detent Toggle | Buttons | Neumorphism | A switch whose knob climbs a visible detent ridge and settles with a small overshoot. |
| 7 | Glass Specimen † | Cards | Glass | Replaces Tilt Specimen's generic sheen. A frosted pane over a colour field that tilts and refracts a specular band. |
| 8 | Dither Image | Cards | Pixel | An image drawn through two-tone ordered dither that resolves to full colour on hover or focus. |
| 9 | Fan Deck | Cards | Tactile | A stack that fans like a hand of cards; one card can be picked and lifts out. |
| 10 | Gilded Frame † | Cards | Luxury | Replaces Spotlight Edge. A double hairline frame with serif numerals and a gilt foil band that follows the light. |
| 11 | Corner Fold | Cards | Paper | The corner peels back with a real curl shadow to show a note underneath. |
| 12 | Perforated Ticket | Cards | Luxury type | Ticket with notches, a perforated line and a stub that tears off and can be reattached. |
| 13 | Slab Flip | Cards | Physical | A flip card with real thickness: the edge is visible while it rotates. |
| 14 | Sky Cutout † | Cards | Surreal | Replaces Loop Tile. A cutout in an ordinary card opens onto a drifting sky that moves against the pointer. |
| 15 | Dither Field | Effects | Pixel | Animated ordered-dither gradient on canvas. Pauses off-screen, static under reduced motion. |
| 16 | Halftone Trail | Effects | Print | The pointer leaves a fading trail of halftone dots. Touch draws the same trail. |
| 17 | Grain | Effects | Film | A static SVG-noise overlay with intensity and blend controls. No animation, no JS. |
| 18 | ASCII Resolve | Effects | Terminal | Content resolves from a field of glyphs into its final render, column by column. |
| 19 | Pixel Wipe | Effects | Pixel | A section transition that covers and reveals content in stepped pixel blocks. |
| 20 | Aura | Effects | Ethereal | A soft halo that breathes at a resting rate, made from layered conic and radial gradients. |
| 21 | Sliding Segment | Inputs | Elastic | Segmented control whose thumb stretches toward its target, then settles. |
| 22 | Stepped OTP | Inputs | Mechanical | One-time code input; each digit drops in on a stepped curve. Paste fills every slot. |
| 23 | Detent Slider | Inputs | Mechanical | Slider with tick marks, snap detents, value readout and keyboard steps. |
| 24 | Command Palette | Inputs | Glass | Keyboard-first palette with grouped results and a small fuzzy matcher. |
| 25 | Orbit Gallery | Navigation | Ethereal | Items on a slow ring around a mark. Hover or focus pauses and opens a preview. |
| 26 | Plus-Minus Accordion | Navigation | Editorial | Circular toggle whose plus folds into a minus while the fill inverts; height animates with grid rows. |
| 27 | Timeline Rail | Navigation | Editorial | A date rail with nodes for changelogs and histories. |
| 28 | Morph Tabs | Navigation | Editorial | Chapter tabs with roman numerals; the indicator stretches from tab to tab. |
| 29 | Stack Toast | Feedback | Glass | Toasts stack with depth and fan out on hover or focus. |
| 30 | LED Meter | Feedback | Pixel | Segmented LED level meter, determinate or indeterminate. |
| 31 | Anchor Popover | Feedback | Paper | One popover whose arrow travels between anchors. Uses CSS anchor positioning where available. |

## File structure

```
src/
  app/                     site routes
  components/
    ui/<slug>/
      <slug>.tsx           the component (copy this)
      <slug>.module.css    its styles (copy this)
      demo.tsx             the live demo used on the site
      meta.ts              docs data: description, props, a11y notes
    site/                  site-only chrome (nav, footer, preview, code view)
  lib/cn.ts                the only shared helper
  registry/index.ts        imports every meta and demo
  styles/tokens.css        the only shared stylesheet
scripts/build-registry.mjs builds public/r/*.json and component sizes
```

Components import only React, `cn` and their own CSS module. Docs pages read the real source files at build time, so source, props and demo come from the same folder.

## Tokens

### Neutrals (site and components)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--hv-canvas` | `#F3F2EE` | `#0D0D0C` | Page |
| `--hv-surface` | `#FBFAF8` | `#151513` | Tiles, panels |
| `--hv-raised` | `#FFFFFF` | `#1C1C1A` | Popovers, inputs |
| `--hv-sunken` | `#EAE8E3` | `#090908` | Wells, tracks |
| `--hv-ink` | `#141412` | `#EDEBE6` | Primary text (16.5:1, 16.3:1) |
| `--hv-ink-2` | `#5B5852` | `#A19D95` | Secondary text (6.3:1, 7.2:1) |
| `--hv-ink-3` | `#8E8A83` | `#6B6862` | Icons and large labels only (3:1+) |
| `--hv-line` | `#E1DED7` | `#2A2926` | Hairlines |
| `--hv-line-strong` | `#CBC7BE` | `#3A3934` | Control borders |

### Accent (the only chroma on the site)

| Token | Light | Dark | Notes |
| --- | --- | --- | --- |
| `--hv-accent` | `#2E3FE0` | `#8B96FF` | Ultramarine. Focus rings, active states, one CTA style. 6.5:1 and 7.3:1 against canvas. |
| `--hv-accent-ink` | `#FFFFFF` | `#0D0D0C` | Text on accent (7.2:1, 7.3:1) |

### Expressive palette (inside components only)

| Token | Value | Material |
| --- | --- | --- |
| `--hv-gilt` / `--hv-gilt-hi` / `--hv-gilt-lo` | `#B4935A` / `#E9D6A6` / `#6E5228` | Luxury foil |
| `--hv-ether-1` / `-2` / `-3` | `#CFC8F5` / `#F6D5C4` / `#BFE0E6` | Ethereal lilac, peach, mist |
| `--hv-sky-hi` / `--hv-sky-lo` | `#7FA7DB` / `#F2D5C2` | Surreal dusk sky |
| `--hv-oxblood` | `#6B1F2A` | Editorial ink |
| `--hv-phosphor` / `--hv-amber` | `#7CE8A0` / `#FFB547` | LED and terminal |
| `--hv-neu-hi` / `--hv-neu-lo` | `#FFFFFF` / `#D2CEC6` (dark `#262623` / `#000000`) | Neumorphic light and shade |

### Type

| Token | Family | Use |
| --- | --- | --- |
| `--hv-font-sans` | Geist (OFL) | UI and prose |
| `--hv-font-mono` | Geist Mono (OFL) | Labels, metadata, code |
| `--hv-font-serif` | Instrument Serif (OFL), regular and italic | Display moments, luxury and editorial components |

Scale: 12, 13, 15, 18, 24, 36, and display `clamp(40px, 6vw, 76px)`. Headlines track at `-0.02em` to `-0.035em`; prose sits at 1.6 line-height.

### Space, shape, motion

- Space: Tailwind's 4px scale on the site; components use multiples of 4px.
- Radius: `--hv-r-1` 4px, `--hv-r-2` 8px, `--hv-r-3` 12px, `--hv-r-4` 20px, `--hv-r-pill`.
- Durations: `--hv-dur-1` 150ms, `--hv-dur-2` 220ms, `--hv-dur-3` 300ms, `--hv-dur-ambient` 18s.
- Easing: `--hv-ease-out` (expo-like out), `--hv-ease-in-out`, `--hv-ease-spring` (a CSS `linear()` spring with one small overshoot).
- Shadows exist only where depth is the idea (Depth Key, Pillow Press, Slab Flip, Fan Deck).

Theme: `data-theme="light|dark"` on any element re-scopes every token, so previews can show either theme inline. With no attribute, `prefers-color-scheme` decides. An inline head script restores the saved choice before first paint.

## Site map

| Route | Content |
| --- | --- |
| `/` | Calm hero with a live Dither Field and Orbit Gallery focal piece, a bento of featured components, the full gallery, FAQ (built with Plus-Minus Accordion), footer |
| `/components` | Gallery: category filter, search, 3/2/1 column tiles with live mini-demos |
| `/components/[slug]` | Sidebar by category, article (title, line, live preview with theme and width toggles, source with copy, props, usage, accessibility, size), right TOC with scroll-spy |
| `/docs` | Install, tokens, theming, copy-paste and registry usage |
| `/changelog` | Timeline Rail of releases |

Distribution: copy-paste first. `npm run build:registry` writes shadcn-compatible items to `public/r/<slug>.json`, so `npx shadcn add <host>/r/<slug>.json` also works.
