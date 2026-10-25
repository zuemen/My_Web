"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

import { ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { projects } from "@/data/projects";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import SectionHeading from "./SectionHeading";
import LoopVideo from "./LoopVideo";
import styles from "./SelectedWork.module.css";

/**
 * The homepage previously went hero → updates → research areas → contact, so a
 * visitor never saw any actual work without first finding the Projects nav
 * item. This surfaces the same three projects as /projects, one line each,
 * reading from data/projects.ts so the two can't drift.
 */
const PAUSE_KEY = "zuemen-previews-paused";

// The stored choice is external state, read through useSyncExternalStore like
// the language preference. With storage blocked it lasts for this page view.
const pauseListeners = new Set<() => void>();
let pausedInMemory = false;

const subscribePaused = (listener: () => void) => {
  pauseListeners.add(listener);
  return () => {
    pauseListeners.delete(listener);
  };
};

const getPaused = () => {
  try {
    return localStorage.getItem(PAUSE_KEY) === "1";
  } catch {
    return pausedInMemory;
  }
};

const storePaused = (next: boolean) => {
  pausedInMemory = next;
  try {
    localStorage.setItem(PAUSE_KEY, next ? "1" : "0");
  } catch {}
  pauseListeners.forEach((listener) => listener());
};

const SelectedWork = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  // Homepage shows the flagged few; /projects shows everything.
  const featured = projects.filter((p) => p.featured);
  // Card videos loop silently, except for visitors who ask for less motion or
  // pause them here (WCAG 2.2.2: moving content longer than five seconds needs
  // a way to stop it). The choice is remembered on this device.
  const reduced = useReducedMotion();
  const paused = useSyncExternalStore(subscribePaused, getPaused, () => false);
  const togglePaused = () => storePaused(!paused);

  return (
    <section id="work" className={styles.work}>
      <div className="section-wide">
        <SectionHeading
          wide
          eyebrow={t(dict.sections.selectedWorkEyebrow)}
          title={t(dict.sections.projects)}
        />

        {!reduced && (
          <button type="button" className={styles.motion} onClick={togglePaused} aria-pressed={paused}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            {t(paused ? dict.labels.playPreviews : dict.labels.pausePreviews)}
          </button>
        )}

        <ul className={styles.list}>
          {featured.map((project) => {
            // A case study when there is one; otherwise straight to the project's entry.
            const href = project.caseStudyUrl ?? `/projects#${project.slug}`;

            return (
              <li
                key={project.slug}
              >
                <Link href={href} className={styles.item}>
                  {/* The loop is the short silent preview, never the full narrated take. */}
                  {project.video?.preview ? (
                    <span className={styles.media}>
                      <LoopVideo
                        className={styles.video}
                        src={project.video.preview}
                        poster={project.video.poster}
                        play={!reduced && !paused}
                      />
                    </span>
                  ) : (
                    project.image && (
                      <span className={styles.media}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- decorative card art */}
                        <img className={styles.video} src={project.image} alt="" loading="lazy" />
                      </span>
                    )
                  )}
                  <span className={`${styles.category} ${project.awardTier === "win" ? styles.categoryWin : ""}`}>
                    {t(project.category)}
                  </span>
                  <h3 className={styles.title}>
                    {t(project.shortTitle)}
                    <ArrowUpRight className={styles.arrow} size={18} />
                  </h3>
                  <p className={styles.summary}>{t(project.summary)}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/projects" className={styles.moreLink}>
          {t(dict.sections.allProjects)}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default SelectedWork;
