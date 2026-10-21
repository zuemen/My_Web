"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { researchAreas } from "@/data/researchAreas";
import styles from "@/app/research/page.module.css";

const ResearchFocus = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.areas}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t(dict.sections.researchFocus)}</h2>
        <div className={styles.grid}>
          {researchAreas.map((item) => (
            <div key={item.id} className={styles.areaCard}>
              <h3 className={styles.areaTitle}>{t(item.title)}</h3>
              <p className={styles.areaDesc}>{t(item.detail ?? item.summary)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchFocus;
