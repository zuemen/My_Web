import { l, type L } from "@/i18n/config";

export interface ResearchArea {
  /** Stable key, also used for element ids. */
  id: string;
  title: L;
  /** Short version, shown in the homepage Research Areas list. */
  summary: L;
  /**
   * Longer version for the Research Focus section on /research. Omitted when
   * the summary already says everything (it is then shown on both pages).
   */
  detail?: L;
  /** Slugs in data/projects.ts that show this direction in practice (linked on /research). */
  related?: string[];
}

/**
 * Source of truth for the four research directions, read by the homepage
 * Research Areas (Skills) and by Research Focus on /research. The two used to
 * be separate hand-written lists and had drifted: /research had RWA as its
 * own area and no Agentic AI. RWA (ERC-3643) now sits inside Digital Identity.
 */
export const researchAreas: ResearchArea[] = [
  {
    id: "blockchain-identity",
    related: ["pepelab", "evidence-at-source", "rwa-tokenization"],
    title: l("Blockchain & Digital Identity", "區塊鏈與數位身分"),
    summary: l(
      "Building trust infrastructure on Self-Sovereign Identity standards (W3C DID, Verifiable Credentials), and extending it to identity-gated asset ownership through ERC-3643 RWA tokenization.",
      "以自主權身分標準（W3C DID、可驗證憑證）建構信任基礎建設，並透過 ERC-3643 延伸至需身分驗證的實體資產代幣化持有。",
    ),
    detail: l(
      "Researching decentralized identity standards (W3C DID, Verifiable Credentials) and their application to cross-institution credential verification, where citizens today must repeatedly re-submit the same credentials to different agencies. Extending this to regulatory-compliant tokenization of real-world assets (ERC-3643), with a focus on identity-gated ownership structures and legal compliance frameworks for institutional DeFi.",
      "研究去中心化身分標準（W3C DID、可驗證憑證）在跨機構憑證驗證的應用——目前民眾面對不同機關，往往得一再重複提交同一份證明。並延伸至合規的實體資產代幣化（ERC-3643），聚焦需身分驗證的持有結構，以及機構級 DeFi 的法遵框架。",
    ),
  },
  {
    id: "contract-security",
    title: l("Smart Contract Security", "智慧合約安全"),
    summary: l(
      "Studying audit methodology for Solidity contracts through static analysis (Slither) and manual review.",
      "研究 Solidity 合約的稽核方法：以 Slither 靜態分析與人工審查為主。",
    ),
  },
  {
    id: "quantum-qml",
    title: l("Quantum Finance & QML", "量子金融與量子機器學習"),
    summary: l(
      "Variational quantum neural networks — their expressivity and entanglement structure — checked on IBM Quantum hardware, alongside QML simulations in Qiskit and an interest in quantum machine learning for finance. Selected for the NTU–IBM Qiskit Hackathon 2026.",
      "研究變分量子神經網路的表達能力與糾纏結構並在 IBM Quantum 真機上驗證，搭配 Qiskit 量子機器學習模擬，並關注量子機器學習在金融的應用；錄取 NTU–IBM Qiskit 黑客松 2026。",
    ),
  },
  {
    // Same text on both pages (no detail): the homepage version is the full one.
    id: "agentic-ai",
    related: ["mandate-layer", "agent-passport", "pepefi-onchain-cfd"],
    title: l("Agentic AI & Agent Payments", "代理式 AI 與代理支付"),
    summary: l(
      "Completed NCCU's Interdisciplinary Artificial Intelligence Micro Program. Researching how an autonomous agent can hold an identity and spend money under rules a counterparty can check: did:pkh agent DIDs with authorisation credentials, session-bounded permissions, and x402 machine payments settled in USDC. Positioned against the draft ERC-8004 / 8183 agent-economy standards rather than claiming compliance with them.",
      "修畢政大人工智慧跨域微學程，研究自主 agent 如何在對手方可查核的規則下持有身分與支配資金：did:pkh 的 agent DID 搭配授權憑證、以 session 為界的權限，以及用 USDC 結算的 x402 機器支付。對標 ERC-8004 / 8183 草案標準，而非宣稱已合規。",
    ),
  },
];
