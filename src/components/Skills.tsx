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
    title: l("Agentic AI & Agent Payments", "代理式 AI 與代理支付"),
    description: l(
      "Completed AI interdisciplinary micro-program at NCCU. Researching how an autonomous agent can hold an identity and spend money under rules a counterparty can check: did:pkh agent DIDs with authorisation credentials, session-bounded permissions, and x402 machine payments settled in USDC with on-chain revenue routing. Positioned against the draft ERC-8004 / 8183 agent-economy standards rather than claiming compliance with them.",
      "修畢政大人工智慧跨域微學程，研究自主 agent 如何在對手方可查核的規則下持有身分與支配資金：did:pkh 的 agent DID 搭配授權憑證、以 session 為界的權限，以及用 USDC 結算、收入上鏈分潤的 x402 機器支付。對標 ERC-8004 / 8183 草案標準，而非宣稱已合規。",
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
