import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Zuemen Chu's research projects: decentralized credential verification (SSI/VC/DID), RWA tokenization, and quantum ML simulations.",
};

export default function ProjectsPage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "64px" }}>
      <Projects />
    </main>
  );
}
