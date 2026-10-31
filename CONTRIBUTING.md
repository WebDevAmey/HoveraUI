# Contributing

HoveraUI grows slowly on purpose. A new component has to bring an idea that does not already exist in other libraries.

## Add a component

1. Create `src/components/ui/<slug>/` with four files:
   - `<slug>.tsx`: the component. Import only `react`, `@/lib/cn` and `./<slug>.module.css`.
   - `<slug>.module.css`: its styles, using `--hv-*` tokens.
   - `demo.tsx`: a default-exported `Demo` for the site.
   - `meta.ts`: name, one-line description, category, material, props, usage and accessibility notes.
2. Register it in `src/registry/index.ts`.
3. Run `npm run typecheck && npm run lint && npm run build`.
4. Open a pull request.

## Quality bar

- Works in both themes and at 360px wide.
- Full keyboard support and a visible focus ring. Every hover effect has a focus and touch equivalent.
- Animates only `transform` and `opacity` where possible, and respects `prefers-reduced-motion`.
- Canvas and animation loops pause off-screen and in background tabs.
- No layout shift, no hydration warnings, no new npm dependencies.
