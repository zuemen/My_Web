"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { courses } from "@/data/teaching";
import styles from "./Teaching.module.css";

/** "2026-10-19" -> "10.19"; the year is in the course period above. */
const shortDate = (date: string) => date.slice(5).replace("-", ".");

/** 課程頁：每門課一個區塊，含大圖、重點數字、四堂內容、照片與報導。 */
const Teaching = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="teaching" className={styles.teaching}>
      <div className="section-wide">
        <SectionHeading title={t(dict.nav.teaching)} as="h1" wide />

        {courses.map((course) => {
          const [lead, ...rest] = course.photos;
          return (
            <article key={course.slug} className={styles.course}>
              {/* 大圖：講課照放最上面，標題壓在漸層上 */}
              {lead && (
                <figure className={styles.cover}>
                  <Image
                    src={lead.src}
                    alt={t(lead.alt)}
                    width={lead.width}
                    height={lead.height}
                    sizes="(max-width: 1180px) 100vw, 1180px"
                    priority
                    className={styles.coverImg}
                  />
                  <figcaption className={styles.coverText}>
                    <p className={styles.eyebrow}>
                      {t(course.role)} · {t(course.period)}
                    </p>
                    <h2 className={styles.title}>{t(course.title)}</h2>
                    <p className={styles.organizers}>{t(course.organizers)}</p>
                  </figcaption>
                </figure>
              )}

              <div className={styles.intro}>
                <p className={styles.summary}>{t(course.summary)}</p>
                <p className={styles.meta}>
                  {t(course.format)}
                  <br />
                  {t(course.venue)} · {t(course.advisor)}
                </p>
              </div>

              <ul className={styles.highlights}>
                {course.highlights.map((h) => (
                  <li key={h.label.en}>
                    <span className={styles.value}>{t(h.value)}</span>
                    <span className={styles.valueLabel}>{t(h.label)}</span>
                  </li>
                ))}
              </ul>

              <h3 className={styles.subhead}>{t(dict.teaching.sessions)}</h3>
              <ol className={styles.sessions}>
                {course.sessions.map((s, i) => (
                  <li key={s.date} className={styles.session}>
                    <div className={styles.sessionDate}>
                      <span className={styles.sessionNo}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{shortDate(s.date)}</span>
                    </div>
                    <div>
                      <p className={styles.theme}>{t(s.theme)}</p>
                      <h4 className={styles.sessionTitle}>{t(s.title)}</h4>
                      <p className={styles.hands}>{t(s.hands)}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={styles.platform}>
                <h3 className={styles.subhead}>{t(dict.teaching.platform)}</h3>
                <p>{t(course.platform.note)}</p>
                <a
                  href={course.platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {t(course.platform.label)}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>

              <h3 className={styles.subhead}>{t(dict.teaching.photos)}</h3>
              <div className={styles.gallery}>
                {rest.map((p) => (
                  <figure key={p.src} className={styles.shot}>
                    <Image
                      src={p.src}
                      alt={t(p.alt)}
                      width={p.width}
                      height={p.height}
                      sizes="(max-width: 768px) 100vw, 380px"
                      className={styles.shotImg}
                    />
                  </figure>
                ))}
              </div>
              <p className={styles.photoNote}>{t(dict.teaching.blurNote)}</p>

              <h3 className={styles.subhead}>{t(dict.teaching.press)}</h3>
              <ul className={styles.press}>
                {course.press.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      <span className={styles.pressMeta}>
                        {t(p.outlet)} · {p.date.replaceAll("-", ".")}
                      </span>
                      <span className={styles.pressTitle}>
                        {t(p.title)}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Teaching;
