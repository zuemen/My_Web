"use client";

import SectionHeading from "./SectionHeading";
import { now, nowUpdatedAt } from "@/data/now";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import styles from "./Now.module.css";

/** What is in progress right now; data from data/now.ts. */
const Now = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="now" className={styles.now}>
      <div className="section-container">
        <SectionHeading title={t(dict.sections.now)} />
        <ul className={styles.list}>
          {now.map((item) => (
            <li key={item.en} className={styles.item}>
              {t(item)}
            </li>
          ))}
        </ul>
        <p className={styles.updated}>
          {t(dict.sections.nowUpdated)}{" "}
          <time dateTime={nowUpdatedAt}>{nowUpdatedAt}</time>
        </p>
      </div>
    </section>
  );
};

export default Now;
