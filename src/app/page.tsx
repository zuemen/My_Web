import Hero from "@/components/Hero";
import News from "@/components/News";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div
        className={styles.gridPattern}
        aria-hidden="true"
      />
      <Hero />
      <News />
      <Skills />
      <Contact />
    </main>
  );
}
