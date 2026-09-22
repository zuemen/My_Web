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
import { l, pick, type L } from "@/i18n/config";
import styles from "./News.module.css";

interface NewsItem {
  date: string;
  title: L;
  description: L;
  icon: React.ReactNode;
}

/**
 * A running log of milestones. Awards and competitive selections deliberately
 * live in data/awards.ts and render in the Awards section on /experience —
 * keeping them out of here stops the same items appearing twice on the site.
 */
const newsData: NewsItem[] = [
  {
    date: "2026.09",
    title: l(
      "Joined Cathay Financial Holdings as a Project Management Intern",
      "加入國泰金控擔任專案管理實習生",
    ),
    description: l(
      "Digital Data & Technology Development Center — Digital Architecture Development Department / Blockchain Technology Development Section (Sep 2026 – Jun 2027).",
      "數位數據暨科技發展中心 數位架構發展部／區塊鏈技術發展科（2026/09 – 2027/06）。",
    ),
    icon: <Briefcase size={18} />,
  },
  {
    date: "2026.09",
    title: l("ETHTaipei 2026 — Event Staff", "ETHTaipei 2026 活動工作人員"),
    description: l(
      "Worked the conference on behalf of TABEI, Sep 13–14 in Taipei — the first edition to add a Financial Institution Day.",
      "9/13–14 以 TABEI 身分於台北擔任活動工作人員；本屆首度增設金融機構日。",
    ),
    icon: <CalendarDays size={18} />,
  },
  {
    date: "2026.09",
    title: l(
      "Trustworthy AI Hackathon 2026 Concluded",
      "2026 可信 AI 黑客松圓滿落幕",
    ),
    description: l(
      "Closed out the three-day hackathon and Demo Day at N24 Taipei Ark as part of the TABEI organizing team — 50 teams applied, 20 reached the finals, and Human ID took first place. Selected work continues to a policy white paper in November.",
      "以 TABEI 籌辦團隊身分完成於 N24 台北方舟舉行的三天黑客松與 Demo Day——50 隊報名、20 隊進入決賽，由 Human ID 奪冠。精選作品將收錄於 11 月的政策白皮書。",
    ),
    icon: <Trophy size={18} />,
  },
  {
    date: "2026.07",
    title: l(
      "Joined IBM Qiskit Global Summer School 2026",
      "參加 IBM Qiskit Global Summer School 2026",
    ),
    description: l(
      "Took part in IBM's Qiskit Global Summer School, a program on quantum algorithms and hands-on implementation in Qiskit.",
      "參加 IBM Qiskit 全球暑期學校，課程涵蓋量子演算法與 Qiskit 實作。",
    ),
    icon: <GraduationCap size={18} />,
  },
  {
    date: "2026.06",
    title: l(
      "Joined TABEI and the NCCU FinTech Club",
      "加入 TABEI 與政大金融科技社",
    ),
    description: l(
      "Started as an intern at the Taiwan Association for Blockchain Ecosystem Innovation, and was selected as an inaugural officer of the NCCU FinTech Club.",
      "於臺灣區塊鏈愛好者協會開始實習，並獲選為政大金融科技社第一屆幹部。",
    ),
    icon: <Users size={18} />,
  },
  {
    date: "2026.01",
    title: l(
      "Added AI + Quantum Computing (AI+QC) as a Second Research Track",
      "新增 AI + 量子計算（AI+QC）研究方向",
    ),
    description: l(
      "Took on Quantum Finance and Quantum Machine Learning as an additional research direction within the existing Research Assistant post at NCCU MIS, alongside the smart contract security work.",
      "在既有的政大資管研究助理職位下，於智慧合約安全之外，新增量子金融與量子機器學習研究方向。",
    ),
    icon: <Zap size={18} />,
  },
  {
    date: "2025.09",
    title: l(
      "Completed AI Interdisciplinary Micro-Program",
      "修畢人工智慧跨域微學程",
    ),
    description: l(
      "Certified by the Interdisciplinary Artificial Intelligence Center, NCCU.",
      "由政大人工智慧跨域研究中心核發修業證明。",
    ),
    icon: <BookOpen size={18} />,
  },
];

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
          {newsData.map((item) => (
            <div
              key={`${item.date}-${item.title.en}`}
              className={styles.newsItem}
            >
              <div className={styles.dateIcon}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.date}>{item.date}</span>
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
