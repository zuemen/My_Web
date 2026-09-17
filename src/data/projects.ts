import { l, type L } from "@/i18n/config";

export interface Project {
  slug: string;
  title: L;
  /** Compact title for the homepage list, where the full one is too long. */
  shortTitle: L;
  category: L;
  /** One line for the homepage. The full description lives on /projects. */
  summary: L;
  description: L;
  /** What the project actually produced or resolved — not just the stack used. */
  outcome: L;
  tags: string[];
  /** Shown in the homepage Selected Work list. */
  featured?: boolean;
  image?: string;
  /** Source repository. */
  link?: string;
  /** Live, working demo. Checked for a 200 before being added. */
  demoUrl?: string;
  certificateUrl?: string;
  caseStudyUrl?: string;
}

/**
 * Source of truth for projects, read by the Projects list on /projects and the
 * Selected Work section on the homepage, so the two cannot drift apart.
 */
export const projects: Project[] = [
  {
    // Describe the live screener as SNA plus laundering-pattern detection. The
    // GNN (GCN / GraphSAGE) is an offline benchmark on the Elliptic dataset and
    // is explicitly not wired into live review — see the repository README.
    slug: "chainlens",
    featured: true,
    title: l(
      "ChainLens — Explainable Crypto Fraud Money-Flow Detection",
      "鏈鏡 ChainLens — 可解釋的虛擬資產詐騙金流偵測",
    ),
    shortTitle: l("ChainLens", "鏈鏡 ChainLens"),
    category: l(
      "FinTech Taipei Awards 2026 — Finalist",
      "2026 台北金融科技獎 — 入圍決審",
    ),
    summary: l(
      "Compliance screening for Taiwanese virtual asset service providers, where every risk flag comes with the graph evidence behind it rather than a bare score.",
      "為台灣虛擬資產服務商設計的法遵篩查工具——每個風險判定都附上背後的圖結構證據，而不是一個黑箱分數。",
    ),
    description: l(
      "A money-flow screening platform for virtual asset service providers. The live screener uses social network analysis and laundering-pattern detection, and attaches structural evidence to each decision — centrality anomalies, community membership, and fund-path patterns — so a compliance officer can see why an address was flagged. A GCN / GraphSAGE model is benchmarked offline on the Elliptic dataset (203k Bitcoin transactions) as a research baseline, kept separate from live review until a locally labelled dataset exists.",
      "為虛擬資產服務商打造的金流篩查平台。即時篩查採用社會網路分析與洗錢圖樣偵測，並為每個判定附上結構證據——中心性異常、社群歸屬與資金路徑圖樣——讓法遵人員看得到位址被標記的原因。另以 GCN／GraphSAGE 在 Elliptic 資料集（20.3 萬筆比特幣交易）上做離線研究基準；在建立在地標註資料集之前，刻意不接入即時審查。",
    ),
    outcome: l(
      "Advanced to the final review of the FinTech Taipei Awards 2026 (Financial Innovation Award, Campus Division) as team lead of a three-person team, with a live screening demo deployed.",
      "以三人團隊負責人身分入圍 2026 台北金融科技獎金融創新獎校園組決審，並已部署可線上操作的篩查 demo。",
    ),
    tags: ["SNA", "Graph Neural Networks", "AML Compliance", "Python", "Next.js"],
    link: "https://github.com/zuemen/ChainLens",
    demoUrl: "https://chain-lens-beta.vercel.app",
  },
  {
    slug: "evidence-at-source",
    featured: true,
    title: l(
      "Evidence at Source — Worker-Held Credentials for AI Agents",
      "Evidence at Source 證據前置 — 讓 AI Agent 問得到答案、拿不到資料",
    ),
    shortTitle: l("Evidence at Source", "Evidence at Source 證據前置"),
    category: l("GLEIF Appreciation Award", "GLEIF 感謝獎"),
    summary: l(
      "Facts about a migrant worker are signed by both parties when they happen and held by the worker, so a bank's or brand's AI agent can get an answer without ever getting the data.",
      "關於移工的事實在發生當下由雙方簽章封存、由勞工本人持有，讓銀行或品牌的 AI Agent 拿得到答案，卻拿不到原始資料。",
    ),
    description: l(
      "A dual-signed credential wallet held by the worker, queried by verification agents that each represent an institution. Every query passes a three-layer policy gate and returns only a boolean and a reason code, never the underlying record. Agents prove whom they act for through GLEIF vLEI credential chains that are re-verified on every query, and an agent never makes the final decision: it produces a recommendation for a named human reviewer whose revocable role credential is sealed into an independently re-verifiable audit trail.",
      "由勞工持有的雙簽憑證錢包，接受代表不同機構的查驗 Agent 查詢。每次查詢都要通過三層政策閘門，只回傳布林值與原因碼，絕不回傳原始紀錄。Agent 透過 GLEIF vLEI 憑證鏈證明自己代表哪個機構，且每次查詢都重新驗證全鏈；Agent 也從不做最終決定——它只產生建議，交由具名的人類覆核者裁定，覆核者可撤銷的職務憑證會封存在可獨立重驗的稽核軌跡中。",
    ),
    outcome: l(
      "The project also received the GLEIF Appreciation Award. Built by a three-person team, with a public demo and an executable test suite behind each technical claim.",
      "本專案同時獲得 GLEIF 感謝獎。由三人團隊開發，提供公開 demo，每項技術主張都有可執行的測試佐證。",
    ),
    tags: ["vLEI", "Verifiable Credentials", "Selective Disclosure", "AI Agents", "TypeScript"],
    link: "https://github.com/zuemen/evidence-at-source",
    demoUrl: "https://zuemen.github.io/evidence-at-source/",
  },
  {
    slug: "pepelab",
    featured: true,
    title: l(
      "PepeLab — Decentralized Credential Verification",
      "PepeLab — 去中心化憑證驗證",
    ),
    shortTitle: l("PepeLab", "PepeLab"),
    category: l(
      "Award-winning Project (Merit Award)",
      "獲獎作品（數位發展部優選）",
    ),
    summary: l(
      "A decentralized identity platform on SSI, VC and DID standards, so a credential issued by one institution can be verified by another.",
      "基於 SSI、VC 與 DID 標準的去中心化身分平台，讓一個機構核發的憑證能由另一個機構驗證。",
    ),
    description: l(
      "Led a team in a national competition hosted by the Ministry of Digital Affairs, Taiwan. Cross-agency credential verification in the public sector lacks interoperable infrastructure, forcing citizens to re-submit the same credentials to every institution. Architected a decentralized identity platform on SSI, VC, and DID standards to make those credentials verifiable across institutions.",
      "帶領團隊參加數位發展部主辦的全國競賽。公部門跨機關的憑證驗證缺乏可互通的基礎建設，民眾得向每個機關重複提交同一份證明。我以 SSI、VC 與 DID 標準設計去中心化身分平台，讓這些憑證能跨機構驗證。",
    ),
    outcome: l(
      "Merit Award (學生組優選) at the Digital Credential Scenario Innovation Challenge, Nov 2025. Delivered a working credential verification system and translated government interoperability requirements into implementable technical specifications.",
      "2025 年 11 月獲數位憑證場景創新賽學生組優選。交付可運作的憑證驗證系統，並將政府互通需求轉化為可實作的技術規格。",
    ),
    tags: ["SSI", "VC/DID", "FastAPI", "Python", "System Architecture"],
    image: "/digital_credential_new.jpg",
    link: "https://github.com/zuemen/pepelab_v2",
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
    caseStudyUrl: "/projects/pepelab",
  },
  {
    // Research prototype on testnet. Never describe the vault as fully
    // collateralised, and keep the "no real assets" framing from the README.
    slug: "pepefi-onchain-cfd",
    featured: true,
    title: l(
      "PepeFi — On-Chain Perpetual CFD Protocol",
      "PepeFi — 鏈上永續差價合約協議",
    ),
    shortTitle: l("PepeFi On-Chain CFD", "PepeFi 鏈上差價合約"),
    category: l(
      "NCCU Capstone 2026 — Base Sepolia Testnet",
      "政大 2026 畢業專題 — Base Sepolia 測試網",
    ),
    summary: l(
      "A perpetual contract-for-difference protocol deployed on Base Sepolia, with an agent that trades only inside a session its owner has bounded.",
      "部署於 Base Sepolia 的永續差價合約協議，交易 agent 只能在擁有者限定的 session 範圍內下單。",
    ),
    description: l(
      "A proof-of-concept perpetual CFD protocol deployed to the Base Sepolia testnet, with an on-chain price keeper run on a schedule by GitHub Actions and oracle integration for pricing. Autonomous trading is delegated through session-bounded permissions, so an agent can open positions only within limits the owner signs off, and market signals are sold per request over an x402 payment-gated API. A research prototype that holds no real assets.",
      "部署於 Base Sepolia 測試網的永續差價合約概念驗證協議，鏈上報價由 GitHub Actions 排程執行，並串接預言機定價。自主交易透過 session 範圍授權委派，agent 只能在擁有者簽署的限額內開倉；市場訊號則透過 x402 付費 API 按次販售。屬研究原型，不涉及任何真實資產。",
    ),
    outcome: l(
      "Contracts live on Base Sepolia with a working web front end — the one project here with a real on-chain deployment rather than a local chain.",
      "合約已部署於 Base Sepolia 並有可運作的網頁前端——是這裡唯一真正上鏈部署、而非只跑本地鏈的專案。",
    ),
    tags: ["Solidity", "Foundry", "Base Sepolia", "x402", "Agent Delegation"],
    link: "https://github.com/zuemen/pepelab_onchain_cfd",
    demoUrl: "https://pepelab-onchain-cfd-djot.vercel.app",
  },
  {
    slug: "rwa-tokenization",
    title: l(
      "Real World Asset (RWA) Real Estate Tokenization",
      "實體資產（RWA）不動產代幣化",
    ),
    shortTitle: l("RWA Real Estate Tokenization", "RWA 不動產代幣化"),
    category: l("Blockchain Implementation", "區塊鏈實作"),
    summary: l(
      "Fractional property ownership in Solidity, with compliance enforced inside the contracts rather than bolted on off-chain.",
      "以 Solidity 實作不動產碎片化持有，把合規檢查寫進合約本身，而不是外掛在鏈下。",
    ),
    description: l(
      "Developed a decentralized platform for real estate fractional ownership. Implemented PropertyToken for asset digitization and RentalDistributor for automated yield distribution. Integrated an IdentityRegistry to ensure regulatory compliance.",
      "開發不動產碎片化持有的去中心化平台。以 PropertyToken 實作資產數位化、RentalDistributor 自動分配租金收益，並整合 IdentityRegistry 確保法規合規。",
    ),
    outcome: l(
      "A working end-to-end demo on a local Hardhat network: four Solidity contracts (IdentityRegistry, PropertyToken, RentalDistributor, MockUSDC) wired to a React frontend and a Node backend, so an identity-gated transfer and an automated rental payout can be run start to finish. Shows compliance constraints enforced in the contracts rather than bolted on off-chain.",
      "在本地 Hardhat 網路上完成端到端 demo：四支 Solidity 合約（IdentityRegistry、PropertyToken、RentalDistributor、MockUSDC）串接 React 前端與 Node 後端，可完整跑完需身分驗證的轉移與自動租金分配。展示合規限制在合約層強制執行，而非外掛於鏈下。",
    ),
    tags: ["Solidity", "Hardhat", "RWA", "Fractional Ownership", "React"],
    link: "https://github.com/zuemen/rwa_g",
  },
  {
    slug: "qml-simulation",
    title: l(
      "Quantum Machine Learning (QML) Simulation",
      "量子機器學習（QML）模擬",
    ),
    shortTitle: l("Quantum Machine Learning Simulation", "量子機器學習模擬"),
    category: l("Quantum Research", "量子研究"),
    summary: l(
      "A 2×2 benchmark crossing classical and quantum data sources with classical and quantum classifiers, to separate a data advantage from a model advantage.",
      "以 2×2 設計交叉比較古典／量子資料與古典／量子分類器，區分優勢究竟來自資料還是模型。",
    ),
    description: l(
      "A controlled comparison of quantum and classical classifiers under a 2×2 design: two data sources (a classical non-linearly-separable set, and one generated by sampling a parameterised two-qubit circuit) crossed with two model families. Implemented on Qiskit Aer with QSVM (ZZFeatureMap + fidelity quantum kernel), a variational QNN, and a QSVT-style approximation, against a logistic-regression baseline.",
      "在 2×2 設計下比較量子與古典分類器：兩種資料來源（非線性可分的古典資料集，以及由參數化雙量子位元電路取樣產生的資料）交叉兩類模型。於 Qiskit Aer 上實作 QSVM（ZZFeatureMap + fidelity 量子核）、變分 QNN 與 QSVT 式近似，並以邏輯斯迴歸為基準。",
    ),
    outcome: l(
      "Isolates whether any advantage comes from the data or the model by testing both quantum and classical algorithms on both data sources — a cleaner comparison than benchmarking a quantum model on classical data alone.",
      "在兩種資料上同時測試量子與古典演算法，藉此釐清優勢來自資料還是模型——比只在古典資料上評測量子模型更乾淨的比較。",
    ),
    tags: ["QML", "Qiskit", "QSVM", "QNN", "Python"],
    link: "https://github.com/zuemen/qc_ML",
  },
];
