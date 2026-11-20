"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { events, EVENTS_AS_OF, type EventEntry } from "@/data/events";
import styles from "./Events.module.css";

/** "2026-10-19" -> "2026.10.19"；有結束日時接成區間，只有月份時顯示到月。 */
const dateRange = (e: EventEntry) => {
  const fmt = (d: string) => d.replaceAll("-", ".");
  if (!e.end) return fmt(e.date);
  // 同年只寫一次年份：2026.10.19 – 11.13
  return e.end.slice(0, 4) === e.date.slice(0, 4)
    ? `${fmt(e.date)} – ${fmt(e.end.slice(5))}`
    : `${fmt(e.date)} – ${fmt(e.end)}`;
};

/** 活動頁：分「即將舉行」與「過去活動」兩區，每則一張卡，有照片就放在左邊。 */
const Events = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  // 伺服器（建置時）用固定日期，瀏覽器用當地的今天；React 會在掛載後自動換成後者，
  // 活動過了就自動移到「過去活動」，不會造成伺服器與瀏覽器畫面不一致的錯誤。
  const today = useSyncExternalStore(
    () => () => {},
    () => {
      const now = new Date();
      return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    },
    () => EVENTS_AS_OF,
  );

  // 用最後一天判斷；只有月份的活動，比到月份為止
  const isUpcoming = (e: EventEntry) => {
    const last = e.end ?? e.date;
    return last >= today.slice(0, last.length);
  };
  const upcoming = events.filter(isUpcoming).reverse();
  const past = events.filter((e) => !isUpcoming(e));

  const card = (e: EventEntry, soon: boolean) => (
    <li key={e.id} className={`${styles.card} ${e.photo ? styles.withPhoto : ""}`}>
      {e.photo && (
        <figure className={styles.photo}>
          <Image
            src={e.photo.src}
            alt={t(e.photo.alt)}
            width={e.photo.width}
            height={e.photo.height}
            sizes="(max-width: 768px) 100vw, 320px"
            className={styles.photoImg}
          />
        </figure>
      )}
      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={`${styles.kind} ${soon ? styles.soon : ""}`}>
            {t(dict.events.kinds[e.kind])}
          </span>
          <span>{dateRange(e)}</span>
          <span>{t(e.place)}</span>
        </p>
        <h3 className={styles.title}>{t(e.title)}</h3>
        <p className={styles.role}>{t(e.role)}</p>
        <p className={styles.summary}>{t(e.summary)}</p>
        {(e.page || (e.links && e.links.length > 0)) && (
          <div className={styles.links}>
            {e.page && (
              <Link href={e.page} className={styles.primary}>
                {t(dict.events.more)}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}
            {e.links?.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {t(link.label)}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  );

  return (
    <section id="events" className={styles.events}>
      <div className="section-wide">
        <SectionHeading title={t(dict.nav.events)} subtitle={t(dict.events.subtitle)} as="h1" wide />

        {upcoming.length > 0 && (
          <>
            <h2 className={styles.group}>{t(dict.events.upcoming)}</h2>
            <ul className={styles.list}>{upcoming.map((e) => card(e, true))}</ul>
          </>
        )}

        <h2 className={styles.group}>{t(dict.events.past)}</h2>
        <ul className={styles.list}>{past.map((e) => card(e, false))}</ul>
      </div>
    </section>
  );
};

export default Events;
