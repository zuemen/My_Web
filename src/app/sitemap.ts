import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zuemen.net";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...caseStudies.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/projects/pepelab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/experience`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/cv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
