import Hero from "@/components/Hero";
import HomeDemos from "@/components/HomeDemos";
import WorkTracks from "@/components/WorkTracks";
import Recognition from "@/components/Recognition";
import Workplaces from "@/components/Workplaces";
import News from "@/components/News";
import Contact from "@/components/Contact";
import styles from "./page.module.css";

/**
 * Written for a reader from investment or a startup, in the order they ask:
 * what is the bet (Hero), does it work (the replays), how deep does it go
 * (three theses with their projects), has anyone else judged it
 * (Recognition), where has this person worked (Workplaces), what is moving
 * now (Recent Updates), and how do I reach them (Contact).
 */
export default function Home() {
  return (
    <main id="main-content" className={styles.main}>
      <Hero />
      <HomeDemos />
      <WorkTracks />
      <Recognition />
      <Workplaces />
      <News />
      <Contact />
    </main>
  );
}
