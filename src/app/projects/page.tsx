import { pageMetadata } from "@/lib/seo";
import Projects from "@/components/Projects";

export const generateMetadata = pageMetadata({
  path: "/projects",
  title: "Projects",
  description:
    "Zuemen Chu's research projects: decentralized credential verification (SSI/VC/DID), RWA tokenization, and quantum ML simulations.",
});

export default function ProjectsPage() {
  return (
    <main id="main-content" className="page-shell">
      <Projects />
    </main>
  );
}
