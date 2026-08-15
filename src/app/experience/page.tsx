import type { Metadata } from "next";
import Experience from "@/components/Experience";
import Awards from "@/components/Awards";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and awards of Zuemen Chu (朱廷翊): blockchain internship at Cathay Financial Holdings, research assistantship at NCCU MIS, and hackathon organizing.",
};

export default function ExperiencePage() {
  return (
    <main id="main-content" className="page-shell">
      <Experience />
      <Awards />
    </main>
  );
}
