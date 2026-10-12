"use client";

import Image from "next/image";
import Link from "next/link";

import { Code, Award, ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/projects";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import styles from "./Projects.module.css";

const Projects = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="projects" className={styles.projects}>
      <div className="section-container">
        <SectionHeading
          eyebrow={t(dict.sections.selectedWorkEyebrow)}
          title={t(dict.sections.projectsTitle)}
          subtitle={t(dict.sections.projectsSubtitle)}
          as="h1"
        />

        <div className={styles.list}>
          {projects.map((project) => (
            <div
              key={project.slug}
              className={styles.projectItem}
            >
              {project.image && (
                <div className={styles.projectImageWrapper}>
                  <Image
                    src={project.image}
                    alt={t(project.title)}
                    width={480}
                    height={270}
                    sizes="(max-width: 768px) 100vw, 480px"
                    className={styles.projectImage}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className={styles.projectInfo}>
                <span className={styles.category}>{t(project.category)}</span>
                <h2 className={styles.title}>{t(project.title)}</h2>
                <p className={styles.desc}>{t(project.description)}</p>
                <div className={styles.outcome}>
                  <span className={styles.outcomeLabel}>{t(dict.labels.outcome)}</span>
                  <p className={styles.outcomeText}>{t(project.outcome)}</p>
                </div>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.caseStudyUrl && (
                    <Link
                      href={project.caseStudyUrl}
                      className={styles.caseStudyLink}
                    >
                      {t(dict.labels.readCaseStudy)} <ArrowRight size={14} />
                    </Link>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.caseStudyLink}
                    >
                      {t(dict.labels.liveDemo)} <ExternalLink size={14} />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className={styles.linkIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t(dict.labels.viewSource)} ${t(project.title)}`}
                    >
                      <Code size={20} />
                    </a>
                  )}
                  {project.certificateUrl && (
                    <a
                      href={project.certificateUrl}
                      className={styles.linkIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(dict.labels.certificatePdf)}
                    >
                      <Award size={20} />
                    </a>
                  )}
                </div>
              </div>
              {project.video && (
                <div className={styles.projectVideo}>
                  {/* Remount on language change so the matching caption track is the default. */}
                  <video
                    key={lang}
                    className={styles.video}
                    controls
                    preload="none"
                    playsInline
                    poster={project.video.poster}
                    aria-label={`${t(dict.labels.demoVideo)}: ${t(project.title)}`}
                  >
                    <source src={project.video.src} type="video/mp4" />
                    {project.video.captions && (
                      <>
                        <track
                          kind="captions"
                          src={project.video.captions.en}
                          srcLang="en"
                          label={t(dict.labels.captionsEn)}
                          default={lang === "en"}
                        />
                        <track
                          kind="captions"
                          src={project.video.captions.zh}
                          srcLang="zh-Hant"
                          label={t(dict.labels.captionsZh)}
                          default={lang === "zh"}
                        />
                      </>
                    )}
                  </video>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
