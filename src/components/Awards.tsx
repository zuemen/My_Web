"use client";

import { useState } from "react";
import Image from "next/image";

import { ExternalLink, FileText } from "lucide-react";
import {
  awards,
  formatAwardDate,
  AWARD_TAGS,
  type AwardTag,
} from "@/data/awards";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import SectionHeading from "./SectionHeading";
import styles from "./Awards.module.css";

type Filter = AwardTag | "all";

/**
 * Keeps awards and competitive selections in one place instead of scattered
 * through Recent Updates, which is a running log rather than a record.
 * Data comes from data/awards.ts, shared with the awards block on /cv.
 * The filter starts on "All", so the server-rendered list is complete.
 */
const Awards = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: L }[] = [
    { id: "all", label: dict.labels.allAwards },
    ...AWARD_TAGS,
  ];
  const shown =
    filter === "all"
      ? awards
      : awards.filter((award) => award.tags?.includes(filter));

  return (
    <section id="awards" className={styles.awards}>
      <div className="section-container">
        <SectionHeading
          eyebrow={t(dict.sections.recognitionEyebrow)}
          title={t(dict.sections.awards)}
        />

        <div
          className={styles.filters}
          role="group"
          aria-label={t(dict.labels.filterAwards)}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.filter}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {t(f.label)}
            </button>
          ))}
        </div>

        <ul className={styles.list}>
          {shown.map((award) => (
            <li
              key={award.slug}
              className={styles.item}
            >
              <span className={styles.date}>
                {formatAwardDate(award.date, lang)}
              </span>

              <div
                className={`${styles.body} ${award.photo ? styles.withPhoto : ""}`}
              >
                <div className={styles.main}>
                  <h3 className={styles.title}>
                    {t(award.title)}
                    {award.result && (
                      <span className={`${styles.result} ${award.tier === "win" ? styles.resultWin : ""}`}>
                        {t(award.result)}
                      </span>
                    )}
                  </h3>

                  <p className={styles.issuer}>
                    {t(award.issuer)}
                    {award.role && ` · ${t(award.role)}`}
                  </p>

                  {award.detail && (
                    <p className={styles.detail}>{t(award.detail)}</p>
                  )}

                  {award.image && (
                    <a
                      href={award.image.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.evidence}
                    >
                      <Image
                        src={award.image.src}
                        alt={t(award.image.alt)}
                        width={award.image.width}
                        height={award.image.height}
                        sizes="320px"
                        className={styles.evidenceImg}
                      />
                    </a>
                  )}

                  {(award.link || award.certificateUrl) && (
                    <div className={styles.links}>
                      {award.link && (
                        <a
                          href={award.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {t(dict.labels.eventPage)}
                          <ExternalLink size={12} />
                        </a>
                      )}
                      {award.certificateUrl && (
                        <a
                          href={award.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          <FileText size={12} />
                          {t(dict.labels.certificate)}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {award.photo && (
                  <figure className={styles.photo}>
                    <Image
                      src={award.photo.src}
                      alt={t(award.photo.alt)}
                      width={award.photo.width}
                      height={award.photo.height}
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.photoImg}
                    />
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Awards;
