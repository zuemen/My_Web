import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zuemen.net";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/notes`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
