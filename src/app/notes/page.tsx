import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short writings and research notes by Zuemen Chu on quantum computing, blockchain, and AI.",
};

export default function NotesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Notes</h1>
        <p className={styles.subtitle}>
          Short writings on quantum computing, blockchain, and AI &mdash; coming soon.
        </p>
        <div className={styles.placeholder}>
          <span className={styles.mono}>{"// drafts in progress"}</span>
        </div>
      </div>
    </main>
  );
}
