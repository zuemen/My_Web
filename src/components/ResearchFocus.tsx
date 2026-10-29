"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { researchAreas } from "@/data/researchAreas";
import { projects } from "@/data/projects";
import styles from "@/app/research/page.module.css";

const ResearchFocus = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.areas}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t(dict.sections.researchFocus)}</h2>
        <div className={styles.grid}>
          {researchAreas.map((item) => {
            // Each direction points at the projects that show it in practice.
            const related = (item.related ?? [])
              .map((slug) => projects.find((p) => p.slug === slug))
              .filter((p) => p !== undefined);
            return (
              <div key={item.id} className={styles.areaCard}>
                <h3 className={styles.areaTitle}>{t(item.title)}</h3>
                <div className={styles.areaBody}>
                  <p className={styles.areaDesc}>{t(item.detail ?? item.summary)}</p>
                  {related.length > 0 && (
                    <p className={styles.related}>
                      <span className={styles.relatedLabel}>{t(dict.labels.related)}</span>
                      {related.map((p) => (
                        <Link key={p.slug} href={`/projects#${p.slug}`} className={styles.relatedLink}>
                          {t(p.shortTitle)}
                        </Link>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchFocus;
