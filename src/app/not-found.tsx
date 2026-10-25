import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className={styles.main}>
      <NotFoundContent />
    </main>
  );
}
