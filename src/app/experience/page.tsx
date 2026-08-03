import type { Metadata } from "next";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Zuemen Chu (朱廷翊): blockchain internship at Cathay Financial Holdings, research assistantship at NCCU MIS, and hackathon organizing.",
};

export default function ExperiencePage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "64px" }}>
      <Experience />
    </main>
  );
}
