import { l, type L } from "@/i18n/config";
import type { Photo } from "@/data/experience";

/** Filter categories for the Awards list on /experience. */
export type AwardTag = "fintech" | "blockchain-identity" | "quantum" | "ai";

/** Filter buttons, in display order. "All" is added by the component. */
export const AWARD_TAGS: { id: AwardTag; label: L }[] = [
  { id: "fintech", label: l("Fintech", "金融科技") },
  { id: "blockchain-identity", label: l("Blockchain & Identity", "區塊鏈與身分") },
  { id: "quantum", label: l("Quantum", "量子") },
  { id: "ai", label: l("AI", "AI") },
];

export interface Award {
  slug: string;
  title: L;
  issuer: L;
  /** YYYY-MM. Kept sortable; formatted for display at the call site. */
  date: string;
  /** Headline outcome — "First Place", "Finalist", "Shortlisted", … */
  result?: L;
  role?: L;
  /** One extra line: prize, track, scale. */
  detail?: L;
  /** Omitted when no certificate file has been added to /public/awards yet. */
  certificateUrl?: string;
  /** Evidence image shown as a small thumbnail, e.g. a notification screenshot. */
  image?: { src: string; alt: L; width: number; height: number };
  /** Event photo, laid out beside the entry like the photos on /experience. */
  photo?: Photo;
  link?: string;
  /**
   * Slug of the project in data/projects.ts this award was won with. The
   * project's card (homepage and /projects) takes its badge from here, so the
   * award and the card can no longer disagree.
   */
  project?: string;
  /** Badge text on that project card. Defaults to "title — result". */
  badge?: L;
  /** Categories for the Awards filter. No tags: shown under "All" only. */
  tags?: AwardTag[];
}

/**
 * Source of truth for awards and competitive selections. Newest first.
 * Rendered by the Awards section on /experience and the awards block on /cv.
 */
export const awards: Award[] = [
  {
    // TODO: 11/2 結果公布後更新名次
    // Finalists announced 2026-10-16; grand-final judging 10/31. Sources:
    // ChainTrust CLAUDE.md (one-line description) and the final-round survey
    // form (member 1, team lead). ChainTrust has no project card, so there
    // is no `project` slug here.
    slug: "chunghwa-telecom-2026",
    tags: ["fintech", "blockchain-identity", "ai"],
    title: l(
      "Chunghwa Telecom Smart Innovation Application Competition 2026",
      "2026 中華電信智慧創新應用大賽",
    ),
    issuer: l("Chunghwa Telecom", "中華電信"),
    date: "2026-10",
    result: l("Finalist", "決賽入圍"),
    role: l("Team Lead", "隊長"),
    detail: l(
      "Advanced to the grand final with ChainTrust, an SSI financial-identity wallet with AI anti-fraud: one KYC reused across institutions (SD-JWT minimal disclosure) and real-time interception of high-risk transfers.",
      "以鏈信 ChainTrust 進入總決賽：SSI 金融身分錢包＋AI 反詐 PoC——一次 KYC 跨機構重用（SD-JWT 最小揭露）、高風險交易即時攔截。",
    ),
  },
  {
    // Winners announced 2026-10-07: three teams per division, listed by entry
    // number and not ranked, so "Winner" with no place.
    // TODO: FinTech Taipei 頒獎與展示已延期（使用者 10/21：日期未定、先不放照片）；辦完後再加照片與展示敘述（使用者確認後）
    slug: "fintech-taipei-2026",
    project: "chainlens",
    tags: ["fintech", "blockchain-identity", "ai"],
    title: l("FinTech Taipei Awards 2026", "2026 台北金融科技獎"),
    issuer: l(
      "Financial Innovation Award, Campus Division",
      "金融創新獎－校園組",
    ),
    date: "2026-10",
    result: l("Winner", "優勝"),
    role: l("Team Lead", "團隊負責人"),
    detail: l(
      "ChainLens, an explainable graph-analytics system for tracing crypto fraud money flows, was one of three winning teams in the Campus Division after the final round on Oct 5–6. Guided by the Financial Supervisory Commission; organized by the Taiwan Financial Services Roundtable and the Taiwan Academy of Banking and Finance.",
      "以「鏈鏡 ChainLens」——可解釋的虛擬資產詐騙金流圖分析系統——三人團隊經 10/5–6 決賽，獲校園組三支優勝團隊之一。金管會指導，台灣金融服務業聯合總會、台灣金融研訓院主辦。",
    ),
    link: "https://contest.bhuntr.com/tw/cbgkrznrqnl64691mx/article/4474/",
  },
  {
    slug: "gleif-appreciation-award-2026",
    project: "evidence-at-source",
    tags: ["blockchain-identity", "ai"],
    title: l("GLEIF Appreciation Award", "GLEIF 感謝獎"),
    issuer: l(
      "Sponsored by GLEIF (Global Legal Entity Identifier Foundation)",
      "GLEIF（全球法人識別編碼基金會）贊助",
    ),
    date: "2026-08",
    detail: l(
      "Evidence at Source, a worker-held credential wallet whose verification agents prove their institutional authority through GLEIF vLEI credential chains, also received this award.",
      "Evidence at Source 同時獲得此獎——勞工自持的憑證錢包，其查驗 Agent 透過 GLEIF vLEI 憑證鏈證明所代表機構的授權。",
    ),
    link: "https://zuemen.github.io/evidence-at-source/",
  },
  {
    slug: "ntu-ibm-qiskit-hackathon-2026",
    tags: ["quantum"],
    title: l(
      "NTU–IBM Qiskit Quantum Computing Hackathon Taiwan 2026",
      "NTU–IBM Qiskit 量子計算黑客松 Taiwan 2026",
    ),
    issuer: l("NTU–IBM Quantum Computer Center", "臺大-IBM 量子電腦中心"),
    date: "2026-08",
    result: l("Selected", "錄取參賽"),
    detail: l(
      "Admission by review with limited seats. Held in English, Aug 12–14, 2026, with mentoring from IBM Quantum.",
      "經審核錄取、名額有限。2026/8/12–14 以英語進行，由 IBM Quantum 協助指導。",
    ),
    link: "https://quantum.ntu.edu.tw/?p=9999",
  },
  {
    slug: "swift-hackathon-2026",
    tags: ["fintech"],
    title: l("SWIFT Hackathon 2026", "SWIFT Hackathon 2026"),
    issuer: l("SWIFT", "SWIFT"),
    date: "2026-07",
    result: l("Proposal shortlisted", "提案入選"),
    detail: l(
      "Selected by the judging panel to advance to the full solution phase.",
      "經評審團選入，進入完整解決方案階段。",
    ),
    image: {
      src: "/awards/swift-hackathon-2026-shortlist.webp",
      alt: l(
        "SWIFT Hackathon 2026 notification: Proposal Shortlisted",
        "SWIFT Hackathon 2026 通知信：提案入選",
      ),
      width: 640,
      height: 497,
    },
  },
  {
    slug: "egx-collegiate-business-2026",
    title: l(
      "EGX 1st Collegiate Business Competition",
      "EGX 恩奕遊戲 第一屆大專院校商業競賽",
    ),
    issuer: l("EGX", "EGX 恩奕遊戲"),
    date: "2026-06",
    result: l("First Place, Track A", "賽道 A 第一名"),
    role: l("Team Lead", "團隊負責人"),
    detail: l(
      "NT$50,000 team prize in a national collegiate competition.",
      "全國大專院校競賽，團隊獎金新臺幣 5 萬元。",
    ),
  },
  {
    slug: "nurie-ai-2026",
    tags: ["ai"],
    title: l("Cross-Platform Innovation Awards", "跨平台創新獎"),
    issuer: l("Nurie AI", "Nurie AI"),
    date: "2026-05",
    detail: l(
      "Certified for engineering a cross-platform application on the VaultSage server-side API.",
      "以 VaultSage 伺服器端 API 開發跨平台應用獲獎。",
    ),
    certificateUrl: "/awards/nurie-ai-2026-certificate.pdf",
  },
  {
    slug: "moda-digital-credential-2025",
    project: "pepelab",
    // The card has always used this shorter wording, with the team name.
    badge: l(
      "Merit Award — Digital Credential Challenge 2025 (team PepeLab)",
      "數位憑證場景創新賽 2025 學生組優選（隊名 PepeLab）",
    ),
    tags: ["blockchain-identity"],
    title: l(
      "Digital Credential Scenario Innovation Challenge",
      "數位憑證場景創新賽",
    ),
    issuer: l(
      "Ministry of Digital Affairs, Taiwan (moda)",
      "數位發展部",
    ),
    date: "2025-11",
    result: l("Merit Award, Student Division", "學生組優選"),
    role: l("Team Leader", "隊長"),
  },
];

/** The badge a project card shows for this award. */
export const awardBadge = (award: Award): L =>
  award.badge ??
  (award.result
    ? l(
        `${award.title.en} — ${award.result.en}`,
        `${award.title.zh} — ${award.result.zh}`,
      )
    : award.title);

/** Badge for a project, from its most recent award; undefined if none. */
export const awardBadgeFor = (projectSlug: string): L | undefined => {
  const award = awards.find((a) => a.project === projectSlug);
  return award && awardBadge(award);
};

const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** "2025-11" -> "Nov 2025" / "2025/11" */
export const formatAwardDate = (date: string, lang: "en" | "zh" = "en") => {
  const [year, month] = date.split("-");
  return lang === "zh"
    ? `${year}/${month}`
    : `${MONTHS_EN[Number(month) - 1]} ${year}`;
};
