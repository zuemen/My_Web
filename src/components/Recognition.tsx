"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L } from "@/i18n/config";
import { awards, formatAwardDate } from "@/data/awards";
import SectionHeading from "./SectionHeading";
import Badge from "./Badge";
import styles from "./Recognition.module.css";

/** Outcomes, not selections: the four results that were decided by a jury. */
const HIGHLIGHTS: { slug: string; project?: L }[] = [
  { slug: "fintech-taipei-2026", project: l("ChainLens", "鏈鏡 ChainLens") },
  { slug: "egx-collegiate-business-2026" },
  { slug: "moda-digital-credential-2025", project: l("PepeLab", "PepeLab") },
  { slug: "gleif-appreciation-award-2026", project: l("Evidence at Source", "Evidence at Source") },
];

/** Entries still being judged. Update when the result is announced. */
const PENDING: { event: L; project: L; status: L; href: string }[] = [
  {
    event: l("Colosseum Crypto World's Fair · Base track", "Colosseum Crypto World's Fair · Base 賽道"),
    project: l("Mandate Layer", "Mandate Layer"),
    status: l("Submission due Oct 12", "10/12 截止提交"),
    href: "/projects/mandate-layer",
  },
  {
    event: l("IEEE ClimateChain Global Hackathon", "IEEE ClimateChain 全球黑客松"),
    project: l("CarbonLEI", "CarbonLEI"),
    status: l("Winners announced Nov 20", "11/20 公布結果"),
    href: "/projects/carbon-lei",
  },
];

const Recognition = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="recognition" className={styles.section}>
      <div className="section-container">
        <SectionHeading eyebrow={t(l("Recognition", "肯定"))} title={t(l("Judged by others", "由評審決定的結果"))} />

        <div>
          <ul className={styles.grid}>
            {HIGHLIGHTS.map(({ slug, project }) => {
              const award = awards.find((a) => a.slug === slug);
              if (!award) return null;
              return (
                <li key={slug} className={styles.item}>
                  <span className={styles.result}>{award.result ? t(award.result) : t(award.title)}</span>
                  <span className={styles.title}>{award.result ? t(award.title) : t(award.issuer)}</span>
                  <span className={styles.meta}>
                    {project ? `${t(project)} · ` : ""}
                    {formatAwardDate(award.date, lang)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.pending}>
            <p className={styles.pendingLabel}>{t(l("In competition now", "正在參賽"))}</p>
            <ul className={styles.pendingList}>
              {PENDING.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className={styles.pendingItem}>
                    <Badge tone="competing">{t(p.status)}</Badge>
                    <span className={styles.pendingProject}>{t(p.project)}</span>
                    <span className={styles.pendingEvent}>{t(p.event)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/experience#awards" className={styles.more}>
            {t(l("All awards and selections", "所有獎項與入選紀錄"))}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
