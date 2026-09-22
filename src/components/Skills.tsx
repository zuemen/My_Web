"use client";

import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import styles from "./Skills.module.css";

interface ResearchArea {
  title: L;
  description: L;
}

const skillData: ResearchArea[] = [
  {
    title: l("Blockchain & Digital Identity", "區塊鏈與數位身分"),
    description: l(
      "Building trust infrastructure on Self-Sovereign Identity standards (W3C DID, Verifiable Credentials), and extending it to identity-gated asset ownership through ERC-3643 RWA tokenization.",
      "以自主權身分標準（W3C DID、可驗證憑證）建構信任基礎建設，並透過 ERC-3643 延伸至需身分驗證的實體資產代幣化持有。",
    ),
  },
  {
    title: l("Smart Contract Security", "智慧合約安全"),
    description: l(
      "Studying auditing methodologies for Solidity contracts — static analysis with Slither, manual review patterns, and formal verification approaches for on-chain financial systems.",
      "研究 Solidity 合約的稽核方法 —— Slither 靜態分析、人工審查模式，以及鏈上金融系統的形式化驗證。",
    ),
  },
  {
    title: l("Quantum Finance & QML", "量子金融與量子機器學習"),
    description: l(
      "Implemented QML simulations using Qiskit, exploring VQE and QAOA for financial optimization. Focused on quantum speedup potential for ML tasks in the finance domain.",
      "以 Qiskit 實作量子機器學習模擬，探索 VQE 與 QAOA 在金融最佳化的應用，聚焦金融領域機器學習任務的量子加速潛力。",
    ),
  },
  {
    title: l("Agentic AI", "代理式 AI"),
    description: l(
      "Completed AI interdisciplinary micro-program at NCCU. Researching multi-agent system architectures and their applications in financial intelligence workflows.",
      "修畢政大人工智慧跨域微學程，研究多代理系統架構及其在金融智慧工作流程中的應用。",
    ),
  },
];

const Skills = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="skills" className={styles.skills}>
      <div className="section-container">
        <SectionHeading
          eyebrow={t(dict.sections.researchAreasEyebrow)}
          title={t(dict.sections.researchAreas)}
        />

        <ol className={styles.list}>
          {skillData.map((area) => (
            <li
              key={area.title.en}
              className={styles.item}
            >
              <div className={styles.body}>
                <h3 className={styles.title}>{t(area.title)}</h3>
                <p className={styles.desc}>{t(area.description)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Skills;
