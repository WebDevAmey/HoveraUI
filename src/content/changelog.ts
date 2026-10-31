export type Release = {
  date: string;
  title: string;
  body: string;
  tags: string[];
};

/** Newest first. Earlier entries summarise CHANGELOG.md. */
export const releases: Release[] = [
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
