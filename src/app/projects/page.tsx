import { pageMetadata } from "@/lib/seo";
import Projects from "@/components/Projects";
import { projects } from "@/data/projects";

export const generateMetadata = pageMetadata({
  path: "/projects",
  title: "Projects",
  description:
    "Zuemen Chu's research projects: decentralized credential verification (SSI/VC/DID), RWA tokenization, and quantum ML simulations.",
});

const SITE = "https://zuemen.net";

/** ISO 8601 duration, e.g. 115.5 -> "PT1M56S". */
const isoDuration = (seconds: number) => {
  const s = Math.round(seconds);
  return `PT${Math.floor(s / 60)}M${s % 60}S`;
};

/**
 * One VideoObject per demo, so the videos can be picked up by video search.
 * Server-rendered like the Person JSON-LD in the layout. Upload date: the
 * current takes were published 2026-10-21.
 */
const videoLd = projects
  .filter((p) => p.video)
  .map((p) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${p.shortTitle.en} — demo`,
    description: p.summary.en,
    thumbnailUrl: `${SITE}${p.video!.poster}`,
    contentUrl: `${SITE}${p.video!.src}`,
    embedUrl: `${SITE}/projects#${p.slug}`,
    uploadDate: "2026-10-21",
    ...(p.video!.seconds ? { duration: isoDuration(p.video!.seconds) } : {}),
    inLanguage: "en",
  }));

export default function ProjectsPage() {
  return (
    <main id="main-content" className="page-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd).replace(/</g, "\\u003c") }}
      />
      <Projects />
    </main>
  );
}
