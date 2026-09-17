import type { Metadata } from "next";
import Philosophy from "@/components/Philosophy";
import ResearchFocus from "@/components/ResearchFocus";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Zuemen Chu's research areas: Self-Sovereign Identity (SSI/VC/DID), Smart Contract Security, RWA Tokenization, and Quantum Finance.",
};

export default function ResearchPage() {
  return (
    <main id="main-content" className={styles.main}>
      <Philosophy />
      <ResearchFocus />
    </main>
  );
}
