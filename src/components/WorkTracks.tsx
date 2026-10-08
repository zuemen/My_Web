"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import { tracks } from "@/data/tracks";
import { projects, caseStudyHref } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import styles from "./WorkTracks.module.css";

/**
 * The work as three theses, each with the projects that back it. Featured
 * projects get a card; the rest of the track is one line underneath, so the
 * homepage shows the shape of the whole body of work without listing it all.
 */
const WorkTracks = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="work" className={styles.section}>
      <div className="section-wide">
        <SectionHeading
          wide
          eyebrow={t(l("Work", "作品"))}
          title={t(l("Three theses, one direction.", "三個命題，同一個方向。"))}
          subtitle={t(
            l(
              "Agents are starting to pay, trade and file on behalf of people and institutions. Each line of work below answers one question a counterparty will ask before it lets them.",
              "AI agent 開始代替個人與機構付款、交易與申報。以下每一條工作線，都在回答對手方放行之前一定會問的一個問題。",
            ),
          )}
        />

        <div className={styles.tracks}>
          {tracks
            .filter((track) => track.id !== "earlier")
            .map((track, i) => {
              const inTrack = projects.filter((p) => p.track === track.id);
              const featured = inTrack.filter((p) => p.featured);
              const others = inTrack.filter((p) => !p.featured);
              return (
                <div key={track.id} id={track.id} className={styles.track}>
                  <header className={styles.trackHead}>
                    <span className={styles.trackIndex}>{String(i + 1).padStart(2, "0")}</span>
                    <p className={styles.trackLabel}>{t(track.label)}</p>
                    <h3 className={styles.trackTitle}>{t(track.title)}</h3>
                    <p className={styles.trackThesis}>{t(track.thesis)}</p>
                  </header>

                  <div className={styles.trackBody}>
                    <div className={`${styles.cards} ${featured.length === 1 ? styles.single : ""}`}>
                      {featured.map((p) => (
                        <ProjectCard key={p.slug} project={p} />
                      ))}
                    </div>
                    {others.length > 0 && (
                      <p className={styles.also}>
                        <span className={styles.alsoLabel}>{t(l("Also in this line", "同一條線"))}</span>
                        {others.map((p, j) => {
                          const href = caseStudyHref(p) ?? `/projects#${p.slug}`;
                          return (
                            <span key={p.slug}>
                              {j > 0 && <span className={styles.sep}> · </span>}
                              <Link href={href} className={styles.alsoLink}>
                                {t(p.shortTitle)}
                              </Link>
                            </span>
                          );
                        })}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <Link href="/projects" className={styles.more}>
          {t(dict.sections.allProjects)}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default WorkTracks;
