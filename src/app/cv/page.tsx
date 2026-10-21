import { pageMetadata } from "@/lib/seo";
import CVContent from "@/components/CVContent";
import styles from "./page.module.css";

export const generateMetadata = pageMetadata({
  path: "/cv",
  title: "CV",
  description:
    "Curriculum Vitae of Ting-Yi Chu (Zuemen): blockchain trust infrastructure, self-sovereign identity and smart contract security. NCCU MIS, Cathay Financial Holdings, TABEI.",
});

export default function CVPage() {
  return (
    <main id="main-content" className={styles.main}>
      <CVContent />
    </main>
  );
}
