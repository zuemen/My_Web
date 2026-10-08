"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { tracks } from "@/data/tracks";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

/**
 * Every project, grouped by the thesis it is evidence for. Each card links to
 * its case study where one exists; the anchors (#mandates, #chainlens …) are
 * what the homepage and the proof bar link to.
 */
const Projects = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="projects" className={styles.projects}>
      <div className="section-wide">
        <SectionHeading
          wide
          as="h1"
          eyebrow={t(dict.sections.selectedWorkEyebrow)}
          title={t(dict.sections.projectsTitle)}
          subtitle={t(dict.sections.projectsSubtitle)}
        />

        {tracks.map((track, i) => {
          const inTrack = projects.filter((p) => p.track === track.id);
          if (inTrack.length === 0) return null;
          return (
            <div key={track.id} id={track.id} className={styles.track}>
              <header className={styles.trackHead}>
                <span className={styles.trackIndex}>
                  {track.id === "earlier" ? "—" : String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className={styles.trackTitle}>{t(track.title)}</h2>
                  <p className={styles.trackThesis}>{t(track.thesis)}</p>
                </div>
              </header>
              <div className={styles.grid}>
                {inTrack.map((p) => (
                  <div key={p.slug} id={p.slug} className={styles.cell}>
                    <ProjectCard project={p} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
