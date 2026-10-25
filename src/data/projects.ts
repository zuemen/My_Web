import { l, type L } from "@/i18n/config";
import { awardBadge, awardFor } from "@/data/awards";

export interface Project {
  slug: string;
  title: L;
  /** Compact title for the homepage list, where the full one is too long. */
  shortTitle: L;
  /**
   * The label above the title. For a project with an award in data/awards.ts
   * (matched by `project`), it is that award's badge and is not written here.
   */
  category: L;
  /** Set when `category` is an award badge: a "win" shows in the accent colour, a "selection" in grey. */
  awardTier?: "win" | "selection";
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
  /**
   * Demo video, files under /public/videos. `src` is the full narrated take,
   * played with controls on /projects; `preview` is a short silent clip that
   * loops on the homepage card; `captions` are WebVTT tracks in both languages.
   */
  video?: {
    src: string;
    poster?: string;
    preview?: string;
    captions?: L;
    /** Length of the full take in seconds (for the VideoObject structured data on /projects). */
    seconds?: number;
  };
}

/** The files the demo recorder writes for one take, under /public/videos/<name>.* */
const demoVideo = (name: string, seconds: number): NonNullable<Project["video"]> => ({
  src: `/videos/${name}.mp4`,
  poster: `/videos/${name}.webp`,
  preview: `/videos/${name}-preview.mp4`,
  captions: l(`/videos/${name}.en.vtt`, `/videos/${name}.zh.vtt`),
  seconds,
});

/** As written below: `category` only for projects without an award. */
type ProjectEntry = Omit<Project, "category"> & { category?: L };

const entries: ProjectEntry[] = [
  {
    // Matches the live demo as of 2026-10-12: a rule engine plus a GraphSAGE
    // second engine that can only escalate release → enhanced review. The demo
    // runs on synthetic scenarios and the model is not validated on real
    // labelled data; the Elliptic GCN / GraphSAGE runs stay an offline baseline.
    slug: "chainlens",
    featured: true,
    title: l(
      "ChainLens — Explainable Crypto Fraud Money-Flow Detection",
      "鏈鏡 ChainLens — 可解釋的虛擬資產詐騙金流偵測",
    ),
    shortTitle: l("ChainLens", "鏈鏡 ChainLens"),
    // category: from awards.ts (fintech-taipei-2026)
    summary: l(
      "Compliance screening for Taiwanese virtual asset service providers, where every risk flag comes with the graph evidence behind it rather than a bare score.",
      "為台灣虛擬資產服務商設計的法遵篩查工具——每個風險判定都附上背後的圖結構證據，而不是一個黑箱分數。",
    ),
    description: l(
      "A withdrawal screening platform for virtual asset service providers. Two engines judge each request: a rule engine that traces the fund path upstream and matches laundering patterns such as fan-in collection, rapid fan-out and peeling chains, and a graph neural network (GraphSAGE) that scores the structure around the destination. The model can only raise a release to enhanced review — it never holds or downgrades on its own — and every decision comes with its evidence chain and a draft suspicious transaction report, with a person making the final call. The public demo runs on synthetic scenarios, and the model has not yet been validated on real labelled data. Separately, GCN / GraphSAGE baselines are benchmarked offline on the Elliptic dataset (203k Bitcoin transactions).",
      "為虛擬資產服務商打造的出金審查平台。每筆出金由兩個引擎判斷：規則引擎往上游追資金路徑、比對集資、快速分散、剝皮鏈等洗錢圖樣；圖神經網路（GraphSAGE）評估目的地址周邊的結構。模型只能把「放行」升為「加強審查」，不能自己暫緩或降級；每個判定都附證據鏈與可疑交易申報草稿，最後由人工決定。公開示範使用合成劇本，模型尚未在真實標註資料上驗證。另以 GCN／GraphSAGE 在 Elliptic 資料集（20.3 萬筆比特幣交易）上做離線研究基準。",
    ),
    outcome: l(
      "Won the FinTech Taipei Awards 2026 (Financial Innovation Award, Campus Division) — one of three winning teams — as team lead of a three-person team, with a live screening demo deployed.",
      "以三人團隊負責人身分獲 2026 台北金融科技獎金融創新獎校園組優勝（三支優勝團隊之一），並已部署可線上操作的篩查 demo。",
    ),
    tags: ["SNA", "Graph Neural Networks", "AML Compliance", "Python", "Next.js"],
    link: "https://github.com/zuemen/ChainLens",
    demoUrl: "https://chain-lens-beta.vercel.app",
    video: demoVideo("chainlens", 115.5),
  },
  {
    slug: "evidence-at-source",
    featured: true,
    title: l(
      "Evidence at Source — Worker-Held Credentials for AI Agents",
      "Evidence at Source 證據前置 — 讓 AI Agent 問得到答案、拿不到資料",
    ),
    shortTitle: l("Evidence at Source", "Evidence at Source 證據前置"),
    // category: from awards.ts (gleif-appreciation-award-2026)
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
    video: demoVideo("evidence-at-source", 93.2),
  },
  {
    slug: "pepelab",
    featured: true,
    title: l(
      "MedSSI — Health Credentials Disclosed Field by Field",
      "MedSSI — 醫療憑證選擇性揭露與領藥驗證",
    ),
    shortTitle: l("MedSSI", "MedSSI"),
    // category: from awards.ts (moda-digital-credential-2025)
    summary: l(
      "A hospital issues a health credential once; the patient keeps it in Taiwan's government digital wallet, and a pharmacy, researcher or insurer sees only the fields its scenario allows.",
      "醫院只發一次健康憑證，病人放在政府的數位憑證皮夾裡；藥局、研究單位或保險只看得到各自情境允許的欄位。",
    ),
    description: l(
      "Led team PepeLab in a national competition hosted by the Ministry of Digital Affairs, Taiwan. A patient collecting medication, joining a study or filing a claim usually hands over far more of their record than anyone needs. MedSSI, built on SSI, VC and DID standards, lets the hospital issue one credential that the patient holds in the government's digital wallet; issuance and presentation verification run through the Ministry's wallet sandbox, and a local layer enforces FHIR-path selective disclosure and a minimum identity-assurance level, rejecting any field outside the scenario.",
      "帶領 PepeLab 團隊參加數位發展部主辦的全國競賽。病人領藥、參加研究或申請理賠時，往往得交出遠超過對方需要的病歷。MedSSI 以 SSI、VC 與 DID 標準，讓醫院只發一次憑證、由病人存放在政府的數位憑證皮夾；發卡與出示驗證走數位部皮夾沙盒，本地層再依 FHIR 路徑執行選擇性揭露與最低身分保證等級，情境外的欄位一律拒收。",
    ),
    outcome: l(
      "Merit Award (學生組優選) at the Digital Credential Scenario Innovation Challenge, Nov 2025. Delivered a working credential verification system and translated government interoperability requirements into implementable technical specifications.",
      "2025 年 11 月獲數位憑證場景創新賽學生組優選。交付可運作的憑證驗證系統，並將政府互通需求轉化為可實作的技術規格。",
    ),
    tags: ["SSI", "VC/DID", "FastAPI", "Python", "System Architecture"],
    image: "/digital_credential_new.jpg",
    link: "https://github.com/zuemen/pepelab_v2",
    caseStudyUrl: "/projects/pepelab",
    video: demoVideo("medssi", 87.1),
  },
  {
    // Research prototype on testnet. Never describe the vault as fully
    // collateralised, and keep the "no real assets" framing from the README.
    slug: "pepefi-onchain-cfd",
    featured: true,
    // Since 2026-10 the project's focus is the rwa-poc tenant: CFDs as the
    // trading engine, RWA-referenced markets, credential-gated access. The
    // 70/20/10 revenue router is not executed on that deployment, so it is not
    // claimed here; pricing comes from a keeper-fed guarded oracle.
    title: l(
      "PepeFi — RWA-Referenced Perpetual CFDs with Verifiable-Credential Access",
      "PepeFi — 參照真實資產的鏈上永續差價合約（可驗證憑證准入）",
    ),
    shortTitle: l("PepeFi On-Chain CFD", "PepeFi 鏈上差價合約"),
    category: l(
      "NCCU Capstone 2026 — Base Sepolia Testnet",
      "政大 2026 畢業專題 — Base Sepolia 測試網",
    ),
    summary: l(
      "A testnet perpetual-CFD engine on Base Sepolia whose markets reference US equities, gold and crypto. RWA positions require an on-chain-verified credential, and AI agents trade only inside an owner-bounded session.",
      "部署於 Base Sepolia 測試網的永續差價合約引擎，市場參照美股、黃金與加密資產；開 RWA 部位須提交鏈上驗證的憑證，AI agent 只能在擁有者限定的 session 內下單。",
    ),
    description: l(
      "A perpetual CFD engine whose markets reference real-world assets — US equities, gold and crypto — as synthetic exposure: nothing real is issued or held. Opening a position on an RWA market requires an on-chain-verified \"qualified investor\" credential, equities switch to reduce-only while their market is closed, and an AI agent can trade only inside a session its owner has bounded on-chain. A keeper pushes public market prices into a guarded oracle on a GitHub Actions schedule, and market signals are sold per request over x402 — USDC over HTTP, settled by a public facilitator. A research prototype: testnet only, mock USDC as margin, and self-issued credentials.",
      "永續差價合約引擎，市場參照美股、黃金與加密資產等真實世界資產，但只是合成部位：不發行、也不持有任何實體資產。開 RWA 部位前須提交經鏈上驗證的「合格投資人」可驗證憑證；美股休市時自動切換為只減倉；AI agent 只能在擁有者於鏈上限定的 session 內下單。價格由 keeper 依 GitHub Actions 排程寫入有界的預言機，市場訊號則透過 x402 按次販售（以 USDC 在 HTTP 上付款，由公開 facilitator 結算）。屬研究原型：僅限測試網、保證金為 MockUSDC、憑證為自行簽發。",
    ),
    outcome: l(
      "Deployed to Base Sepolia with a working web front end; positions have been opened and closed on-chain both by an investor wallet and by an agent trading through its session.",
      "已部署於 Base Sepolia 並有可運作的網頁前端；投資人錢包與透過 session 下單的 agent 都已在鏈上實際開倉、平倉。",
    ),
    tags: ["Solidity", "Foundry", "Base Sepolia", "RWA", "Verifiable Credentials", "x402", "Agent Delegation"],
    link: "https://github.com/zuemen/pepelab_onchain_cfd",
    demoUrl: "https://pepelab-rwa-poc.vercel.app",
    video: demoVideo("pepefi", 88.1),
  },
  {
    // Same codebase as PepeFi, deployed separately (fresh keys, fresh
    // addresses) for the hackathon; the repository's SUBMISSION.md §12
    // discloses which parts predate the contest.
    slug: "mandate-layer",
    featured: true,
    title: l(
      "Mandate Layer — Trading Mandates for AI Agents, Enforced On-Chain",
      "Mandate Layer — 由合約強制執行的 AI agent 交易授權",
    ),
    shortTitle: l("Mandate Layer", "Mandate Layer"),
    category: l(
      "Colosseum Crypto World's Fair 2026 — Base Track",
      "2026 Colosseum Crypto World's Fair — Base 賽道",
    ),
    summary: l(
      "A user gives an AI trading agent a mandate — per-order margin, total budget, leverage cap, asset list, expiry — and a contract on Base checks it on every order.",
      "使用者給 AI 交易 agent 一份授權——單筆保證金、總預算、槓桿上限、資產清單、到期日——由 Base 上的合約在每一筆下單時檢查。",
    ),
    description: l(
      "Built on the PepeFi perpetual CFD exchange, Mandate Layer bounds what an autonomous agent can do with a user's funds. Before any position opens, the AgentSessionManager contract checks the agent's identity, whether the session was revoked or has expired, the asset allowlist, per-order margin, cumulative budget and leverage, and a session can only close positions it opened itself. The mandate is signed as an EIP-712 credential by an ordinary wallet or an ERC-1271 smart account, margin can be topped up through Base Spend Permissions, and agents pay for market data and signals over x402. It started before the contest as the PepeLab capstone; the submission lists which parts were built during the hackathon.",
      "建立在 PepeFi 永續差價合約交易所之上，用來限制自主 agent 能拿使用者的資金做什麼。任何部位開倉前，AgentSessionManager 合約會依序檢查 agent 身分、session 是否已撤銷或過期、資產白名單、單筆保證金、累計預算與槓桿；session 也只能平掉自己開的部位。授權以 EIP-712 憑證簽署，一般錢包或 ERC-1271 智能合約帳戶皆可；保證金可透過 Base Spend Permissions 補入；agent 以 x402 付費取得行情與訊號。本專案在賽前以 PepeLab 畢業專題起步，提交文件逐項列出哪些部分是賽期內完成。",
    ),
    outcome: l(
      "A separate deployment on Base Sepolia with an agent-mode page where the contract's refusals can be seen without connecting a wallet. Known limits — testnet only, mock USDC, a single keeper key that posts prices — are documented in the submission.",
      "在 Base Sepolia 上獨立部署，並提供 agent 模式頁面，不連錢包也能看到合約拒絕越權下單。已知限制——僅限測試網、MockUSDC、由單一 keeper 金鑰寫入價格——都寫在提交文件中。",
    ),
    tags: ["Solidity", "Base Sepolia", "AI Agents", "EIP-712", "x402", "TypeScript"],
    link: "https://github.com/zuemen/mandate-layer",
    demoUrl: "https://zuemen.github.io/mandate-layer/agent-mode",
    video: demoVideo("mandate-layer", 85.7),
  },
  {
    slug: "agent-passport",
    featured: true,
    title: l(
      "Agent Passport — Verifiable Identity and Mandates for Paying AI Agents",
      "Agent Passport — 讓付款的 AI agent 帶著可驗證身分與授權",
    ),
    shortTitle: l("Agent Passport", "Agent Passport"),
    category: l(
      "Monad Metropolis 2026 — Track 04",
      "2026 Monad Metropolis 黑客松 — Track 04",
    ),
    summary: l(
      "Before an AI agent pays, the receiving contract checks — in the same transaction — who authorised it, what its mandate allows, and whether that mandate is still valid.",
      "AI agent 付款前，收款方合約在同一筆交易裡檢查：誰授權了它、授權範圍是什麼、授權是否仍然有效。",
    ),
    description: l(
      "An ERC-8004 agent identity plus a selectively disclosed mandate: the owner signs the mandate once, and the agent reveals only the fields a counterparty needs, each proven against a Merkle root. On Monad testnet, PassportGate checks the identity, the mandate's status, the Merkle proofs, the agent's signature and a daily limit inside the payment transaction, and a revoked mandate is refused on-chain. The owner's organisation can be verified with GLEIF vLEI credentials against a local KERIA test setup, and any MCP-capable agent can use the passport through four MCP tools, tested with Claude Code.",
      "ERC-8004 agent 身分加上可選擇性揭露的授權：擁有者簽署一次授權，agent 只揭露對方需要的欄位，每個欄位都以 Merkle 根證明。在 Monad 測試網上，PassportGate 在付款交易內檢查身分、授權狀態、Merkle 證明、agent 簽章與每日額度；已撤銷的授權會在鏈上被拒絕。擁有者所屬組織可用 GLEIF vLEI 憑證在本機 KERIA 測試環境中驗證；任何支援 MCP 的 agent 都能透過四個 MCP 工具使用這本護照，並以 Claude Code 實測。",
    ),
    outcome: l(
      "Twelve contracts deployed to Monad testnet and verified on Sourcify (exact match), 147 tests across contracts, SDK, MCP server and verifier, and a nine-transaction storyline in which the contracts refuse four.",
      "十二個合約部署於 Monad 測試網並在 Sourcify 完全比對驗證；合約、SDK、MCP 伺服器與驗證器共 147 個測試；示範情節共九筆交易，其中四筆被合約拒絕。",
    ),
    tags: ["Solidity", "Monad", "ERC-8004", "vLEI", "MCP", "TypeScript"],
    link: "https://github.com/zuemen/agent-passport",
    demoUrl: "https://zuemen.github.io/agent-passport/",
    video: demoVideo("agent-passport", 106.8),
  },
  {
    slug: "rwa-tokenization",
    title: l(
      "Real World Asset (RWA) Real Estate Tokenization",
      "實體資產（RWA）不動產代幣化",
    ),
    shortTitle: l("RWA Real Estate Tokenization", "RWA 不動產代幣化"),
    category: l("Blockchain Implementation", "區塊鏈實作"),
    // Wording follows the code (repo read 2026-10-25): the identity registry is
    // a mock allowlist, rent is paid out by an owner call and claimed by
    // holders, listings are sample data, and it runs on a local network only.
    summary: l(
      "Fractional property ownership in Solidity, with the identity check enforced inside the token contract rather than off-chain.",
      "以 Solidity 實作不動產碎片化持有，把身分檢查寫進代幣合約本身，而不是放在鏈下。",
    ),
    description: l(
      "A local-network prototype of fractional real-estate ownership. PropertyToken only moves between addresses on an on-chain KYC allowlist (a simplified stand-in for an ERC-3643 identity registry), and RentalDistributor splits rent pro rata among holders, who claim their own share. Listings and yields in the demo are sample data.",
      "不動產碎片化持有的本地網路原型。PropertyToken 只能在鏈上 KYC 白名單（ERC-3643 身分登錄的簡化版）內的地址之間轉移；RentalDistributor 依持有比例分配租金，由持有人自行領取。demo 中的物件與收益率是範例資料。",
    ),
    outcome: l(
      "Four Solidity contracts (IdentityRegistry, PropertyToken, RentalDistributor, MockUSDC) on a local Hardhat network, wired to a React frontend and a Node backend, with Hardhat tests for the rent distribution. A transfer to an address outside the allowlist is rejected by the token contract itself.",
      "四支 Solidity 合約（IdentityRegistry、PropertyToken、RentalDistributor、MockUSDC）部署在本地 Hardhat 網路，串接 React 前端與 Node 後端，並有租金分配的 Hardhat 測試；轉給白名單外地址的交易由代幣合約本身拒絕。",
    ),
    tags: ["Solidity", "Hardhat", "RWA", "Fractional Ownership", "React"],
    // No source link: the owner archived zuemen/rwa_g on 2026-10-25.
  },
  {
    slug: "qml-simulation",
    title: l(
      "Quantum Machine Learning (QML) Simulation",
      "量子機器學習（QML）模擬",
    ),
    shortTitle: l("Quantum Machine Learning Simulation", "量子機器學習模擬"),
    // One notebook, one seed, no committed outputs (repo read 2026-10-25):
    // described as a method, not as a measured result.
    category: l("Quantum ML Study", "量子機器學習練習"),
    summary: l(
      "A 2×2 design crossing classical and quantum data sources with classical and quantum classifiers, set up to tell a data advantage from a model advantage.",
      "以 2×2 設計交叉古典／量子資料與古典／量子分類器，用來分辨優勢來自資料還是模型。",
    ),
    description: l(
      "A Qiskit notebook comparing quantum and classical classifiers under a 2×2 design: two data sources (a classical non-linearly-separable set, and one sampled from a parameterised two-qubit circuit on Aer) crossed with two model families — QSVM (ZZFeatureMap + fidelity quantum kernel), a variational QNN and a QSVT-style approximation, against a logistic-regression baseline.",
      "以 Qiskit notebook 在 2×2 設計下比較量子與古典分類器：兩種資料來源（非線性可分的古典資料集，以及在 Aer 上由參數化雙量子位元電路取樣產生的資料）交叉兩類模型——QSVM（ZZFeatureMap + fidelity 量子核）、變分 QNN 與 QSVT 式近似，並以邏輯斯迴歸為基準。",
    ),
    outcome: l(
      "A runnable notebook with the four comparisons side by side. It is a single-seed simulation with no saved results, so it shows the method rather than a measured advantage.",
      "可執行的 notebook，四組比較並排設定。只用單一 seed 模擬、未存結果，展示的是方法，不是已量測到的優勢。",
    ),
    tags: ["QML", "Qiskit", "QSVM", "QNN", "Python"],
    // No source link: the owner archived zuemen/qc_ML on 2026-10-25.
  },
];

/**
 * Source of truth for projects, read by the Projects list on /projects and the
 * Selected Work section on the homepage, so the two cannot drift apart. The
 * award badge comes from data/awards.ts so it cannot drift from Experience.
 */
export const projects: Project[] = entries.map((entry) => {
  const award = awardFor(entry.slug);
  const category = (award && awardBadge(award)) ?? entry.category;
  if (!category) {
    throw new Error(`Project "${entry.slug}" has neither an award nor a category`);
  }
  return { ...entry, category, awardTier: award?.tier };
});
