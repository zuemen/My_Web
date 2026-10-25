"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { experience } from "@/data/experience";
import styles from "@/app/research/page.module.css";

/**
 * The two NCCU research appointments, read from data/experience.ts. They are
 * separate appointments under different professors and must stay two entries.
 */
const ResearchPositions = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const positions = experience.filter((e) => e.pi || e.advisor);

  return (
    <section className={styles.areas}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t(dict.sections.researchPositions)}</h2>
        <ul className={styles.positions}>
          {positions.map((e) => (
            <li key={e.id} className={styles.position}>
              <p className={styles.positionName}>
                {e.projects?.map((p) => t(p.name)).join(" · ")}
              </p>
              <p className={styles.positionMeta}>
                {[
                  e.role && t(e.role),
                  e.pi && `${t(dict.labels.pi)}: ${t(e.pi)}`,
                  e.advisor && `${t(dict.labels.advisor)}: ${t(e.advisor)}`,
                  t(e.company),
                  t(e.period),
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResearchPositions;
