import type { MetadataRoute } from "next";
import { backgrounds } from "@/data/background";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://backlab.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...backgrounds.map((bg) => ({
      url: `https://backlab.dev/patterns/${bg.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
