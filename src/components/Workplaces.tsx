"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L } from "@/i18n/config";
import { experience } from "@/data/experience";
import SectionHeading from "./SectionHeading";
import styles from "./Workplaces.module.css";

/**
 * Where the work happens, one line per appointment, read from the same data
 * as /experience and /cv. Detail stays on those pages; the Cathay entry in
 * particular carries only unit, title and dates by design.
 */
const Workplaces = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.section}>
      <div className="section-container">
        <SectionHeading eyebrow={t(l("Experience", "經歷"))} title={t(l("Inside the institutions", "在機構裡做事"))} />

        <div>
          <ul className={styles.list}>
            {experience.map((exp) => {
              const detail = exp.projects?.map((p) => t(p.name)).join(" · ");
              return (
                <li key={exp.id} className={styles.row}>
                  <span className={styles.period}>{t(exp.period)}</span>
                  <span className={styles.main}>
                    <span className={styles.org}>{t(exp.company)}</span>
                    <span className={styles.role}>
                      {exp.role ? t(exp.role) : ""}
                      {detail ? ` — ${detail}` : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <Link href="/experience" className={styles.more}>
            {t(l("Full experience", "完整經歷"))}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Workplaces;
