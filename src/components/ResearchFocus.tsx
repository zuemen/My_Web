"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import { tracks, type TrackId } from "@/data/tracks";
import { projects, caseStudyHref } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import styles from "./ResearchFocus.module.css";

interface Area {
  title: L;
  desc: L;
  /** Projects in this track are listed under the area. */
  track?: TrackId;
  /** The appointment the area sits under, for the two university tracks. */
  context?: L;
}

/*
 * The three theses come from data/tracks.ts so /research, /projects and the
 * homepage describe the work in the same words. The two research
 * appointments are kept as their own areas.
 */
const areas: Area[] = [
  ...tracks
    .filter((track) => track.id !== "earlier")
    .map((track) => ({ title: track.title, desc: track.thesis, track: track.id })),
  {
    title: l("Smart contract security", "智慧合約安全"),
    desc: l(
      "Auditing methodology for Solidity contracts: static analysis (Slither), manual review patterns, and formal verification approaches.",
      "Solidity 合約的稽核方法：靜態分析（Slither）、人工審查模式與形式化驗證。",
    ),
    context: l("Research Assistant, NCCU MIS — advised by Prof. Feng-Yuan Chuang", "政大資管研究助理——莊豐源助理教授指導"),
  },
  {
    title: l("Quantum computing and finance", "量子計算與金融"),
    desc: l(
      "The expressivity and entanglement structure of variational quantum neural networks, and where quantum machine learning could matter in finance.",
      "變分量子神經網路的表達能力與糾纏結構，以及量子機器學習在金融中可能的用途。",
    ),
    context: l("AI+QC Research and Development Program, NCCU — PI Prof. Rua-Huan Tsaih", "政大 AI+QC 研發推動計畫——計畫主持人蔡瑞煌教授"),
  },
];

const ResearchFocus = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.areas}>
      <div className="section-container">
        <SectionHeading eyebrow={t(l("Research", "研究"))} title={t(dict.sections.researchFocus)} />
        <ol className={styles.list}>
          {areas.map((area) => {
            const related = area.track ? projects.filter((p) => p.track === area.track) : [];
            return (
              <li key={area.title.en} className={styles.item}>
                <h3 className={styles.title}>{t(area.title)}</h3>
                {area.context && <p className={styles.context}>{t(area.context)}</p>}
                <p className={styles.desc}>{t(area.desc)}</p>
                {related.length > 0 && (
                  <p className={styles.related}>
                    {related.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && " · "}
                        <Link href={caseStudyHref(p) ?? `/projects#${p.slug}`} className={styles.link}>
                          {t(p.shortTitle)}
                        </Link>
                      </span>
                    ))}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default ResearchFocus;
