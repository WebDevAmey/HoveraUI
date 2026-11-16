export type Release = {
  date: string;
  title: string;
  body: string;
  tags: string[];
};

/** Newest first. Earlier entries summarise CHANGELOG.md. */
export const releases: Release[] = [
  {
    date: "2026-11-17",
    title: "A quieter, clearer site",
    body: "Pages sit on one raised sheet beside a flat sidebar. The components index runs every demo live, with category filters. Component pages switch between Preview and Code in one frame, install by CLI for npm, pnpm, yarn or bun or by hand, fold long code, and keep an \u201cOn this page\u201d guide. Search opens from the sidebar, the hero, \u2318K or / and also matches descriptions. Motion across the site and a few components is shorter and calmer.",
    tags: ["Site"],
  },
  {
    date: "2026-11-16",
    title: "Fewer, finer components",
    body: "The library is cut to 25 components and every one is held to the same bar. Accordions get their own section with four new pieces: Line, Shelf, Layer and Cascade. Plus-Minus Accordion, Anchor Popover and Fan Deck are reworked for smoother motion. The site moves to one light theme, a morphing navigation bar and a preview stage with nothing but the component on it. Eighteen components are retired.",
    tags: ["Release", "Cut", "Site"],
  },
  {
    date: "2026-10-31",
    title: "Essentials and a calmer site",
    body: "Six clean everyday components join the library: Morph Button, Glide Tabs, Soft Switch, Quiet Tooltip, Rolling Number and Copy Field. The site moves to a warm palette with Newsreader headlines, a sidebar with a filter and a gliding highlight, ⌘K search and highlighted code.",
    tags: ["Release", "Site"],
  },
  {
    date: "2026-10-30",
    title: "A smaller, stranger library",
    body: "Rebuilt from first principles: 31 original components across six categories, each with one idea, one material and zero runtime dependencies beyond React. New token system, new docs, a registry generated straight from source.",
    tags: ["Release", "Breaking"],
  },
  {
    date: "2026-07-06",
    title: "The monochrome cut",
    body: "Trimmed the catalogue from 86 items to 36 and moved every surviving component to a strict black and white palette.",
    tags: ["Cut"],
  },
  {
    date: "2026-07-06",
    title: "Site redesign",
    body: "New landing page, gallery and component pages, and the first installable shadcn registry.",
    tags: ["Site"],
  },
];
