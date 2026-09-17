"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import { experience } from "@/data/experience";
import { awards, formatAwardDate } from "@/data/awards";
import styles from "@/app/cv/page.module.css";

const summary = l(
  "Management Information Systems student at National Chengchi University working on blockchain trust infrastructure — self-sovereign identity, smart contract security, and their application in finance. Currently a project management intern in the Blockchain Technology Development Section at Cathay Financial Holdings and an intern at the Taiwan Association for Blockchain Ecosystem Innovation, where I help run industry events including ETHTaipei. Led teams to a Ministry of Digital Affairs merit award and the FinTech Taipei Awards finals, and work across research support, backend development, and system integration.",
  "國立政治大學資訊管理學系學生，研究區塊鏈信任基礎建設——自主權身分、智慧合約安全，以及它們在金融上的應用。目前為國泰金控區塊鏈技術發展科專案管理實習生，並於臺灣區塊鏈愛好者協會實習，參與 ETHTaipei 等產業活動的籌辦。曾帶領團隊獲數位發展部優選、入圍台北金融科技獎決審，經驗涵蓋研究支援、後端開發與系統整合。",
);

const education: { title: L; lines: L[]; period: L } = {
  title: l("National Chengchi University, Taipei, Taiwan", "國立政治大學，台北"),
  period: l("Sep 2023 – Present", "2023/09 – 至今"),
  lines: [
    l("B.B.A. in Management Information Systems", "資訊管理學系 學士"),
    l(
      "Artificial Intelligence Interdisciplinary Micro-Program",
      "人工智慧跨域微學程",
    ),
    l(
      "FinTech Specialization Program — admitted 2026; competitive admission, cohort expanded due to application volume",
      "金融科技專長學程——2026 年錄取；採甄選制，因申請踴躍擴大招收",
    ),
  ],
};

const skills: { category: L; value: string }[] = [
  {
    category: l("Programming", "程式語言"),
    value: "Python, Java, JavaScript, TypeScript, Solidity, SQL",
  },
  {
    category: l("Backend & Systems", "後端與系統"),
    value: "FastAPI, REST APIs, System Architecture, Database Design",
  },
  {
    category: l("Blockchain & Security", "區塊鏈與安全"),
    value:
      "SSI, DID, Verifiable Credentials, Smart Contract Auditing (Slither), Hardhat, Foundry",
  },
  {
    category: l("AI & Quantum", "AI 與量子"),
    value: "Machine Learning, Graph Neural Networks, PyTorch, LLM Applications, Qiskit",
  },
  {
    category: l("DevOps & Tools", "開發工具"),
    value: "Git, GitHub Actions, Linux, Vercel",
  },
];

const CVContent = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <article className={styles.cv}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <h1 className={styles.name}>{lang === "en" ? "Ting-Yi Chu" : "朱廷翊"}</h1>
        <p className={styles.contact}>
          <span>{lang === "en" ? "Taipei, Taiwan" : "台灣 台北"}</span>
          <span className={styles.sep}>|</span>
          <a href="mailto:112306007@g.nccu.edu.tw">112306007@g.nccu.edu.tw</a>
          <span className={styles.sep}>|</span>
          <a href="https://zuemen.net" target="_blank" rel="noopener noreferrer">
            zuemen.net
          </a>
          <span className={styles.sep}>|</span>
          <a href="https://github.com/zuemen" target="_blank" rel="noopener noreferrer">
            github.com/zuemen
          </a>
        </p>
      </header>

      {/* ── Summary ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(dict.cv.summary)}</h2>
        <p className={styles.body}>{t(summary)}</p>
      </section>

      {/* ── Education ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(dict.cv.education)}</h2>
        <div className={styles.entryHeader}>
          <span className={styles.entryTitle}>{t(education.title)}</span>
          <span className={styles.entryPeriod}>{t(education.period)}</span>
        </div>
        {education.lines.map((line) => (
          <p key={line.en} className={styles.entrySubtitle}>
            {t(line)}
          </p>
        ))}
      </section>

      {/* ── Experience — rendered from data/experience.ts ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(dict.cv.experience)}</h2>
        {experience.map((exp, i) => {
          const subtitle = [
            exp.division && t(exp.division),
            exp.advisor && `${t(dict.labels.advisor)}: ${t(exp.advisor)}`,
            exp.location && t(exp.location),
          ]
            .filter(Boolean)
            .join(" | ");
          const bullets = [
            ...(exp.projects ?? []).flatMap((p) => p.details ?? []),
            ...(exp.notes ?? []),
          ];

          return (
            <div key={exp.id}>
              <div
                className={`${styles.entryHeader} ${i > 0 ? styles.entrySpaced : ""}`}
              >
                <span className={styles.entryTitle}>
                  {t(exp.company)}
                  {exp.role && <> &mdash; {t(exp.role)}</>}
                </span>
                <span className={styles.entryPeriod}>{t(exp.period)}</span>
              </div>
              {subtitle && <p className={styles.entrySubtitle}>{subtitle}</p>}
              {exp.projects && exp.projects.length > 0 && (
                <ul className={styles.projectList}>
                  {exp.projects.map((p) => (
                    <li key={p.name.en}>{t(p.name)}</li>
                  ))}
                </ul>
              )}
              {bullets.length > 0 && (
                <ul className={styles.bulletList}>
                  {bullets.map((b) => (
                    <li key={b.en}>{t(b)}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>

      {/* ── Awards — rendered from data/awards.ts ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(dict.cv.awards)}</h2>
        {awards.map((award) => (
          <div key={award.slug} className={styles.awardRow}>
            <div className={styles.entryHeader}>
              <span className={styles.entryTitle}>
                {t(award.title)}
                {award.result && <> &mdash; {t(award.result)}</>}
              </span>
              <span className={styles.entryPeriod}>
                {formatAwardDate(award.date, lang)}
              </span>
            </div>
            <p className={styles.entrySubtitle}>
              {award.role && `${t(award.role)} | `}
              {t(award.issuer)}
              {award.certificateUrl && (
                <>
                  {" | "}
                  <a
                    href={award.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    {t(dict.labels.certificatePdf)}
                  </a>
                </>
              )}
            </p>
          </div>
        ))}
      </section>

      {/* ── Skills ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(dict.cv.skills)}</h2>
        <div className={styles.skillsTable}>
          {skills.map(({ category, value }) => (
            <div key={category.en} className={styles.skillRow}>
              <span className={styles.skillCat}>{t(category)}</span>
              <span className={styles.skillDivider} aria-hidden="true" />
              <span className={styles.skillVal}>{value}</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default CVContent;
