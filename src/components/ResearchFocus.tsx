"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import styles from "@/app/research/page.module.css";

const areas: { area: L; desc: L }[] = [
  {
    area: l("Self-Sovereign Identity (SSI/DID)", "自主權身分（SSI／DID）"),
    desc: l(
      "Researching decentralized identity standards (W3C DID, Verifiable Credentials) and their application to cross-institution credential verification, where citizens today must repeatedly re-submit the same credentials to different agencies.",
      "研究去中心化身分標準（W3C DID、可驗證憑證）在跨機構憑證驗證的應用——目前民眾面對不同機關，往往得一再重複提交同一份證明。",
    ),
  },
  {
    area: l("Smart Contract Security", "智慧合約安全"),
    desc: l(
      "Studying auditing methodologies for Solidity contracts. Research spans static analysis tools (Slither), manual review patterns, and formal verification approaches.",
      "研究 Solidity 合約的稽核方法，涵蓋靜態分析工具（Slither）、人工審查模式與形式化驗證。",
    ),
  },
  {
    area: l("RWA Tokenization (ERC-3643)", "實體資產代幣化（ERC-3643）"),
    desc: l(
      "Investigating regulatory-compliant tokenization of real-world assets. Focus on identity-gated ownership structures and legal compliance frameworks for institutional DeFi.",
      "研究合規的實體資產代幣化，聚焦需身分驗證的持有結構，以及機構級 DeFi 的法遵框架。",
    ),
  },
  {
    area: l("Quantum Finance & QML", "量子金融與量子機器學習"),
    desc: l(
      "Exploring variational quantum algorithms (VQE, QAOA) for financial optimization. Investigating quantum speedup potential in machine learning tasks using Qiskit and PennyLane.",
      "探索變分量子演算法（VQE、QAOA）在金融最佳化的應用，並以 Qiskit 與 PennyLane 研究機器學習任務的量子加速潛力。",
    ),
  },
];

const ResearchFocus = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.areas}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{t(dict.sections.researchFocus)}</h2>
        <div className={styles.grid}>
          {areas.map((item) => (
            <div key={item.area.en} className={styles.areaCard}>
              <h3 className={styles.areaTitle}>{t(item.area)}</h3>
              <p className={styles.areaDesc}>{t(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchFocus;
