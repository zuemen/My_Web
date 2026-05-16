import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Zuemen Chu's research projects: SSI medical data framework, RWA tokenization, and quantum ML simulations.",
};

export default function ProjectsPage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "64px" }}>
      <Projects />
    </main>
  );
}
