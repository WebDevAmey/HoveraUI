# HoveraUI

A small library of original React components. Each one is built around a single idea, made from a single material, and shipped as source you copy into your project.

## Philosophy

- **One idea per component.** A keycap with a real wall. A fill that arrives through a dither matrix. A sky behind a cutout. If an idea already exists in another library, it does not belong here.
- **Quiet frame, loud materials.** The site and tokens are near-monochrome with one ultramarine accent. Character lives inside the components: pixels, glass, clay, paper, gilt and light.
- **Physical, short motion.** Interactions run 150 to 300ms on springs and ease-outs. Ambient loops are slow, pause off-screen and stop under reduced motion. Nothing needs animation to work.
- **Accessible by default.** Native elements first, full keyboard support, visible focus, WCAG AA text contrast, and a touch or keyboard equivalent for every hover.
- **No dependencies.** Each component imports React, a six-line `cn` helper and its own CSS module. That is all.

## Install

1. Copy [`src/styles/tokens.css`](src/styles/tokens.css) into your project and import it from your global stylesheet.
2. Copy [`src/lib/cn.ts`](src/lib/cn.ts) to `lib/cn.ts` (the components import it as `@/lib/cn`).
3. Open a component on the site, copy its `.tsx` and `.module.css` into `components/ui/<name>/`, and import it.

```tsx
import { DepthKey } from "@/components/ui/depth-key/depth-key";

<DepthKey variant="accent" onClick={publish}>Publish</DepthKey>;
```

Every component is also a shadcn-compatible registry item, generated from the same files:

```bash
npx shadcn@latest add https://<your-host>/r/depth-key.json
```

Fonts are optional. The tokens use Geist, Geist Mono and Newsreader (all OFL) when they are loaded through `next/font` with the variables `--font-geist-sans`, `--font-geist-mono` and `--font-newsreader`, and fall back to system stacks otherwise.

## Theming

With no attribute, the system colour scheme decides. Set `data-theme="light"` or `data-theme="dark"` on `<html>` to force a theme, or on any element to theme just that subtree. Every token is listed in [`docs/PLAN.md`](docs/PLAN.md) and on the `/docs/tokens` page.

## Components

| Category | Components |
| --- | --- |
| Buttons | Depth Key, Dither Fill, Pillow Press, Split Label, Hold to Confirm, Detent Toggle |
| Cards | Glass Specimen, Dither Image, Fan Deck, Gilded Frame, Corner Fold, Perforated Ticket, Slab Flip, Sky Cutout |
| Effects | Dither Field, Halftone Trail, Grain, ASCII Resolve, Pixel Wipe, Aura |
| Inputs | Sliding Segment, Stepped OTP, Detent Slider, Command Palette |
| Navigation | Orbit Gallery, Plus-Minus Accordion, Timeline Rail, Morph Tabs |
| Feedback | Stack Toast, LED Meter, Anchor Popover |

## Develop

```bash
npm install
npm run dev        # builds the registry, then starts the site on :3000
npm run typecheck
npm run lint
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the deployed origin so registry links and install commands point at it. The site is static and deploys to Vercel with no configuration.

### Layout

```
src/components/ui/<slug>/   <slug>.tsx, <slug>.module.css, demo.tsx, meta.ts
src/components/site/        site chrome: header, sidebar, search, footer, preview, code view
src/registry/               index of every component, source reader, types
src/styles/tokens.css       the only shared stylesheet
scripts/build-registry.mjs  writes public/r/*.json and per-component sizes
```

Docs pages read each component's real files at build time, so the source, demo and props on the site can never drift from what ships.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: one idea, one folder, no new dependencies, both themes, keyboard and reduced motion covered.

## License

[MIT](LICENSE)
