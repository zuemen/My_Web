import type { Metadata } from "next";
import Philosophy from "@/components/Philosophy";
import ResearchFocus from "@/components/ResearchFocus";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About & Research",
  description:
    "Zuemen Chu's research: bounded authority for AI agents that move money, verifiable organisational identity (vLEI, SSI), explainable on-chain risk, smart contract security and quantum computing.",
};

export default function ResearchPage() {
  return (
    <main id="main-content" className={styles.main}>
      <Philosophy />
      <ResearchFocus />
    </main>
  );
}
