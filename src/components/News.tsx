"use client";

import Link from "next/link";

import {
  Zap,
  BookOpen,
  Briefcase,
  GraduationCap,
  Trophy,
  Users,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { updates, formatUpdateDate, type UpdateIcon } from "@/data/updates";
import styles from "./News.module.css";

/** lucide icon per UpdateIcon key; the data file stays free of JSX. */
const ICONS: Record<UpdateIcon, React.ReactNode> = {
  zap: <Zap size={18} />,
  book: <BookOpen size={18} />,
  briefcase: <Briefcase size={18} />,
  graduation: <GraduationCap size={18} />,
  trophy: <Trophy size={18} />,
  users: <Users size={18} />,
  calendar: <CalendarDays size={18} />,
};

/** Items come from data/updates.ts. */
const News = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.news}>
      <div className="section-container">
        <SectionHeading
          eyebrow={t(dict.sections.latestEyebrow)}
          title={t(dict.sections.recentUpdates)}
        />

        <div className={styles.timeline}>
          {updates.map((item) => (
            <div
              key={`${item.date}-${item.title.en}`}
              className={styles.newsItem}
            >
              <div className={styles.dateIcon}>
                <div className={styles.iconWrapper}>{ICONS[item.icon]}</div>
                <span className={styles.date}>{formatUpdateDate(item.date)}</span>
              </div>
              <div className={styles.content}>
                <h3>{t(item.title)}</h3>
                <p>{t(item.description)}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/experience#awards" className={styles.moreLink}>
          {t(dict.sections.awardsLink)}
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default News;
