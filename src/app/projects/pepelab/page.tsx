import type { Metadata } from "next";
import PepeLabContent from "@/components/PepeLabContent";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "PepeLab — Decentralized Credential Verification",
  description:
    "A decentralized identity credential verification system built on SSI, VC, and DID standards for cross-institution credential exchange. Merit Award, Digital Credential Scenario Innovation Challenge (Ministry of Digital Affairs, Taiwan).",
};

export default function PepeLabPage() {
  return (
    <main id="main-content" className={styles.main}>
      <PepeLabContent />
    </main>
  );
}
