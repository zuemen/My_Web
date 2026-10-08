import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title.en,
    description: project.summary.en,
    alternates: { canonical: `https://zuemen.net/projects/${slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!caseStudies.some((p) => p.slug === slug)) notFound();
  return (
    <main id="main-content" className="page-shell">
      <CaseStudy slug={slug} />
    </main>
  );
}
