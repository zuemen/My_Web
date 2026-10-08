import { l, type L } from "@/i18n/config";
import { chains, type ChainId } from "./projects";

export type Tone = "pass" | "refuse" | "warn" | "neutral";

export interface DemoStep {
  id: string;
  /** One line in the run log. */
  title: L;
  /** The sentence under the stage while this step plays. */
  caption: L;
  /** "check" runs the gate; "event" is a state change the gate later reads. */
  kind: "check" | "event";
  from: string;
  to: string;
  /** Text on the packet that travels from `from` to `to`. */
  packet: string;
  tone: Tone;
  /** For a refused check: the check that failed. Checks after it are not reached. */
  fail?: string;
  /** Checks that do not apply to this action. */
  na?: string[];
  /** Revert reason or result code, shown verbatim. */
  code?: string;
  /** Meter reading after this step. */
  meter?: number;
  /** Explorer link for the real transaction behind this step. */
  tx?: string;
}

export interface DemoScript {
  id: string;
  name: L;
  chain?: ChainId;
  /** Shown where there is no chain: "local KERI test chain", "in the browser" … */
  venue?: L;
  actors: Record<string, L>;
  gate: { name: string; checks: { id: string; label: L }[] };
  meter?: { label: L; max: number; unit: string; cap?: number };
  steps: DemoStep[];
  /** Says exactly what the replay is. Always rendered. */
  note: L;
  liveUrl?: string;
}

const tx = (chain: ChainId, hash: string) => `${chains[chain].explorer}/tx/${hash}`;

/*
 * Each script replays a run the project's own repository records, step for
 * step: the amounts, limits, revert reasons and transaction hashes are copied
 * from agent-passport/demo/public/runs/latest.json, mandate-layer/demo/RUN.md,
 * carbon-lei/README.md ("Live run") and mcp-vlei's console scenes. Nothing on
 * the stage is invented — the animation only decides the pacing.
 */

export const agentPassportDemo: DemoScript = {
  id: "agent-passport",
  name: l("Agent Passport", "Agent Passport"),
  chain: "monad-testnet",
  actors: {
    owner: l("Owner", "擁有者"),
    agent: l("Agent · via MCP", "Agent · 經由 MCP"),
    vlei: l("vLEI verifier", "vLEI 驗證方"),
    registry: l("Status registry", "狀態登錄合約"),
    dex: l("PassportDex", "PassportDex"),
    fakeDex: l("Look-alike DEX", "仿冒 DEX"),
    merchant: l("Merchant · requires vLEI", "商家 · 要求 vLEI"),
  },
  gate: {
    name: "PassportGate",
    checks: [
      { id: "status", label: l("Mandate anchored, not revoked", "授權已錨定、未撤銷") },
      { id: "perTx", label: l("≤ 100 apUSD per transaction", "單筆 ≤ 100 apUSD") },
      { id: "daily", label: l("≤ 250 apUSD per day", "每日 ≤ 250 apUSD") },
      { id: "payee", label: l("Payee on the allow-list", "收款方在允許清單內") },
      { id: "vlei", label: l("Owner vLEI-verified", "擁有者通過 vLEI 驗證") },
    ],
  },
  meter: { label: l("Spent today", "今日已花費"), max: 250, unit: "apUSD", cap: 250 },
  steps: [
    {
      id: "anchor",
      kind: "event",
      from: "owner",
      to: "registry",
      packet: "mandate root",
      tone: "neutral",
      title: l("Owner signs the mandate and anchors it", "擁有者簽署授權並錨定上鏈"),
      caption: l(
        "The owner signs a mandate — 100 apUSD per transaction, 250 a day, one allowed DEX — and anchors its Merkle root on Monad. The agent will show four claims, never the owner's name.",
        "擁有者簽署授權——單筆 100、每日 250 apUSD、只能用一個 DEX——並把 Merkle 根錨定在 Monad。agent 之後只出示四項聲明，不會透露擁有者是誰。",
      ),
      meter: 0,
      tx: tx("monad-testnet", "0x3be218472c41f4bc068ef8ca341b4ea67ac07bac3b4045cc0b3d06d048ed3ef9"),
    },
    {
      id: "swap-ok",
      kind: "check",
      from: "agent",
      to: "dex",
      packet: "80 apUSD",
      tone: "pass",
      na: ["vlei"],
      code: "OK",
      title: l("Swap 80 apUSD", "兌換 80 apUSD"),
      caption: l(
        "Inside the limits: the swap settles, and the gate pulls the 80 apUSD from the owner — the agent wallet only ever holds gas.",
        "在額度內：交易成交，閘門從擁有者扣款 80 apUSD——agent 錢包自始至終只放手續費。",
      ),
      meter: 80,
      tx: tx("monad-testnet", "0x3376e55c14c38587731fcbb7fa17891c2815ef2ccb92df542aa3686226dc3617"),
    },
    {
      id: "swap-over",
      kind: "check",
      from: "agent",
      to: "dex",
      packet: "150 apUSD",
      tone: "refuse",
      fail: "perTx",
      na: ["vlei"],
      code: "ExceedsPerTxLimit",
      title: l("Swap 150 apUSD", "兌換 150 apUSD"),
      caption: l(
        "Over the per-transaction limit. The payment reverts on-chain with the gate's reason.",
        "超過單筆上限。付款在鏈上 revert，並附上閘門給的原因。",
      ),
      meter: 80,
      tx: tx("monad-testnet", "0x73442f47375e85e7b1d5f337afb3dccf6116f61110f72bf42929ee5783dbfd35"),
    },
    {
      id: "swap-injected",
      kind: "check",
      from: "agent",
      to: "fakeDex",
      packet: "50 apUSD",
      tone: "refuse",
      fail: "payee",
      na: ["vlei"],
      code: "PayeeNotAllowed",
      title: l("Prompt injection: 50 apUSD to a look-alike DEX", "Prompt injection：50 apUSD 轉往仿冒 DEX"),
      caption: l(
        "A simulated prompt injection talks the agent into routing funds through a look-alike DEX. The amount is fine; the payee is not.",
        "模擬的 prompt injection 誘導 agent 把資金導向仿冒 DEX。金額沒問題，但收款方不在允許清單。",
      ),
      meter: 80,
      tx: tx("monad-testnet", "0xbb607e1c8bb43a88fc90e9a32608c5756ca460987ddf9f787c5b9f18a5ca0681"),
    },
    {
      id: "pay-unverified",
      kind: "check",
      from: "agent",
      to: "merchant",
      packet: "5 apUSD",
      tone: "refuse",
      fail: "vlei",
      code: "OwnerNotVleiVerified",
      title: l("Pay a merchant that requires a vLEI-verified owner", "付款給要求擁有者具 vLEI 驗證的商家"),
      caption: l(
        "This merchant only accepts agents whose owner is a verified legal entity. Not yet.",
        "這家商家只接受擁有者為已驗證法人的 agent。目前還不是。",
      ),
      meter: 80,
      tx: tx("monad-testnet", "0xc1ba95e169e239ac7184fb9f8349f35cdb4f59b06892109951f4b1ed00562dbf"),
    },
    {
      id: "vlei",
      kind: "event",
      from: "vlei",
      to: "registry",
      packet: "VLEI_VERIFIED",
      tone: "neutral",
      title: l("vLEI verifier records the owner as a legal entity", "vLEI 驗證方記錄擁有者為已驗證法人"),
      caption: l(
        "A vLEI verifier records that the owner is a verified legal entity. (A stand-in record in this run; the full vLEI check ran on a local test chain.)",
        "vLEI 驗證方記錄擁有者為已驗證法人。（本次為替代紀錄；完整 vLEI 驗證在本機測試鏈上執行。）",
      ),
      meter: 80,
      tx: tx("monad-testnet", "0x8abdad6f7141a2dbf19810598878a263cbc246e074ef9b4631fe9c915575e2c3"),
    },
    {
      id: "pay-verified",
      kind: "check",
      from: "agent",
      to: "merchant",
      packet: "5 apUSD",
      tone: "pass",
      code: "OK",
      title: l("Same payment, after verification", "驗證後，同一筆付款"),
      caption: l("The same 5 apUSD payment now clears every check.", "同樣 5 apUSD 的付款，現在每一項檢查都通過。"),
      meter: 85,
      tx: tx("monad-testnet", "0xc024a35e0bd6973a4aa3e7716f23f0eba114ac8bedc327b117223c8de017517e"),
    },
    {
      id: "revoke",
      kind: "event",
      from: "owner",
      to: "registry",
      packet: "revoke",
      tone: "neutral",
      title: l("Owner revokes the mandate", "擁有者撤銷授權"),
      caption: l(
        "One transaction from the owner. Every protocol that checks the passport sees it on the agent's next action.",
        "擁有者只要一筆交易。所有會檢查 passport 的協議，在 agent 的下一個動作就會看到。",
      ),
      meter: 85,
      tx: tx("monad-testnet", "0xa2b7294daed5ee0f6da1b5367d60731d91614e885324d71f1518a84ce5192075"),
    },
    {
      id: "swap-after-revoke",
      kind: "check",
      from: "agent",
      to: "dex",
      packet: "10 apUSD",
      tone: "refuse",
      fail: "status",
      na: ["vlei"],
      code: "Revoked",
      title: l("Swap 10 apUSD after the revoke", "撤銷後兌換 10 apUSD"),
      caption: l(
        "Four blocks after the revoke, a 10 apUSD swap — well inside the old limits — is refused.",
        "撤銷後第四個區塊，一筆 10 apUSD 的兌換——遠低於原本的上限——被拒絕。",
      ),
      meter: 85,
      tx: tx("monad-testnet", "0x5235022168c57d93b487c8925954c4c7320964d711fbfeda4ecacba3b0d42fa2"),
    },
  ],
  note: l(
    "Replay of the storyline run on Monad testnet on 2026-09-23. Every step is a real transaction — refusals revert on-chain — and links to the explorer. Demo tokens; no real assets.",
    "重播 2026-09-23 在 Monad 測試網上的完整情境。每一步都是真實交易——被拒絕的會在鏈上 revert——並可連到區塊瀏覽器查證。使用展示代幣，不涉及真實資產。",
  ),
  liveUrl: "https://zuemen.github.io/agent-passport/",
};

export const mandateLayerDemo: DemoScript = {
  id: "mandate-layer",
  name: l("Mandate Layer", "Mandate Layer"),
  chain: "base-sepolia",
  actors: {
    user: l("User", "使用者"),
    agent: l("Trading agent", "交易 agent"),
    seller: l("Signal seller", "訊號賣方"),
    sessions: l("Session manager", "Session 管理合約"),
    api: l("x402 data API", "x402 數據 API"),
    router: l("x402 fee router", "x402 分潤合約"),
    exchange: l("Perp exchange", "永續合約交易所"),
  },
  gate: {
    name: "AgentSessionManager",
    checks: [
      { id: "active", label: l("Session active, not revoked", "Session 有效、未撤銷") },
      { id: "asset", label: l("Asset allowed: sBTC, sETH", "資產限 sBTC、sETH") },
      { id: "margin", label: l("Margin ≤ 50 per trade", "單筆保證金 ≤ 50") },
      { id: "budget", label: l("Cumulative margin ≤ 150", "累計保證金 ≤ 150") },
      { id: "leverage", label: l("Leverage ≤ 3×", "槓桿 ≤ 3 倍") },
    ],
  },
  meter: { label: l("Session budget used", "Session 預算已用"), max: 150, unit: "mUSDC", cap: 150 },
  steps: [
    {
      id: "session",
      kind: "event",
      from: "user",
      to: "sessions",
      packet: "session #2",
      tone: "neutral",
      title: l("User opens a session for the agent", "使用者為 agent 開 session"),
      caption: l(
        "The user hands the agent a mandate, enforced by contract: 50 per trade, 150 in total, up to 3×, sBTC and sETH only, for seven days.",
        "使用者交給 agent 一份由合約執行的授權：單筆 50、總額 150、最高 3 倍、只限 sBTC 與 sETH、期限七天。",
      ),
      meter: 0,
      tx: tx("base-sepolia", "0xf466546f5a9e56d33a2a96f7a34ea1a80709b617b2e4bec5a4da6f4c3761f033"),
    },
    {
      id: "x402",
      kind: "event",
      from: "agent",
      to: "api",
      packet: "402 → 0.005 USDC → 200",
      tone: "pass",
      code: "HTTP 200",
      title: l("Agent pays for market data over x402", "agent 以 x402 付費取得市場數據"),
      caption: l(
        "GET /oracle/sBTC answers 402 Payment Required. The agent signs a USDC authorisation (EIP-3009), the facilitator settles it on Base, and the data comes back.",
        "GET /oracle/sBTC 回應 402 Payment Required。agent 簽署 USDC 授權（EIP-3009），由 facilitator 在 Base 上結算，數據隨即回傳。",
      ),
      meter: 0,
      tx: tx("base-sepolia", "0xfd4443afa58df6e8e0f8294f0931bd479d53e47713e98c6aa7c0f8da786055e1"),
    },
    {
      id: "split",
      kind: "event",
      from: "seller",
      to: "router",
      packet: "0.01 USDC → 70/20/10",
      tone: "pass",
      title: l("Signal fee split on chain", "訊號費在鏈上分潤"),
      caption: l(
        "A trader signal sells for 0.01 USDC; the router splits it 70/20/10 between trader, platform and vault.",
        "一則交易訊號售價 0.01 USDC；路由合約把它按 70/20/10 分給交易者、平台與金庫。",
      ),
      meter: 0,
      tx: tx("base-sepolia", "0x95f09cec399b86977d4e314df546f2e64ab5aadf8982e37e82e5f6f48f2cd5ae"),
    },
    {
      id: "open-ok",
      kind: "check",
      from: "agent",
      to: "exchange",
      packet: "sBTC long · 20 · 2×",
      tone: "pass",
      code: "position #2",
      title: l("Open sBTC long, margin 20 at 2×", "開 sBTC 多單，保證金 20、2 倍"),
      caption: l("Inside every cap: the position opens.", "每一項上限都符合：開倉成功。"),
      meter: 20,
      tx: tx("base-sepolia", "0xa61ade4c4a9e40e4edb6643f0b4f8a9da074223bc6040251f4b1a032824f7a73"),
    },
    {
      id: "open-over",
      kind: "check",
      from: "agent",
      to: "exchange",
      packet: "margin 80",
      tone: "refuse",
      fail: "margin",
      code: "MarginExceedsPerTradeCap",
      title: l("Open with margin 80", "以保證金 80 開倉"),
      caption: l(
        "80 against a cap of 50. The order is mined and reverted by the contract itself, not filtered by the agent's own SDK.",
        "80 對上限 50。這筆單會上鏈，然後由合約本身 revert——不是被 agent 自己的 SDK 擋下。",
      ),
      meter: 20,
      tx: tx("base-sepolia", "0x547c47705dd81428395be332c30eefef4533ed0ed14d30aff01d7dfba46022b0"),
    },
    {
      id: "revoke",
      kind: "event",
      from: "user",
      to: "sessions",
      packet: "revokeSession(#2)",
      tone: "neutral",
      title: l("User revokes the session", "使用者撤銷 session"),
      caption: l("The agent closed its position; now the user revokes the session.", "agent 已平倉；使用者接著撤銷 session。"),
      meter: 20,
      tx: tx("base-sepolia", "0xb8f0a0bd46b1cbbcb21004ed1d5a2c4da8fe47e4d967a9c0a9f899462aee7553"),
    },
    {
      id: "open-revoked",
      kind: "check",
      from: "agent",
      to: "exchange",
      packet: "margin 20",
      tone: "refuse",
      fail: "active",
      code: "SessionIsRevoked",
      title: l("Open again after the revoke", "撤銷後再次開倉"),
      caption: l(
        "The same order that filled before, well within the old caps, now reverts on-chain.",
        "同樣一筆先前會成交、也遠在上限內的單，現在在鏈上 revert。",
      ),
      meter: 20,
      tx: tx("base-sepolia", "0x5a071cab849a087dc1a2d3c280999d95a617b0c56104fde691fd0013c60b95ea"),
    },
  ],
  note: l(
    "Replay of the demo run on Base Sepolia (2026-09-23), with keys held by three separate parties. Every step links to BaseScan. Mock USDC margin; research prototype, no real assets.",
    "重播 2026-09-23 在 Base Sepolia 上的 demo，三方各自持有金鑰。每一步都可在 BaseScan 查證。保證金為模擬 USDC；研究原型，不涉及真實資產。",
  ),
  liveUrl: "https://zuemen.github.io/mandate-layer/agent-mode",
};

export const carbonLeiDemo: DemoScript = {
  id: "carbon-lei",
  name: l("CarbonLEI", "CarbonLEI"),
  chain: "sepolia",
  actors: {
    auditor: l("Lead auditor · vLEI", "首席查證員 · vLEI"),
    supplier: l("Supplier · Kaohsiung", "供應商 · 高雄"),
    importer: l("EU importer", "歐盟進口商"),
    impostor: l("Impostor body", "冒名查證機構"),
    registry: l("Claim registry", "申報登錄合約"),
    verifier: l("Buyer's verifier · browser", "買方驗證器 · 瀏覽器"),
  },
  gate: {
    name: "Registry + verifier",
    checks: [
      { id: "sig", label: l("Signature and disclosures intact", "簽章與揭露內容完整") },
      { id: "auth", label: l("Auditor accredited, not revoked", "查證員具認證、未被撤銷") },
      { id: "tonnage", label: l("Within verified tonnage", "未超出已驗證噸數") },
      { id: "chain", label: l("vLEI chain to the GLEIF root", "vLEI 憑證鏈連到 GLEIF 根") },
    ],
  },
  meter: { label: l("Verified tonnage remaining", "剩餘已驗證噸數"), max: 500, unit: "t" },
  steps: [
    {
      id: "register",
      kind: "check",
      from: "auditor",
      to: "registry",
      packet: "500 t · 1.8 tCO2e/t",
      tone: "pass",
      code: "ReportRegistered",
      title: l("Auditor registers a 500 t report", "查證員登記 500 噸報告"),
      caption: l(
        "An accredited auditor signs the verification report: 500 t of screws at 1.8 tCO2e per tonne (illustrative).",
        "具認證的查證員簽署查證報告：500 噸螺絲、每噸 1.8 tCO2e（示意數值）。",
      ),
      meter: 500,
      tx: tx("sepolia", "0x5cba53bb5a438883252721407dba8e58962ef71f1f91493c266a4ae561981de2"),
    },
    {
      id: "claim",
      kind: "check",
      from: "supplier",
      to: "registry",
      packet: "claim 200 t",
      tone: "pass",
      code: "ShipmentClaimed",
      title: l("Supplier claims a 200 t shipment", "供應商申報 200 噸出貨"),
      caption: l("A 200 t shipment to one importer is deducted on-chain. 300 t remain.", "出給一家進口商的 200 噸在鏈上扣除，剩 300 噸。"),
      meter: 300,
      tx: tx("sepolia", "0x2f873bd582ac399f83fcea28ffb048100d4d002f9a03e43b61e46991ae288484"),
    },
    {
      id: "tampered",
      kind: "check",
      from: "supplier",
      to: "verifier",
      packet: "1.8 → 1.2",
      tone: "refuse",
      fail: "sig",
      code: "DISCLOSURE_TAMPERED",
      title: l("Edited value: 1.8 → 1.2 tCO2e/t", "竄改數值：1.8 → 1.2 tCO2e/t"),
      caption: l(
        "Someone edits the disclosed value to look greener. The buyer's verifier catches it in the browser before anything touches the chain.",
        "有人把揭露值改小，讓產品看起來更低碳。買方的驗證器在瀏覽器裡就抓到了，根本不需要上鏈。",
      ),
      meter: 300,
    },
    {
      id: "double",
      kind: "check",
      from: "supplier",
      to: "registry",
      packet: "claim 400 t",
      tone: "refuse",
      fail: "tonnage",
      code: "ExceedsVerifiedTonnage",
      title: l("Claim 400 t for a second importer", "替第二家進口商申報 400 噸"),
      caption: l(
        "The supplier tries to sell 400 t of verified goods when 300 t remain. The ledger refuses.",
        "供應商想賣出 400 噸已驗證貨物，但只剩 300 噸。帳本拒絕。",
      ),
      meter: 300,
    },
    {
      id: "revoked",
      kind: "check",
      from: "auditor",
      to: "registry",
      packet: "new report",
      tone: "refuse",
      fail: "auth",
      code: "AuditorNotAuthorized",
      title: l("New report after the auditor is revoked", "查證員被撤銷後送出新報告"),
      caption: l(
        "The auditor's role credential is revoked and a watcher syncs it. Their next report reverts on-chain.",
        "查證員的職務憑證被撤銷，監看程式同步上鏈。他的下一份報告在鏈上 revert。",
      ),
      meter: 300,
      tx: tx("sepolia", "0xa8b6b8a8ba067de0ffda301688d64ff6c8c7662563930881c7fecc82e1e65fc5"),
    },
    {
      id: "impostor",
      kind: "check",
      from: "impostor",
      to: "registry",
      packet: "impostor report",
      tone: "warn",
      fail: "chain",
      code: "AUTHORITY_INVALID",
      title: l("Impostor body, after a simulated key theft", "模擬金鑰遭竊後的冒名機構"),
      caption: l(
        "The contract said yes; the credential said no. With the allowlist key stolen, the impostor's report is accepted on-chain — and the buyer's vLEI check still exposes it.",
        "合約說可以，憑證說不行。白名單金鑰被盜後，冒名者的報告被鏈上接受——但買方的 vLEI 檢查仍然揭穿了它。",
      ),
      meter: 300,
      tx: tx("sepolia", "0x295abe6cb63e3df44e942b07397ba926dcff815a6e1e2e05870f21d0dc3d0013"),
    },
  ],
  note: l(
    "Replay of the live run on Ethereum Sepolia. Steps with a link are real transactions; the tamper and double-claim steps run in the browser and as a dry run against the live contract. All companies, people and LEIs are fictional; the vLEI root is simulated.",
    "重播在 Ethereum Sepolia 上的實際執行。有連結的步驟是真實交易；竄改與重複申報兩步分別在瀏覽器中、以及對線上合約 dry run 執行。所有公司、人員與 LEI 皆為虛構；vLEI 根為模擬。",
  ),
  liveUrl: "https://zuemen.github.io/carbon-lei/",
};

export const mcpVleiDemo: DemoScript = {
  id: "mcp-vlei",
  name: l("mcp-vlei", "mcp-vlei"),
  venue: l("Local KERI witnesses", "本機 KERI 見證節點"),
  actors: {
    agent: l("Agent · Demo Staffing Co.", "Agent · Demo Staffing Co."),
    vendor: l("Plain MCP server", "一般 MCP server"),
    server: l("MCP server + mcp-vlei", "MCP server＋mcp-vlei"),
  },
  gate: {
    name: "mcp-vlei",
    checks: [
      { id: "credential_present", label: l("Credential presented", "出示憑證") },
      { id: "freshness", label: l("Fresh, unexpired, not a replay", "有效期內、非重放") },
      { id: "digest", label: l("Request digest matches", "請求摘要相符") },
      { id: "signature", label: l("Signature valid", "簽章有效") },
      { id: "delegation", label: l("Delegated from the entity", "由法人委任") },
      { id: "chain", label: l("Chain to the vLEI root", "連到 vLEI 根") },
      { id: "revocation", label: l("Not revoked", "未被撤銷") },
      { id: "authority", label: l("Role and scope allow this tool", "職務與範圍允許此工具") },
    ],
  },
  steps: [
    {
      id: "impersonation",
      kind: "event",
      from: "agent",
      to: "vendor",
      packet: "clientInfo: \"Demo Staffing\"",
      tone: "warn",
      code: "granted, unchecked",
      title: l("Without the extension: a self-asserted name", "沒有擴充時：自我宣稱的名字"),
      caption: l(
        "A plain MCP server grants 50 GPU hours on a name the caller typed itself. Nothing was checked.",
        "一般的 MCP server 只憑呼叫方自己填的名字，就給了 50 小時 GPU。沒有任何檢查。",
      ),
    },
    {
      id: "enroll",
      kind: "check",
      from: "agent",
      to: "server",
      packet: "enroll_employee",
      tone: "pass",
      code: "ALLOWED",
      title: l("enroll_employee with a role credential", "以職務憑證呼叫 enroll_employee"),
      caption: l(
        "The agent carries a role credential delegated from the company's vLEI and signs the call. All eight checks pass.",
        "agent 攜帶由公司 vLEI 委任的職務憑證並簽署呼叫。八項檢查全部通過。",
      ),
    },
    {
      id: "role",
      kind: "check",
      from: "agent",
      to: "server",
      packet: "adjust_insured_salary",
      tone: "refuse",
      fail: "authority",
      code: "role_mismatch",
      title: l("A tool the role does not cover", "職務範圍外的工具"),
      caption: l(
        "Adjusting insured salary needs the payroll role. The identity is real; the authority is not there.",
        "調整投保薪資需要薪資職務。身分是真的，但沒有這個權限。",
      ),
    },
    {
      id: "scope",
      kind: "check",
      from: "agent",
      to: "server",
      packet: "enroll · +15 days",
      tone: "refuse",
      fail: "authority",
      code: "scope_exceeded",
      title: l("Outside the delegated scope", "超出委任範圍"),
      caption: l(
        "Policy allows enrolment from today to ten days ahead. Fifteen is refused.",
        "政策只允許從今天到十天後的加保日期。十五天被拒絕。",
      ),
    },
    {
      id: "revoked",
      kind: "check",
      from: "agent",
      to: "server",
      packet: "enroll_employee",
      tone: "refuse",
      fail: "revocation",
      code: "revoked",
      title: l("Same call after the credential is revoked", "憑證撤銷後的同一個呼叫"),
      caption: l(
        "The company revokes the credential and the agent resends. Six checks still pass; the seventh reads the revocation.",
        "公司撤銷憑證後 agent 重送。前六項仍通過，第七項讀到了撤銷。",
      ),
    },
  ],
  note: l(
    "Scripted from the project's Trust Console scenes, which run against real KERI event logs on local witnesses. All identities are fictional; the root of trust is self-hosted.",
    "依專案 Trust Console 的場景編排，原場景在本機見證節點上以真實 KERI 事件日誌執行。所有身分皆為虛構；信任根為自架。",
  ),
};

export const demoScripts = {
  "agent-passport": agentPassportDemo,
  "mandate-layer": mandateLayerDemo,
  "carbon-lei": carbonLeiDemo,
  "mcp-vlei": mcpVleiDemo,
} as const;
