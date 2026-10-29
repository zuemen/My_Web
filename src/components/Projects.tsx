"use client";

import Image from "next/image";
import Link from "next/link";

import { Code, Award, ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import DemoVideo from "./DemoVideo";
import { projects } from "@/data/projects";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import styles from "./Projects.module.css";

/**
 * One entry per project, full container width: a header (category, title,
 * one-line lead), the demo video across the page, then the description beside
 * a narrow column of facts. No panels or pills — rules and spacing carry the
 * structure, so the videos are what the eye lands on.
 */
const Projects = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="projects" className={styles.projects}>
      <div className="section-wide">
        <SectionHeading
          wide
          title={t(dict.sections.projectsTitle)}
          subtitle={t(dict.sections.projectsSubtitle)}
          as="h1"
        />

        {/* The page runs about ten screens: one line of anchors to jump straight to a project. */}
        <nav className={styles.index} aria-label={t(dict.labels.projectsIndex)}>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={`#${project.slug}`}>{t(project.shortTitle)}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.list}>
          {projects.map((project) => (
            <article key={project.slug} id={project.slug} className={styles.entry}>
              <header className={styles.head}>
                <p className={`${styles.category} ${project.awardTier === "win" ? styles.categoryWin : ""}`}>
                  {t(project.category)}
                </p>
                <h2 className={styles.title}>{t(project.title)}</h2>
                <p className={styles.lead}>{t(project.summary)}</p>
              </header>

              {project.video ? (
                // The voice-over is English, so only Chinese captions come on by default (in 中 mode);
                // English captions stay one click away. Remount on language change to apply it.
                <DemoVideo
                  key={lang}
                  className={styles.media}
                  src={project.video.src}
                  poster={project.video.poster}
                  label={`${t(dict.labels.demoVideo)}: ${t(project.title)}`}
                  playLabel={t(dict.labels.play)}
                  captions={
                    project.video.captions && {
                      ...project.video.captions,
                      enLabel: t(dict.labels.captionsEn),
                      zhLabel: t(dict.labels.captionsZh),
                    }
                  }
                  zhDefault={lang === "zh"}
                />
              ) : (
                project.image && (
                  <div className={styles.imageWrap}>
                    <Image
                      src={project.image}
                      alt={t(project.title)}
                      width={640}
                      height={360}
                      sizes="(max-width: 768px) 100vw, 640px"
                      className={styles.image}
                    />
                  </div>
                )
              )}

              <div className={styles.body}>
                <p className={styles.desc}>{t(project.description)}</p>

                <div
                  className={styles.facts}
                  role="group"
                  aria-label={`${t(project.shortTitle)} — ${t(dict.labels.projectFacts)}`}
                >
                  <div>
                    <span className={styles.label}>{t(dict.labels.outcome)}</span>
                    <p className={styles.outcome}>{t(project.outcome)}</p>
                  </div>
                  <div>
                    <span className={styles.label}>{t(dict.labels.builtWith)}</span>
                    <p className={styles.tags}>{project.tags.join(" · ")}</p>
                  </div>
                  <div className={styles.links}>
                    {project.caseStudyUrl && (
                      <Link href={project.caseStudyUrl} className={styles.textLink}>
                        {t(dict.labels.readCaseStudy)} <ArrowRight size={14} />
                      </Link>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.textLink}
                      >
                        {t(dict.labels.liveDemo)} <ExternalLink size={14} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        className={styles.textLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t(dict.labels.viewSource)} ${t(project.title)}`}
                      >
                        <Code size={15} /> {t(dict.labels.source)}
                      </a>
                    )}
                    {project.certificateUrl && (
                      <a
                        href={project.certificateUrl}
                        className={styles.textLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Award size={15} /> {t(dict.labels.certificatePdf)}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
