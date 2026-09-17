import { l, type L } from "@/i18n/config";

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
  link?: string;
}

/**
 * Source of truth for awards and competitive selections. Newest first.
 * Rendered by the Awards section on /experience and the awards block on /cv.
 */
export const awards: Award[] = [
  {
    // Final results are announced 2026-10-07 — update `result` then.
    slug: "fintech-taipei-2026",
    title: l("FinTech Taipei Awards 2026", "2026 台北金融科技獎"),
    issuer: l(
      "Financial Innovation Award, Campus Division",
      "金融創新獎－校園組",
    ),
    date: "2026-09",
    result: l("Finalist", "入圍決審"),
    role: l("Team Lead", "團隊負責人"),
    detail: l(
      "ChainLens, an explainable graph-analytics system for tracing crypto fraud money flows, advanced to the final review with a three-person team.",
      "以「鏈鏡 ChainLens」——可解釋的虛擬資產詐騙金流圖分析系統——三人團隊入圍決審。",
    ),
    link: "https://chain-lens-beta.vercel.app",
  },
  {
    slug: "ntu-ibm-qiskit-hackathon-2026",
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
    title: l(
      "Digital Credential Scenario Innovation Challenge",
      "數位憑證場景創新賽",
    ),
    issuer: l(
      "Ministry of Digital Affairs, Taiwan (moda)",
      "數位發展部",
    ),
    date: "2025-11",
    result: l("Merit Award", "學生組優選"),
    role: l("Team Leader", "隊長"),
    certificateUrl: "/awards/moda-digital-credential-2025-certificate.pdf",
  },
];

const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** "2025-11" -> "Nov 2025" / "2025/11" */
export const formatAwardDate = (date: string, lang: "en" | "zh" = "en") => {
  const [year, month] = date.split("-");
  return lang === "zh"
    ? `${year}/${month}`
    : `${MONTHS_EN[Number(month) - 1]} ${year}`;
};
