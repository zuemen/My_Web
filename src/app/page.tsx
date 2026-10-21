import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import SelectedWork from "@/components/SelectedWork";
import Now from "@/components/Now";
import News from "@/components/News";
import Contact from "@/components/Contact";
import styles from "./page.module.css";
import { SITE_URL } from "@/data/site";

// Title, description and Open Graph come from the layout, which describes
// the homepage. Only the canonical lives here, so subpages do not inherit it.
export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

/**
 * Order follows the questions a reader arrives with: who is this (Hero), what
 * do they work on (Research Areas), what have they built (Selected Work),
 * what are they doing now (Now, then Recent Updates), how do I reach them
 * (Contact).
 * Work used to be missing from the homepage entirely.
 */
export default function Home() {
  return (
    <main id="main-content" className={styles.main}>
      <Hero />
      <Skills />
      <SelectedWork />
      <Now />
      <News />
      <Contact />
    </main>
  );
}
