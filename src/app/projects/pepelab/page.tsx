import { pageMetadata } from "@/lib/seo";
import PepeLabContent from "@/components/PepeLabContent";
import styles from "./page.module.css";

export const generateMetadata = pageMetadata({
  path: "/projects/pepelab",
  // Title and description kept within ~60 and 155 characters so search results don't truncate them.
  title: "MedSSI — Health Credential Verification",
  description:
    "MedSSI: SSI health credentials that let a patient show a pharmacy only what it needs. Merit Award, MODA Digital Credential Scenario Innovation Challenge.",
});

export default function PepeLabPage() {
  return (
    <main id="main-content" className={styles.main}>
      <PepeLabContent />
    </main>
  );
}
