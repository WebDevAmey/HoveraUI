import type { MetadataRoute } from "next";
import { docEntries } from "@/data/docs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://backlab.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://backlab.dev/components",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docEntries.map((entry) => ({
      url: `https://backlab.dev/components/${entry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
