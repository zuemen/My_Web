import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import SelectedWork from "@/components/SelectedWork";
import News from "@/components/News";
import Contact from "@/components/Contact";
import styles from "./page.module.css";

/**
 * Order follows the questions a reader arrives with: who is this (Hero), what
 * do they work on (Research Areas), what have they built (Selected Work),
 * what are they doing now (Recent Updates), how do I reach them (Contact).
 * Work used to be missing from the homepage entirely.
 */
export default function Home() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.gridPattern} aria-hidden="true" />
      <Hero />
      <Skills />
      <SelectedWork />
      <News />
      <Contact />
    </main>
  );
}
