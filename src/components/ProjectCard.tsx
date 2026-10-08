"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { chains, caseStudyHref, type Project } from "@/data/projects";
import Badge from "./Badge";
import styles from "./ProjectCard.module.css";

/**
 * One project, as a card: verdict first (badge), then what it is, then two
 * numbers that prove it, then where to go next. Used on the homepage and on
 * /projects so the two read the same.
 */
const ProjectCard = ({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const href = caseStudyHref(project);
  const Heading = headingLevel;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        {project.badge && <Badge tone={project.badge.tone}>{t(project.badge.label)}</Badge>}
        <span className={styles.category}>{t(project.category)}</span>
      </div>

      <Heading className={styles.title}>
        {href ? (
          <Link href={href} className={styles.titleLink}>
            {t(project.shortTitle)}
          </Link>
        ) : (
          t(project.shortTitle)
        )}
      </Heading>

      <p className={styles.summary}>{t(project.summary)}</p>

      {project.proof && (
        <dl className={styles.proof}>
          {project.proof.slice(0, 2).map((p) => (
            <div key={p.value + p.label.en} className={styles.proofItem}>
              <dt className={styles.proofValue}>{p.value}</dt>
              <dd className={styles.proofLabel}>{t(p.label)}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className={styles.foot}>
        {project.deployment && <span className={styles.chain}>{chains[project.deployment.chain].name}</span>}
        <div className={styles.links}>
          {href && (
            <Link href={href} className={styles.primaryLink}>
              {t(dict.labels.readCaseStudy)}
              <ArrowRight size={13} />
            </Link>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {t(dict.labels.liveDemo)}
              <ArrowUpRight size={12} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label={`${t(dict.labels.viewSource)} ${t(project.shortTitle)}`}
            >
              {t(dict.labels.source)}
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
