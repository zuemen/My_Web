import type { MetadataRoute } from "next";

/**
 * lastModified is the date the page's content last changed, not the build time
 * (every deploy used to mark all pages as updated). Bump a date when that page's
 * content changes. /notes is left out until it has a post (it is noindex).
 */
const PAGES: { path: string; updated: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { path: "", updated: "2026-10-25", changeFrequency: "monthly", priority: 1 },
  { path: "/research", updated: "2026-10-21", changeFrequency: "monthly", priority: 0.8 },
  { path: "/experience", updated: "2026-10-25", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", updated: "2026-10-25", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects/pepelab", updated: "2026-10-21", changeFrequency: "monthly", priority: 0.7 },
  { path: "/cv", updated: "2026-10-25", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zuemen.net";
  return PAGES.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: new Date(`${p.updated}T00:00:00+08:00`),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
