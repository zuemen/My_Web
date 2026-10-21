import { pageMetadata } from "@/lib/seo";
import PepeLabContent from "@/components/PepeLabContent";
import styles from "./page.module.css";

export const generateMetadata = pageMetadata({
  path: "/projects/pepelab",
  title: "MedSSI — Decentralized Health Credential Verification",
  description:
    "MedSSI (team PepeLab): a decentralized health credential verification system built on SSI, VC, and DID standards, so a patient discloses only the fields each pharmacy, researcher or insurer needs. Merit Award, Digital Credential Scenario Innovation Challenge (Ministry of Digital Affairs, Taiwan).",
});

export default function PepeLabPage() {
  return (
    <main id="main-content" className={styles.main}>
      <PepeLabContent />
    </main>
  );
}
