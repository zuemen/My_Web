import { pageMetadata } from "@/lib/seo";
import NotesContent from "@/components/NotesContent";
import styles from "./page.module.css";

export const generateMetadata = pageMetadata({
  path: "/notes",
  title: "Notes",
  description:
    "Reading notes and short writings by Zuemen Chu on Quantum Finance and Smart Contract Security — coming soon.",
});

export default function NotesPage() {
  return (
    <main id="main-content" className={styles.main}>
      <NotesContent />
    </main>
  );
}
