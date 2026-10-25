import { pageMetadata } from "@/lib/seo";
import Philosophy from "@/components/Philosophy";
import ResearchFocus from "@/components/ResearchFocus";
import ResearchPositions from "@/components/ResearchPositions";
import Publications from "@/components/Publications";
import styles from "./page.module.css";

export const generateMetadata = pageMetadata({
  path: "/research",
  title: "Research — Digital Trust Infrastructure",
  // Same four directions as the homepage Research Areas; under 155 characters.
  description:
    "Zuemen Chu's research on digital trust: blockchain & digital identity, smart contract security, quantum finance & QML, and agentic AI & agent payments.",
});

export default function ResearchPage() {
  return (
    <main id="main-content" className={styles.main}>
      <Philosophy />
      <ResearchPositions />
      <ResearchFocus />
      <Publications />
    </main>
  );
}
