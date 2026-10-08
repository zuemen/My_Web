import { l, type L } from "@/i18n/config";
import type { TrackId } from "./tracks";

export type ChainId = "monad-testnet" | "base-sepolia" | "sepolia";

export const chains: Record<ChainId, { name: string; explorer: string }> = {
  "monad-testnet": { name: "Monad testnet", explorer: "https://testnet.monadscan.com" },
  "base-sepolia": { name: "Base Sepolia", explorer: "https://sepolia.basescan.org" },
  sepolia: { name: "Ethereum Sepolia", explorer: "https://sepolia.etherscan.io" },
};

export interface Contract {
  name: string;
  address: string;
}

export interface Deployment {
  chain: ChainId;
  /** How many contracts are source-verified, and where — as the README states it. */
  verified: L;
  /** The few contracts a reader would actually open; the full list stays in the repo. */
  contracts: Contract[];
}

export interface Proof {
  value: string;
  label: L;
}

export type BadgeTone = "award" | "competing" | "neutral";

export interface Project {
  slug: string;
  track: TrackId;
  title: L;
  /** Compact title for cards and lists, where the full one is too long. */
  shortTitle: L;
  /** Small label above the title: award, competition or context. */
  category: L;
  badge?: { label: L; tone: BadgeTone };
  /** One line for cards. */
  summary: L;
  description: L;
  /** What the project actually produced or resolved — not just the stack used. */
  outcome: L;
  /** Case-study fields. Present only for projects with a page under /projects/[slug]. */
  problem?: L;
  customers?: L;
  steps?: L[];
  proof?: Proof[];
  deployment?: Deployment;
  videos?: { label: L; href: string }[];
  /** Limits the project's own README insists on. Shown, never softened. */
  caveats?: L[];
  role?: L;
  tags: string[];
  /** Shown on the homepage. */
  featured?: boolean;
  /** Has an animated replay in components/demos. */
  demo?: "agent-passport" | "mandate-layer" | "carbon-lei" | "chainlens" | "mcp-vlei";
  image?: string;
  /** Source repository. */
  link?: string;
  /** Live, working demo. */
  demoUrl?: string;
  certificateUrl?: string;
  /** Custom case-study route; otherwise /projects/[slug] when `problem` is set. */
  caseStudyUrl?: string;
}

/**
 * Source of truth for projects, read by /projects, /projects/[slug] and the
 * homepage. Every number below is quoted from the project's own README or
 * demo log (checked 2026-10-08); where a README carries a caveat, it is
 * carried here too.
 */
export const projects: Project[] = [
  // ── Agent mandates ─────────────────────────────────────────────────────
  {
    slug: "agent-passport",
    track: "mandates",
    featured: true,
    demo: "agent-passport",
    title: l(
      "Agent Passport — Verifiable Mandates for AI Agents on Monad",
      "Agent Passport — 在 Monad 上驗證 AI agent 的授權",
    ),
    shortTitle: l("Agent Passport", "Agent Passport"),
    category: l("Monad Metropolis · Trust & AI infrastructure", "Monad Metropolis · 信任與 AI 基礎設施賽道"),
    summary: l(
      "Before an agent moves money, any protocol can check in one call that its owner signed a mandate, what it allows, and whether it still holds — seeing four claims, not the owner's name.",
      "agent 動用資金之前，任何協議都能一次呼叫查證：擁有者是否簽了授權、授權允許什麼、是否仍有效——對方只看到四項聲明，看不到擁有者是誰。",
    ),
    description: l(
      "An owner-signed, selectively disclosed mandate for an ERC-8004 agent, checked inside the payment itself. The receiving contract verifies the agent's identity, the mandate's status, four Merkle-proven claims, the agent's signature and the daily budget in the transaction that moves the money, and pulls funds from the owner rather than the agent. A revoke binds every relying party from the agent's next action. Agents use it through four MCP tools.",
      "為 ERC-8004 agent 設計、由擁有者簽署並可選擇性揭露的授權，直接在付款交易內檢查。收款合約在動用資金的同一筆交易中驗證 agent 身分、授權狀態、四項 Merkle 證明的聲明、agent 簽章與每日額度，並從擁有者而非 agent 扣款。一旦撤銷，所有依賴方從 agent 的下一個動作起就會拒絕。Agent 透過四個 MCP 工具使用。",
    ),
    outcome: l(
      "A nine-transaction storyline on Monad testnet, four of them refused on-chain with the gate's reason — including a simulated prompt injection. 12 contracts source-verified; 827 ms median submit-to-receipt.",
      "在 Monad 測試網上跑完 9 筆交易的完整情境，其中 4 筆被鏈上閘門拒絕並附原因——包括一次模擬的 prompt injection。12 支合約完成原始碼驗證；送出到上鏈中位數 827 毫秒。",
    ),
    problem: l(
      "ERC-8004 gives an agent an identity, but deliberately not who answers for it or what it may spend. Wallet-side limits cap a key; they don't let the receiving protocol verify the mandate. And an agent that holds funds can be talked out of them.",
      "ERC-8004 給了 agent 身分，卻刻意不規範誰為它負責、它能花多少。錢包端的限制只能限制金鑰，收款方仍無法驗證授權內容；而持有資金的 agent 可能被話術騙走資金。",
    ),
    customers: l(
      "Protocols that receive agent payments — DEXs, merchants, lenders, x402 API providers — and institutions that deploy agents and need to cap, scope and revoke them.",
      "接收 agent 付款的協議——DEX、商家、借貸平台、x402 API 供應商——以及部署 agent、需要設限、限定範圍與撤銷授權的機構。",
    ),
    steps: [
      l("The owner signs a mandate (EIP-712 or passkey): scopes, per-transaction and daily limits, allowed payees. Each claim is salted and Merkle-hashed; the root is anchored on Monad.", "擁有者以 EIP-712 或 passkey 簽署授權：範圍、單筆與每日上限、允許的收款方。每項聲明加鹽後做 Merkle 雜湊，根值錨定在 Monad 上。"),
      l("The agent presents only four claims through MCP — scope, per-tx limit, daily limit, payee allowed. The owner's identity stays private.", "agent 透過 MCP 只出示四項聲明——範圍、單筆上限、每日上限、收款方是否允許。擁有者身分保持私密。"),
      l("PassportGate checks everything inside the payment and pulls funds from the owner. A breach reverts with a named reason.", "PassportGate 在付款交易內完成所有檢查，並從擁有者扣款。違反任一條件就以具名原因 revert。"),
      l("Revocation is one transaction; the next action from the agent is refused by every protocol that checks.", "撤銷只要一筆交易；之後 agent 的下一個動作，所有會檢查的協議都會拒絕。"),
    ],
    proof: [
      { value: "12", label: l("contracts source-verified (Sourcify)", "支合約原始碼驗證（Sourcify）") },
      { value: "147", label: l("tests + 3 fork tests on ERC-8004", "個測試＋3 個 ERC-8004 fork 測試") },
      { value: "12/12", label: l("mutants caught by the test suite", "個變異全被測試抓到") },
      { value: "827 ms", label: l("median submit → receipt", "送出到上鏈中位數") },
    ],
    deployment: {
      chain: "monad-testnet",
      verified: l("12 contracts, exact match on Monad's Sourcify", "12 支合約，Monad Sourcify 完全比對"),
      contracts: [
        { name: "PassportGate", address: "0xb93Ddb5E34a2d8a16ebe3DA88851d4a805fFD109" },
        { name: "CredentialStatusRegistry", address: "0xD1bC9758F76b6Ea18fbEE824a8Fe8A99c5fcC451" },
        { name: "AgentIdentityRegistry (ERC-8004)", address: "0x5Df260dec1Ba15368f7fBe338D01a4C764CEAA51" },
      ],
    },
    videos: [
      { label: l("Demo, 2:49", "Demo 影片 2:49"), href: "https://youtu.be/75rzPJgP5L8" },
      { label: l("Pitch, 1:45", "簡報影片 1:45"), href: "https://youtu.be/xpdvNjJKUjQ" },
    ],
    caveats: [
      l("Testnet only, with demo tokens (apUSD). No external team has integrated it yet.", "僅測試網、使用展示代幣（apUSD）。尚無外部團隊整合。"),
      l("The vLEI result in the storyline is a stand-in; the full vLEI check ran against a local test chain.", "情境中的 vLEI 結果為替代紀錄；完整 vLEI 驗證是在本機測試鏈上執行。"),
      l("The daily limit resets per UTC day, so up to twice the limit can be spent across midnight.", "每日額度以 UTC 日重置，跨午夜最多可花到兩倍額度。"),
      l("The four disclosed claims become public once the action executes.", "動作執行後，揭露的四項聲明會公開在鏈上。"),
    ],
    role: l("Protocol and engineering (team of two, NCCU)", "協議設計與工程（兩人團隊，政大）"),
    tags: ["Solidity", "Foundry", "ERC-8004", "EIP-712", "WebAuthn", "MCP", "vLEI"],
    link: "https://github.com/zuemen/agent-passport",
    demoUrl: "https://zuemen.github.io/agent-passport/",
  },
  {
    slug: "mandate-layer",
    track: "mandates",
    featured: true,
    demo: "mandate-layer",
    title: l(
      "Mandate Layer — Bounded AI Agents for On-Chain Derivatives",
      "Mandate Layer — 為鏈上衍生品交易 agent 設下授權邊界",
    ),
    shortTitle: l("Mandate Layer", "Mandate Layer"),
    category: l("Colosseum Crypto World's Fair · Base track", "Colosseum Crypto World's Fair · Base 賽道"),
    badge: { label: l("In competition", "參賽中"), tone: "competing" },
    summary: l(
      "A user gives a trading agent a mandate — per-trade margin, total budget, leverage, assets, expiry — and a contract on Base enforces it on every order. The agent pays for its market data per call over x402.",
      "使用者給交易 agent 一份授權——單筆保證金、總預算、槓桿、資產、期限——由 Base 上的合約在每一筆下單時強制執行。agent 透過 x402 按次付費取得市場數據。",
    ),
    description: l(
      "AgentSessionManager holds a user-created session per agent and checks it on chain on every order; the user also signs a W3C authorization credential (did:pkh, EIP-712 or ERC-1271) that the agent SDK cross-checks before sending. Market data and trader signals are sold per call over x402 in Circle USDC, with signal fees split 70/20/10 on chain. A Base Account can fund the agent through a Coinbase Spend Permission capped per day.",
      "AgentSessionManager 為每個 agent 保存使用者建立的 session，並在每一筆下單時於鏈上檢查；使用者另簽一張 W3C 授權憑證（did:pkh，EIP-712 或 ERC-1271），agent SDK 送單前會交叉比對。市場數據與交易訊號透過 x402 以 Circle USDC 按次販售，訊號費在鏈上 70/20/10 分潤。Base Account 可透過 Coinbase Spend Permission 為 agent 補保證金，並設每日上限。",
    ),
    outcome: l(
      "An eight-step run with keys held by three separate parties, every on-chain step linked to BaseScan; two orders mined and reverted by the contract — one over the cap, one after revocation. 17 contracts verified on Blockscout and Sourcify.",
      "由三方各自持有金鑰跑完八個步驟，每個鏈上步驟都可在 BaseScan 查證；其中兩筆下單被合約上鏈後 revert——一筆超過上限、一筆在撤銷之後。17 支合約在 Blockscout 與 Sourcify 完成驗證。",
    ),
    problem: l(
      "Trading agents today get either the user's whole key or an approval prompt on every order. Existing session tools cap spend, but don't understand leverage, assets or cumulative exposure.",
      "現在的交易 agent 要嘛拿到使用者整把金鑰，要嘛每一筆單都要使用者批准。既有的 session 工具能限制花費，卻不理解槓桿、資產別或累積曝險。",
    ),
    customers: l(
      "Teams shipping trading agents, and perp venues on Base that want agent order flow without all-or-nothing keys. Licensing the mandate layer (B2B) is the main bet; demand interviews are in progress.",
      "推出交易 agent 的團隊，以及想接 agent 訂單、又不想交出整把金鑰的 Base 永續合約交易所。主要商業模式是授權 mandate layer（B2B）；需求訪談進行中。",
    ),
    steps: [
      l("The user opens a session: 50 per trade, 150 total budget, 3× leverage, sBTC and sETH only, 7-day expiry.", "使用者開一個 session：單筆 50、總預算 150、3 倍槓桿、只限 sBTC 與 sETH、7 天期限。"),
      l("The agent pays for data per call: HTTP 402 → USDC authorisation (EIP-3009) → 200.", "agent 按次付費取得數據：HTTP 402 → USDC 授權付款（EIP-3009）→ 200。"),
      l("Orders inside the mandate fill; an order over the cap is mined and reverted with MarginExceedsPerTradeCap.", "授權範圍內的單成交；超過上限的單會上鏈後以 MarginExceedsPerTradeCap revert。"),
      l("The user revokes; the agent's next order reverts with SessionIsRevoked.", "使用者撤銷後，agent 的下一筆單以 SessionIsRevoked revert。"),
    ],
    proof: [
      { value: "17", label: l("contracts verified (Blockscout + Sourcify)", "支合約完成驗證（Blockscout＋Sourcify）") },
      { value: "773", label: l("Forge tests in CI", "個 Forge 測試在 CI 執行") },
      { value: "3", label: l("separate key holders in the demo run", "方各自持有金鑰執行 demo") },
      { value: "70/20/10", label: l("x402 revenue split, on chain", "x402 收入鏈上分潤") },
    ],
    deployment: {
      chain: "base-sepolia",
      verified: l("17 contracts, exact match on Blockscout and Sourcify", "17 支合約，Blockscout 與 Sourcify 完全比對"),
      contracts: [
        { name: "AgentSessionManager", address: "0x71125e25c903AD4e198e1863d5Bf26df97926CDe" },
        { name: "PerpetualExchange", address: "0xC45dEd77F4A30658e3c52E6fB4809E502e3D3B0E" },
        { name: "x402 FeeRouter", address: "0xEeDcEE7cD62A644EA4Cf053f213d5D75dB0B49c6" },
      ],
    },
    videos: [
      { label: l("Presentation, 2:37", "簡報影片 2:37"), href: "https://youtu.be/GQSsAXWd1_k" },
      { label: l("Product demo, 2:38", "產品 Demo 2:38"), href: "https://youtu.be/q5XAdTDEE6U" },
    ],
    caveats: [
      l("Research prototype on Base Sepolia. No real assets; margin is a mock USDC. Not investment advice.", "Base Sepolia 上的研究原型，不涉及真實資產；保證金為模擬 USDC。非投資建議。"),
      l("Prices come from a keeper-fed mock oracle.", "價格來自 keeper 餵價的模擬預言機。"),
      l("Started before the contest as the PepeFi capstone; the submission discloses the prior work.", "比賽前已以 PepeFi 畢業專題起步；參賽文件已揭露既有成果。"),
    ],
    role: l("Founder and lead developer — contracts, agent SDK, MCP server, frontend (team of three, NCCU)", "發起人與主要開發者——合約、agent SDK、MCP server、前端（三人團隊，政大）"),
    tags: ["Solidity", "Foundry", "Base", "x402", "EIP-3009", "Spend Permissions", "MCP"],
    link: "https://github.com/zuemen/mandate-layer",
    demoUrl: "https://zuemen.github.io/mandate-layer/agent-mode",
  },
  {
    // Research prototype on testnet. Never describe the vault as fully
    // collateralised, and keep the "no real assets" framing from the README.
    slug: "pepefi-onchain-cfd",
    track: "mandates",
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
      "The exchange engine the agent-session idea started in: a perpetual CFD protocol on Base Sepolia with session-bounded agents and x402-paid signals.",
      "agent session 構想的起點：部署於 Base Sepolia 的永續差價合約協議，含 session 限權的交易 agent 與 x402 付費訊號。",
    ),
    description: l(
      "A proof-of-concept perpetual CFD protocol deployed to the Base Sepolia testnet, with an on-chain price keeper run on a schedule by GitHub Actions and oracle integration for pricing. Autonomous trading is delegated through session-bounded permissions, so an agent can open positions only within limits the owner signs off, and market signals are sold per request over an x402 payment-gated API — paid in USDC over HTTP, settled on-chain by an x402 facilitator, with the revenue split between trader, platform and protocol by a router contract. A research prototype that holds no real assets.",
      "部署於 Base Sepolia 測試網的永續差價合約概念驗證協議，鏈上報價由 GitHub Actions 排程執行，並串接預言機定價。自主交易透過 session 範圍授權委派，agent 只能在擁有者簽署的限額內開倉；市場訊號則透過 x402 付費 API 按次販售 —— 以 USDC 在 HTTP 上付款、由 x402 facilitator 在鏈上結算，收入再由路由合約在交易者、平台與協議之間分潤。屬研究原型，不涉及任何真實資產。",
    ),
    outcome: l(
      "Contracts live on Base Sepolia with a working web front end. Mandate Layer is the agent-trading slice of this engine, packaged for Base.",
      "合約已部署於 Base Sepolia 並有可運作的網頁前端。Mandate Layer 即是從這個引擎切出、為 Base 重新包裝的 agent 交易層。",
    ),
    tags: ["Solidity", "Foundry", "Base Sepolia", "x402", "Agent Delegation"],
    link: "https://github.com/zuemen/pepelab_onchain_cfd",
    demoUrl: "https://pepelab-onchain-cfd-djot.vercel.app",
  },

  // ── Verifiable organisational identity ─────────────────────────────────
  {
    slug: "carbon-lei",
    track: "identity",
    featured: true,
    demo: "carbon-lei",
    title: l(
      "CarbonLEI — Checkable Carbon-Border Emissions Reports",
      "CarbonLEI — 可查證的歐盟碳邊境（CBAM）排放報告",
    ),
    shortTitle: l("CarbonLEI", "CarbonLEI"),
    category: l("IEEE ClimateChain Global Hackathon · Sustainable supply chains", "IEEE ClimateChain 全球黑客松 · 永續供應鏈賽道"),
    badge: { label: l("In competition", "參賽中"), tone: "competing" },
    summary: l(
      "A carbon number is only as trustworthy as the person who signed it. CBAM reports become checkable: who signed, were they authorised, and has each verified tonne already been claimed?",
      "碳排數字的可信度，取決於簽它的人。讓 CBAM 報告可以被查證：誰簽的、他是否被授權、每一噸已驗證的貨是不是已經被申報過？",
    ),
    description: l(
      "The lead auditor's vLEI role credential is checked against a GLEIF-rooted chain; at the block that registers a report, the contract checks the verification body is accredited and the auditor not revoked; and an on-chain ledger deducts each shipment from the report's verified tonnage, rejecting a batch claimed twice or a claim beyond what remains. A buyer runs eight checks in the browser, each labelled with where its evidence came from.",
      "首席查證員的 vLEI 職務憑證會對照 GLEIF 為根的憑證鏈驗證；登記報告的那個區塊，合約會檢查查證機構是否具認證、查證員是否已被撤銷；鏈上帳本則把每批出貨從報告的已驗證噸數中扣除，重複申報或超出剩餘噸數都會被拒絕。買方在瀏覽器裡跑八項檢查，每一項都標明證據來源。",
    ),
    outcome: l(
      "19 of 19 tampered inputs detected and 0 of 28 valid variants rejected. Both contracts source-verified on Sepolia, with every attack in the demo reproducible from a public transaction or dry run.",
      "19 個竄改輸入全數偵測、28 個正確變體 0 誤拒。兩支合約在 Sepolia 完成原始碼驗證，demo 中的每一種攻擊都可從公開交易或 dry run 重現。",
    ),
    problem: l(
      "EU importers rely on a supplier's verified emissions figure instead of the punitive default — but a PDF can't show who signed it, whether they were authorised that day, or whether the same tonnes were already sold to another importer.",
      "歐盟進口商若能採用供應商的已驗證排放值，就不必套用懲罰性的預設值——但一份 PDF 無法證明是誰簽的、他當天是否被授權，也無法證明同一批噸數有沒有已經賣給另一個進口商。",
    ),
    customers: l(
      "EU importers' CBAM compliance officers, non-EU suppliers (the demo corridor is Taiwanese fasteners into the EU), and downstream buyers or banks that rely on the verified value.",
      "歐盟進口商的 CBAM 法遵人員、歐盟以外的供應商（demo 走台灣螺絲出口歐盟的路線），以及依賴已驗證數值的下游買家或銀行。",
    ),
    steps: [
      l("A verification body and its lead auditor are onboarded, each backed by a vLEI chain.", "查證機構與首席查證員上線，各自有 vLEI 憑證鏈背書。"),
      l("The auditor signs the report; 500 t of goods at 1.8 tCO2e/t is registered on Sepolia.", "查證員簽署報告；500 噸貨物、每噸 1.8 tCO2e 登記在 Sepolia 上。"),
      l("Each shipment is claimed against the remaining tonnage — 200 t claimed, 300 t left.", "每批出貨從剩餘噸數中扣除——申報 200 噸，剩 300 噸。"),
      l("The buyer verifies eight checks. Then: try to break it.", "買方跑完八項檢查。接著：試著破解它。"),
    ],
    proof: [
      { value: "19/19", label: l("tampered inputs detected", "個竄改輸入被偵測") },
      { value: "0/28", label: l("valid variants rejected", "個正確變體被誤拒") },
      { value: "717", label: l("tests (contract, SDK, verifier, browser)", "個測試（合約、SDK、驗證器、瀏覽器）") },
      { value: "8", label: l("checks per verification, each sourced", "項檢查，各自標明證據來源") },
    ],
    deployment: {
      chain: "sepolia",
      verified: l("2 contracts, source verified on Etherscan", "2 支合約，Etherscan 原始碼驗證"),
      contracts: [
        { name: "EmissionsClaimRegistry", address: "0xEA52a50d3753bACD835DCd47892754b65a90ca19" },
        { name: "VerifierAllowlist", address: "0xF7AD0cbe867eb9CE4847Af3717C2d27f6434Ea5C" },
      ],
    },
    caveats: [
      l("All companies, people and LEIs are fictional; emissions values are illustrative, not official CBAM methodology.", "所有公司、人員與 LEI 皆為虛構；排放數值僅為示意，非官方 CBAM 方法。"),
      l("The vLEI root is simulated. Testnet only; no token is issued and no emission reduction is claimed.", "vLEI 根為模擬。僅測試網，不發行代幣，也不宣稱任何減排。"),
      l("Not connected to the EU CBAM Registry. The allowlist owner key is a single team-held key.", "未連接歐盟 CBAM 登錄系統。白名單擁有者金鑰為團隊持有的單一金鑰。"),
    ],
    tags: ["vLEI", "KERI", "Solidity", "Foundry", "viem", "CBAM"],
    link: "https://github.com/zuemen/carbon-lei",
    demoUrl: "https://zuemen.github.io/carbon-lei/",
  },
  {
    slug: "evidence-at-source",
    track: "identity",
    featured: true,
    title: l(
      "Evidence at Source — Worker-Held Credentials for AI Agents",
      "Evidence at Source 證據前置 — 讓 AI Agent 問得到答案、拿不到資料",
    ),
    shortTitle: l("Evidence at Source", "Evidence at Source 證據前置"),
    category: l("Trustworthy AI Hackathon 2026", "2026 可信 AI 黑客松"),
    badge: { label: l("GLEIF Appreciation Award", "GLEIF 感謝獎"), tone: "award" },
    summary: l(
      "Facts about a migrant worker are signed by both parties when they happen and held by the worker, so a bank's or brand's AI agent can get an answer without ever getting the data.",
      "關於移工的事實在發生當下由雙方簽章封存、由勞工本人持有，讓銀行或品牌的 AI Agent 拿得到答案，卻拿不到原始資料。",
    ),
    description: l(
      "A dual-signed credential wallet held by the worker, queried by verification agents that each represent an institution. Every query passes a three-layer policy gate and returns only a boolean and a reason code, never the underlying record. Agents prove whom they act for through GLEIF vLEI credential chains that are re-verified on every query, and an agent never makes the final decision: it produces a recommendation for a named human reviewer whose revocable role credential is sealed into an independently re-verifiable audit trail.",
      "由勞工持有的雙簽憑證錢包，接受代表不同機構的查驗 Agent 查詢。每次查詢都要通過三層政策閘門，只回傳布林值與原因碼，絕不回傳原始紀錄。Agent 透過 GLEIF vLEI 憑證鏈證明自己代表哪個機構，且每次查詢都重新驗證全鏈；Agent 也從不做最終決定——它只產生建議，交由具名的人類覆核者裁定，覆核者可撤銷的職務憑證會封存在可獨立重驗的稽核軌跡中。",
    ),
    outcome: l(
      "Received the GLEIF Appreciation Award. A bank's agent receives booleans, a brand's agent an aggregate compliance rate; asking which worker exceeded their hours is rejected. 592 tests behind the claims.",
      "獲 GLEIF 感謝獎。銀行的 agent 只拿到布林值、品牌的 agent 只拿到整體合規率；追問「哪位勞工超時」會被拒絕。592 個測試支撐每項主張。",
    ),
    problem: l(
      "Facts about recruitment fees, passport custody, contracts and working hours are presented by the employer alone, and banks and brands want AI agents to check them — which would normally mean handing those agents the raw records.",
      "仲介費、護照保管、契約與工時等事實，目前只由雇主單方提出；銀行與品牌想用 AI agent 查核，通常就得把原始紀錄交給這些 agent。",
    ),
    customers: l(
      "Banks (financial inclusion and anti-fraud for migrant workers) and global brands running supply-chain labour audits.",
      "銀行（移工普惠金融與反詐）以及執行供應鏈勞動稽核的國際品牌。",
    ),
    steps: [
      l("Employer and worker co-sign each fact as it happens; the worker holds the credential.", "雇主與勞工在事件發生當下共同簽署，憑證由勞工持有。"),
      l("An institution's agent proves whom it acts for through a vLEI chain, then asks a question.", "機構的 agent 先以 vLEI 憑證鏈證明自己代表誰，再提出問題。"),
      l("A three-layer gate answers with a boolean or an aggregate — never the record.", "三層閘門只回答布林值或彙總值——絕不回傳原始紀錄。"),
      l("A named human reviewer decides; revoking a credential updates every answer.", "由具名的人類覆核者裁定；撤銷憑證後，所有答案隨之更新。"),
    ],
    proof: [
      { value: "592", label: l("tests (vitest)", "個測試（vitest）") },
      { value: "9/9", label: l("external test vectors pass", "組外部測試向量通過") },
      { value: "17", label: l("step vLEI gate run in CI", "步 vLEI 驗證流程在 CI 執行") },
    ],
    caveats: [
      l("All data is synthetic; the demo cohort is six people. Not connected to any real system.", "所有資料皆為合成；demo 母體為六人。未連接任何真實系統。"),
      l("The zero-knowledge trusted setup was generated by one party — demo grade only.", "零知識證明的 trusted setup 由單方產生，僅屬展示等級。"),
    ],
    role: l("System architecture, credential and authorisation design (team of three)", "系統架構、憑證與授權設計（三人團隊）"),
    tags: ["vLEI", "SD-JWT VC", "KERI / ACDC", "Groth16", "AI Agents", "TypeScript"],
    link: "https://github.com/zuemen/evidence-at-source",
    demoUrl: "https://zuemen.github.io/evidence-at-source/",
  },
  {
    slug: "mcp-vlei",
    track: "identity",
    demo: "mcp-vlei",
    title: l(
      "mcp-vlei — Organisational Identity for the Model Context Protocol",
      "mcp-vlei — 為 MCP 協定加上組織身分",
    ),
    shortTitle: l("mcp-vlei", "mcp-vlei"),
    category: l("Reference design · v0.3", "參考設計 · v0.3"),
    summary: l(
      "MCP authenticates domains and users, but not the legal entity behind an agent. An additive extension lets a server check, on every call, which organisation an agent acts for and whether that authority still holds.",
      "MCP 能驗證網域與使用者，卻無法驗證 agent 背後的法人。這個附加擴充讓 server 在每次呼叫時查證 agent 代表哪個組織、授權是否仍有效。",
    ),
    description: l(
      "An extension, org.gleif.vlei/identity, built on MCP's own extension mechanism without touching the core schema. The agent carries an engagement-context role credential from a GLEIF vLEI chain and signs each call; the server runs eight ordered checks — presence, freshness, digest, signature, delegation, chain, revocation, authority — and refuses with a named layer when one fails.",
      "以 MCP 自身的擴充機制實作 org.gleif.vlei/identity，不修改核心 schema。agent 攜帶來自 GLEIF vLEI 憑證鏈的職務憑證並簽署每次呼叫；server 依序執行八項檢查——出示、時效、摘要、簽章、委任、憑證鏈、撤銷、權限——任一失敗即以具名層級拒絕。",
    ),
    outcome: l(
      "572 tests on the official MCP SDK; all six credential-bootstrap acceptance checks pass against GLEIF's own vlei-verifier, and a bug found along the way was filed upstream.",
      "在官方 MCP SDK 上通過 572 個測試；六項憑證啟動驗收檢查全數通過 GLEIF 官方 vlei-verifier，過程中發現的問題已回報上游。",
    ),
    problem: l(
      "When an agent acts across organisational boundaries — filing payroll, enrolling employees — the accountable party is not verifiable in the call; clientInfo is self-reported.",
      "當 agent 跨組織行動——申報薪資、為員工加保——呼叫中無法驗證誰該負責；clientInfo 只是自我宣稱。",
    ),
    customers: l(
      "Agent platform and gateway operators, and agencies that accept machine filings.",
      "agent 平台與 gateway 營運方，以及接受機器申報的機關。",
    ),
    proof: [
      { value: "572", label: l("package tests (Python 3.11, 3.12)", "個套件測試（Python 3.11、3.12）") },
      { value: "6/6", label: l("acceptance checks vs GLEIF's verifier", "項驗收檢查通過 GLEIF 官方驗證器") },
      { value: "8", label: l("ordered checks on every call", "項依序檢查，每次呼叫都跑") },
    ],
    caveats: [
      l("All identities are fictional; the root of trust is self-hosted for demonstration.", "所有身分皆為虛構；信任根為自架的展示環境。"),
      l("The namespace is provisional and has not been reviewed or endorsed by GLEIF.", "命名空間為暫定，未經 GLEIF 審閱或背書。"),
    ],
    tags: ["MCP", "vLEI", "KERI", "ACDC", "Python"],
    link: "https://github.com/zuemen/mcp-vlei",
  },
  {
    slug: "pepelab",
    track: "identity",
    title: l(
      "PepeLab — Decentralized Credential Verification",
      "PepeLab — 去中心化憑證驗證",
    ),
    shortTitle: l("PepeLab", "PepeLab"),
    category: l(
      "Ministry of Digital Affairs · Digital Credential Challenge",
      "數位發展部 · 數位憑證場景創新賽",
    ),
    badge: { label: l("Merit Award", "學生組優選"), tone: "award" },
    summary: l(
      "Where the identity work started: a three-party SSI system for health records, where each verifier receives only the fields its scope permits.",
      "身分研究的起點：醫療紀錄的三方 SSI 系統，每個驗證方只拿到其範圍允許的欄位。",
    ),
    description: l(
      "Led a team in a national competition hosted by the Ministry of Digital Affairs, Taiwan. Cross-agency credential verification in the public sector lacks interoperable infrastructure, forcing citizens to re-submit the same credentials to every institution. Architected a decentralized identity platform on SSI, VC, and DID standards to make those credentials verifiable across institutions.",
      "帶領團隊參加數位發展部主辦的全國競賽。公部門跨機關的憑證驗證缺乏可互通的基礎建設，民眾得向每個機關重複提交同一份證明。我以 SSI、VC 與 DID 標準設計去中心化身分平台，讓這些憑證能跨機構驗證。",
    ),
    outcome: l(
      "Merit Award (學生組優選) at the Digital Credential Scenario Innovation Challenge, Nov 2025. Delivered a working credential verification system and translated government interoperability requirements into implementable technical specifications.",
      "2025 年 11 月獲數位憑證場景創新賽學生組優選。交付可運作的憑證驗證系統，並將政府互通需求轉化為可實作的技術規格。",
    ),
    tags: ["SSI", "VC/DID", "FHIR", "FastAPI", "Python"],
    link: "https://github.com/zuemen/pepelab_v2",
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
    caseStudyUrl: "/projects/pepelab",
  },
  {
    slug: "chaintrust",
    track: "identity",
    title: l(
      "ChainTrust — Self-Sovereign Financial Identity Wallet",
      "鏈信 ChainTrust — 自主權金融身分錢包",
    ),
    shortTitle: l("ChainTrust", "鏈信 ChainTrust"),
    category: l("Chunghwa Telecom Innovation Competition · Smart finance", "中華電信智慧創新應用大賽 · 智慧金融組"),
    summary: l(
      "KYC once, reuse it across institutions: the user holds an SD-JWT credential and discloses only what each verifier needs, with an anti-fraud check that blocks mule-account patterns.",
      "一次 KYC、跨機構重複使用：使用者自持 SD-JWT 憑證，只揭露驗證方需要的欄位，並以反詐模型攔截人頭帳戶樣態。",
    ),
    description: l(
      "A wallet where a bank-issued KYC credential is presented to another bank or merchant with only its KYC level disclosed; name, birthday and nationality stay in the wallet. The same credential is approved for a normal payment and blocked for a high-risk transfer, with the reasons shown. A telecom bill-payment reputation credential lets thin-file users reach a microloan without a credit-bureau check.",
      "銀行核發的 KYC 憑證出示給另一家銀行或商家時，只揭露 KYC 等級；姓名、生日、國籍都留在錢包裡。同一張憑證在一般消費時放行、在高風險轉帳時攔截，並顯示原因。電信繳費信譽憑證則讓信用小白不經聯徵也能申請小額貸款。",
    ),
    outcome: l(
      "A working wallet demo with the issuer, verifier and anti-fraud services, an end-to-end smoke test and 64 tests across the services.",
      "可操作的錢包 demo，含發證、驗證與反詐服務，並有端到端 smoke test 與跨服務 64 個測試。",
    ),
    caveats: [
      l("The live demo keeps chain state in memory; telecom integrations are mocked and model metrics are on synthetic data.", "線上 demo 的鏈上狀態存在記憶體；電信串接為模擬，模型指標基於合成資料。"),
    ],
    tags: ["SD-JWT VC", "Veramo", "Solidity", "LightGBM", "PWA"],
    link: "https://github.com/zuemen/ChainTrust",
    demoUrl: "https://chaintrust.vercel.app",
  },

  // ── Explainable on-chain risk ──────────────────────────────────────────
  {
    // Describe the live screener as SNA plus laundering-pattern detection. The
    // GNN (GCN / GraphSAGE) is an offline benchmark on the Elliptic dataset and
    // is explicitly not wired into live review — see the repository README.
    slug: "chainlens",
    track: "risk",
    featured: true,
    demo: "chainlens",
    title: l(
      "ChainLens — Explainable Crypto Fraud Money-Flow Detection",
      "鏈鏡 ChainLens — 可解釋的虛擬資產詐騙金流偵測",
    ),
    shortTitle: l("ChainLens", "鏈鏡 ChainLens"),
    category: l(
      "FinTech Taipei Awards 2026 · Financial Innovation, Campus",
      "2026 台北金融科技獎 · 金融創新獎校園組",
    ),
    badge: { label: l("Winner", "優勝"), tone: "award" },
    summary: l(
      "Withdrawal screening for Taiwanese crypto exchanges, where every risk flag comes with the graph evidence behind it rather than a bare score.",
      "為台灣虛擬資產交易所設計的出金篩查——每個風險判定都附上背後的圖結構證據，而不是一個黑箱分數。",
    ),
    description: l(
      "A money-flow screening platform for virtual asset service providers. The live screener uses social network analysis and laundering-pattern detection, and attaches structural evidence to each decision — centrality anomalies, community membership, and fund-path patterns — so a compliance officer can see why an address was flagged. A GCN / GraphSAGE model is benchmarked offline on the Elliptic dataset (203k Bitcoin transactions) as a research baseline, kept separate from live review until a locally labelled dataset exists.",
      "為虛擬資產服務商打造的金流篩查平台。即時篩查採用社會網路分析與洗錢圖樣偵測，並為每個判定附上結構證據——中心性異常、社群歸屬與資金路徑圖樣——讓法遵人員看得到位址被標記的原因。另以 GCN／GraphSAGE 在 Elliptic 資料集（20.3 萬筆比特幣交易）上做離線研究基準；在建立在地標註資料之前，不接入即時審查。",
    ),
    outcome: l(
      "Won the FinTech Taipei Awards 2026 (Financial Innovation Award, Campus Division) — one of three winning teams — as team lead of a three-person team, with a live screening demo deployed.",
      "以三人團隊負責人身分獲 2026 台北金融科技獎金融創新獎校園組優勝（三支優勝團隊之一），並已部署可線上操作的篩查 demo。",
    ),
    problem: l(
      "An address that has never been reported passes a blacklist check — and once the withdrawal leaves the exchange, the money is effectively gone across borders.",
      "從未被通報的地址可以通過黑名單比對——一旦出金離開交易所，資金跨境後幾乎追不回來。",
    ),
    customers: l(
      "Compliance and AML teams at Taiwan's registered virtual asset service providers.",
      "台灣已登記虛擬資產服務商的法遵與洗錢防制團隊。",
    ),
    steps: [
      l("A user asks to withdraw 500,000 USDT to an address on no blacklist.", "使用者申請把 50 萬 USDT 提領到一個不在任何黑名單上的地址。"),
      l("The graph is traced upstream, hop by hop, against the direction of funds.", "沿資金流的反方向，逐階往上游追溯。"),
      l("Two hops up, a collection wallet matches fan-in, fan-out and gather-scatter patterns.", "往上兩階，一個集資主錢包同時命中扇入、扇出與集散圖樣。"),
      l("Risk propagates along the path; the withdrawal is held for review with a draft suspicious transaction report.", "風險沿路徑傳遞；出金暫緩、轉人工審查，並附可疑交易申報草稿。"),
    ],
    proof: [
      { value: "Winner", label: l("FinTech Taipei Awards 2026, Campus", "2026 台北金融科技獎校園組優勝") },
      { value: "203k", label: l("node Elliptic benchmark (offline)", "節點 Elliptic 離線基準") },
      { value: "8", label: l("screening scenarios in the live demo", "個情境可在線上 demo 操作") },
    ],
    caveats: [
      l("Scenario graphs are synthetic. The GNN is an offline benchmark and is not part of live screening — it can escalate a case, never hold one on its own.", "情境圖為合成資料。GNN 是離線基準、不參與即時篩查——它只能升級案件，不能單獨決定暫緩。"),
      l("No commercial customers yet. Not compliance or legal advice.", "尚無商業客戶。不構成法遵或法律意見。"),
    ],
    role: l("Team lead (team of three)", "團隊負責人（三人團隊）"),
    tags: ["SNA", "Graph Neural Networks", "AML Compliance", "Python", "React"],
    link: "https://github.com/zuemen/ChainLens",
    demoUrl: "https://chain-lens-beta.vercel.app",
  },
  {
    slug: "sme-lens",
    track: "risk",
    title: l(
      "SME Lens — Relationship-Network Risk for SME Lending",
      "企鏡 SME Lens — 中小企業關係網絡風控引擎",
    ),
    shortTitle: l("SME Lens", "企鏡 SME Lens"),
    category: l("Taiwan Business Bank campus fintech challenge", "臺灣中小企業銀行校園金融科技競賽"),
    summary: l(
      "The ChainLens graph engine applied to bank lending: transfers, bills and company registrations become a relationship graph, so an SME without polished financials can use its network as credit evidence.",
      "把鏈鏡的圖引擎用在銀行授信：轉帳、票據與企業登記關係組成企業關係圖，讓沒有漂亮財報的中小企業也能以交易網絡作為信用證據。",
    ),
    description: l(
      "A credit-opinion workbench that surfaces closed money loops, pass-through shells and buyer concentration, consolidates declared groups that share a person into their real exposure, and propagates early warnings from a flagged company to its neighbours — each with the path that explains it.",
      "授信意見工作台：找出資金閉環、過水空殼與客戶集中度，把因同一人而相連的申報集團合併為真實曝險，並從被標記的企業向鄰近企業傳遞預警——每一項都附上解釋它的路徑。",
    ),
    outcome: l(
      "Ran on the full national company registry — 1.03 million companies, 19,150 multi-company groups, 75.8% of them invisible to name matching — in a 9.7-second scan.",
      "在全國公司登記資料上實跑——103 萬家公司、19,150 個多公司集團，其中 75.8% 用名稱比對找不到——全量掃描 9.7 秒。",
    ),
    caveats: [
      l("The demo companies and group roster are synthetic; the attention score is not a credit rating.", "demo 中的公司與集團名單為合成資料；關注分數不是信用評等。"),
    ],
    tags: ["Graph Analytics", "RegTech", "FastAPI", "React"],
    link: "https://github.com/zuemen/sme-lens",
    demoUrl: "https://sme-lens.vercel.app",
  },

  // ── Earlier work ───────────────────────────────────────────────────────
  {
    slug: "rwa-tokenization",
    track: "earlier",
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
      "A working end-to-end demo on a local Hardhat network: four Solidity contracts (IdentityRegistry, PropertyToken, RentalDistributor, MockUSDC) wired to a React frontend and a Node backend, so an identity-gated transfer and an automated rental payout can be run start to finish.",
      "在本地 Hardhat 網路上完成端到端 demo：四支 Solidity 合約（IdentityRegistry、PropertyToken、RentalDistributor、MockUSDC）串接 React 前端與 Node 後端，可完整跑完需身分驗證的轉移與自動租金分配。",
    ),
    tags: ["Solidity", "Hardhat", "RWA", "Fractional Ownership", "React"],
    link: "https://github.com/zuemen/rwa_g",
  },
  {
    slug: "qml-simulation",
    track: "earlier",
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
      "Isolates whether any advantage comes from the data or the model by testing both quantum and classical algorithms on both data sources.",
      "在兩種資料上同時測試量子與古典演算法，藉此釐清優勢來自資料還是模型。",
    ),
    tags: ["QML", "Qiskit", "QSVM", "QNN", "Python"],
    link: "https://github.com/zuemen/qc_ML",
  },
];

/** Projects that get a generated case study at /projects/[slug]. */
export const caseStudies = projects.filter((p) => p.problem && !p.caseStudyUrl);

export const caseStudyHref = (p: Project) =>
  p.caseStudyUrl ?? (p.problem ? `/projects/${p.slug}` : undefined);

/** Totals for the homepage proof bar, summed from the entries above. */
export const verifiedContractCount = 12 + 17 + 2;
