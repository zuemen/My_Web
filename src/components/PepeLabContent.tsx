"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Code, ExternalLink } from "lucide-react";
import PepeLabArchitecture from "@/components/PepeLabArchitecture";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import styles from "@/app/projects/pepelab/page.module.css";

const copy = {
  category: l("Award-winning Project · Team Leader", "獲獎作品 · 隊長"),
  title: l(
    "PepeLab — Decentralized Credential Verification",
    "PepeLab — 去中心化憑證驗證",
  ),
  lead: l(
    "A decentralized credential verification system built on Self-Sovereign Identity standards, demonstrated on health records — the setting where re-submitting the same credential is most costly, and where the consequences of over-disclosing are most serious.",
    "以自主權身分標準打造的去中心化憑證驗證系統，並以健康紀錄為示範場域——在這個場域，重複提交同一份證明的成本最高，過度揭露的後果也最嚴重。",
  ),
  problemTitle: l("Problem", "問題"),
  problem: l(
    "Cross-institution digital credential verification in Taiwan's public sector lacks interoperable infrastructure; citizens must repeatedly submit the same credentials to different institutions. Health records make the cost concrete: a patient collecting medication, joining a study, or filing an insurance claim hands over far more of their record than any of those three actually needs.",
    "臺灣公部門跨機構的數位憑證驗證缺乏可互通的基礎建設，民眾必須向不同機構一再提交同一份證明。健康紀錄讓這個成本具體可見：病患領藥、參與研究或申請保險時，交出去的病歷遠多於這三件事實際需要的部分。",
  ),
  solutionTitle: l("Solution", "解法"),
  solution: l(
    "A three-party SSI system — hospital issuer, patient-held wallet, and verifier — in which the credential is issued once and each verifier receives only the fields its scope permits. Disclosure policies address individual fields by FHIR path, so “medication pickup” and “research authorisation” resolve to different subsets of the same credential, each gated behind its own minimum identity assurance level. The backend speaks the Ministry of Digital Affairs' digital credential wallet sandbox protocol rather than a private scheme, so credentials stay interoperable outside the demo.",
    "三方 SSI 系統——醫院發證、病患持有錢包、驗證方查驗——憑證只核發一次，每個驗證方只拿到其範圍允許的欄位。揭露政策以 FHIR 路徑定址到個別欄位，因此「領藥」與「研究授權」會對應到同一份憑證的不同子集，並各自要求最低的身分保證等級。後端採用數位發展部數位憑證皮夾沙盒的協議，而非自訂方案，讓憑證在 demo 之外依然可互通。",
  ),
  roleTitle: l("My Role", "我的角色"),
  roleLabel: l("— Team Leader", "— 隊長"),
  roles: [
    l(
      "Designed the overall system architecture for the SSI platform",
      "設計 SSI 平台的整體系統架構",
    ),
    l("Oversaw integration of VC and DID standards", "統籌 VC 與 DID 標準的整合"),
    l(
      "Managed backend development and coordinated frontend integration",
      "管理後端開發並協調前端整合",
    ),
    l(
      "Steered the project from requirement analysis and tech stack selection through to deployment",
      "主導專案從需求分析、技術選型到部署的全程",
    ),
    l(
      "Translated government interoperability requirements into technical specs",
      "將政府互通需求轉化為技術規格",
    ),
  ],
  architectureTitle: l("System Architecture", "系統架構"),
  demoTitle: l("Demo", "Demo"),
  demoAlt: l(
    "The verifier screen at the competition demo, offering three scenarios: medication pickup, research authorisation, and insurance application.",
    "競賽 demo 中的驗證端畫面，提供三種情境：領藥、研究授權與保險申請。",
  ),
  demoCaption: l(
    "Scenario picker from the live demo. Each option requests a different subset of the same credential.",
    "現場 demo 的情境選擇畫面。每個選項會請求同一份憑證的不同欄位子集。",
  ),
  recognitionTitle: l("Recognition", "肯定"),
  recognition: l("Merit Award (學生組優選)", "學生組優選"),
  recognitionMeta: l(
    "Digital Credential Scenario Innovation Challenge, hosted by the Ministry of Digital Affairs, Taiwan — Nov 2025",
    "數位憑證場景創新賽，數位發展部主辦 — 2025 年 11 月",
  ),
  stackTitle: l("Tech Stack", "技術"),
  linksTitle: l("Links", "連結"),
  certificate: l("Award certificate (PDF)", "獲獎證書（PDF）"),
};

const techStack = [
  "SSI",
  "W3C VC",
  "DID",
  "FHIR",
  "Selective disclosure",
  "FastAPI",
  "Python",
  "React",
  "Vite",
];

const PepeLabContent = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <article className={styles.container}>
      <Link href="/projects" className={styles.backLink}>
        <ArrowLeft size={14} /> {t(dict.labels.backToProjects)}
      </Link>

      <span className={styles.category}>{t(copy.category)}</span>
      <h1 className={styles.title}>{t(copy.title)}</h1>
      <p className={styles.lead}>{t(copy.lead)}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.problemTitle)}</h2>
        <p className={styles.body}>{t(copy.problem)}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.solutionTitle)}</h2>
        <p className={styles.body}>{t(copy.solution)}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {t(copy.roleTitle)}{" "}
          <span className={styles.roleLabel}>{t(copy.roleLabel)}</span>
        </h2>
        <ul className={styles.bulletList}>
          {copy.roles.map((item) => (
            <li key={item.en}>{t(item)}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.architectureTitle)}</h2>
        <PepeLabArchitecture />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.demoTitle)}</h2>
        <figure className={styles.demoFigure}>
          <Image
            src="/pepelab-demo.webp"
            alt={t(copy.demoAlt)}
            width={880}
            height={572}
            sizes="(max-width: 768px) 100vw, 860px"
            className={styles.demoImage}
          />
          <figcaption className={styles.caption}>{t(copy.demoCaption)}</figcaption>
        </figure>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.recognitionTitle)}</h2>
        <div className={styles.recognition}>
          <p className={styles.recognitionTitle} lang={lang === "en" ? "en" : "zh-Hant"}>
            {t(copy.recognition)}
          </p>
          <p className={styles.recognitionMeta}>{t(copy.recognitionMeta)}</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.stackTitle)}</h2>
        <div className={styles.tags}>
          {techStack.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t(copy.linksTitle)}</h2>
        <div className={styles.links}>
          <a
            href="https://github.com/zuemen/pepelab_v2"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            <Code size={16} /> github.com/zuemen/pepelab_v2
            <ExternalLink size={12} />
          </a>
          <a
            href="/awards/moda-digital-credential-2025-certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.inlineLink}
          >
            <Award size={16} /> {t(copy.certificate)}
          </a>
        </div>
      </section>
    </article>
  );
};

export default PepeLabContent;
