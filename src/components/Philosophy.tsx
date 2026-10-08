"use client";

import { useLang } from "@/i18n/LanguageProvider";
import styles from "./Philosophy.module.css";

/** The bio, as the owner wrote it (2026-10-05). */
const BIO = {
  en: [
    "Senior in Management Information Systems at National Chengchi University, graduating June 2027. Currently a Project Management Intern in the Blockchain Technology Development Section at Cathay Financial Holdings (Sep 2026 – Jun 2027); at the Taiwan Association for Blockchain Ecosystem Innovation (TABEI), researching Web3 agent protocols, digital identity infrastructure and trustworthy AI, and helping organize hackathons and conferences; and a research assistant at NCCU MIS on two tracks, AI and quantum computing, and smart contract security.",
    "My research centers on digital trust: building self-sovereign identity infrastructure on W3C DIDs and Verifiable Credentials, and extending it to medical credentials and identity-gated RWA tokenization; studying audit methodology for Solidity contracts through static analysis and manual review; detecting virtual-asset fraud flows with social network analysis and graph neural networks, so every risk flag carries its graph evidence; and identity and payments for autonomous agents — agent DIDs, authorisation credentials, session-bounded permissions and x402 machine payments. On the quantum side, I study the expressivity and entanglement structure of variational quantum neural networks and validate them on IBM Quantum hardware.",
    "On campus, I'm an inaugural officer of the NCCU FinTech Club, founded its Web3 Research Group, and teach a Blockchain Fundamentals series.",
    "Interested in blockchain compliance, institutional Web3, identity and payments for AI agents, and quantum machine learning in finance.",
  ],
  zh: [
    "國立政治大學資訊管理學系大四，預計 2027 年 6 月畢業。目前是國泰金控區塊鏈技術發展科專案管理實習生（2026/09 – 2027/06）；在臺灣區塊鏈愛好者協會（TABEI）研究 Web3 agent 協定、數位身分基礎建設與可信 AI，並協助籌辦黑客松與研討會；同時在政大資管擔任研究助理，參與 AI 與量子計算、智慧合約安全兩條研究線。",
    "我的研究核心是數位信任：以 W3C DID 與可驗證憑證建構自主權身分基礎建設，並延伸到醫療憑證與需身分驗證的 RWA 代幣化；以靜態分析與人工審查研究 Solidity 合約的稽核方法；以社會網絡分析與圖神經網路偵測虛擬資產詐騙金流，讓每一個風險標記都附上它在圖上的證據；以及自主 agent 的身分與支付——agent DID、授權憑證、以 session 為界的權限與 x402 機器支付。量子方面，我研究變分量子神經網路的表達能力與糾纏結構，並在 IBM Quantum 真機上驗證。",
    "在校內，我是政大金融科技社第一屆幹部，創立社內的 Web3 研究小組，並開設「區塊鏈基礎」系列課程。",
    "關注區塊鏈法遵、機構級 Web3、AI agent 的身分與支付，以及量子機器學習在金融的應用。",
  ],
};

const Philosophy = () => {
  const { lang } = useLang();

  return (
    <section id="about" className={styles.philosophy}>
      <div className={styles.container}>
        <div
          className={styles.content}
        >
          {/* h1: this is the top-level heading of /research, the only page
              that renders Philosophy. */}
          <h1 className={styles.heading}>
            {lang === "en" ? "About Me & Research Philosophy" : "關於我與研究理念"}
          </h1>
          <div className={styles.textBlock}>
            {(lang === "en" ? BIO.en : BIO.zh).map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
