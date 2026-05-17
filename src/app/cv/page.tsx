import type { Metadata } from "next";
import Experience from "@/components/Experience";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum Vitae of Zuemen Chu — Research Assistant at NCCU MIS. Experience in quantum finance and blockchain research.",
};

export default function CVPage() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Curriculum Vitae</h1>
        </div>
      </div>
      <Experience />
    </main>
  );
}
