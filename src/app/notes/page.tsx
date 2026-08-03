import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Reading notes and short writings by Zuemen Chu on Quantum Finance and Smart Contract Security — coming soon.",
};

export default function NotesPage() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.container}>
        <p className={styles.label}>{"// coming soon"}</p>
        <h1 className={styles.title}>Notes</h1>
        <p className={styles.subtitle} lang="zh-Hant">
          這裡會放關於 Quantum Finance 與 Smart Contract Security
          的閱讀筆記與短文。第一篇預計 2026-Q3 上線。
        </p>
        <p className={styles.rssNote}>
          RSS feed will be available when the first post publishes.
        </p>
      </div>
    </main>
  );
}
