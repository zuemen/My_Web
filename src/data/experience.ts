import { l, type L } from "@/i18n/config";

export interface Photo {
  src: string;
  alt: L;
  width: number;
  height: number;
}

export interface ExpDetail {
  name: L;
  details?: L[];
  /** Public pages a reader can verify the work against. */
  links?: { href: string; label: L }[];
  photo?: Photo;
}

export interface ExpEntry {
  id: string;
  company: L;
  division?: L;
  role?: L;
  period: L;
  location?: L;
  advisor?: L;
  projects?: ExpDetail[];
  notes?: L[];
}

/**
 * Source of truth for experience. Rendered by /experience and by the CV page,
 * so the two can no longer drift apart (they did once: an end date was fixed
 * on one page and not the other).
 */
export const experience: ExpEntry[] = [
  {
    // Confidentiality: unit, title, project name and dates only. Do not add
    // scope, architecture or any technical detail to this entry.
    //
    // Title is Project Management Intern. The offer email (2026-07-22) is for
    // the TBA programme's project management track; the technical track was a
    // separate application that was not offered. Do not reword this as a
    // technical or engineering internship.
    id: "cathay",
    company: l("Cathay Financial Holdings", "國泰金控"),
    division: l(
      "Digital Data & Technology Development Center — Digital Architecture Development Department / Blockchain Technology Development Section",
      "數位數據暨科技發展中心 數位架構發展部／區塊鏈技術發展科",
    ),
    role: l("Project Management Intern", "專案管理實習生"),
    period: l("Sep 2026 – Jun 2027", "2026/09 – 2027/06"),
    location: l("Taipei", "台北"),
    projects: [{ name: l("Hot Wallet Research Project", "熱錢包研究專案") }],
  },
  {
    id: "nccu-ra",
    company: l("National Chengchi University, MIS", "國立政治大學 資訊管理學系"),
    role: l("Research Assistant", "研究助理"),
    period: l("May 2025 – Dec 2026", "2025/05 – 2026/12"),
    advisor: l("Prof. Feng-Yuan Chuang (莊豐源)", "莊豐源 教授"),
    projects: [
      {
        name: l(
          "Smart Contract Security and Auditing Mechanism Research",
          "智慧合約安全與稽核機制研究",
        ),
      },
      {
        name: l(
          "AI + Quantum Computing (AI+QC) Research and Development Program",
          "AI + 量子計算（AI+QC）研發計畫",
        ),
      },
    ],
    notes: [
      l(
        "Literature review, research analysis, system development, technical documentation",
        "文獻回顧、研究分析、系統開發與技術文件撰寫",
      ),
    ],
  },
  {
    // TABEI is the association's own English name; "Taiwan Blockchain
    // Enthusiasts Association" is a back-translation of the Chinese and is not
    // what the organisation publishes under.
    id: "tabei",
    company: l(
      "Taiwan Association for Blockchain Ecosystem Innovation (TABEI)",
      "臺灣區塊鏈愛好者協會（TABEI）",
    ),
    role: l("Intern", "實習生"),
    period: l("Jun 2026 – Present", "2026/06 – 至今"),
    location: l("Taipei", "台北"),
    projects: [
      {
        name: l("ETHTaipei 2026 — Event Staff", "ETHTaipei 2026 — 活動工作人員"),
        details: [
          l(
            "Event staff on behalf of TABEI for ETHTaipei 2026 (Sep 13–14, 2026, Taipei), the conference's first edition to add a Financial Institution Day.",
            "以 TABEI 身分擔任 ETHTaipei 2026（2026/9/13–14，台北）活動工作人員；本屆首度增設金融機構日。",
          ),
        ],
        links: [{ href: "https://ethtaipei.org/", label: l("ethtaipei.org", "ethtaipei.org") }],
        photo: {
          src: "/photos/ethtaipei-2026-staff.webp",
          alt: l(
            "Zuemen Chu in an ETHTaipei shirt in front of the ETHTaipei 2026 sponsor wall",
            "朱廷翊身穿 ETHTaipei 上衣，站在 ETHTaipei 2026 贊助商主視覺牆前",
          ),
          width: 1400,
          height: 1050,
        },
      },
      {
        name: l(
          "Trustworthy AI Hackathon 2026 — Organizing Team",
          "2026 可信 AI 黑客松 — 籌辦團隊",
        ),
        details: [
          l(
            "Led planning and operations for the three-day event (Aug 29–31, 2026) at N24 Taipei Ark, held under the guidance of the National Development Council as part of its policy research program on trustworthy AI, privacy computing and trust technology.",
            "負責三天活動（2026/8/29–31，N24 台北方舟）的規劃與營運；活動在國家發展委員會指導下舉辦，屬其可信 AI、隱私運算與信任科技政策研究計畫的一環。",
          ),
          l(
            "Ran the intake and selection pipeline: 50 teams applied, 20 advanced to the final round through written review, competing for a USD 12,000+ prize pool across six industry challenge tracks.",
            "負責收件與初選流程：50 隊報名，經書面初審 20 隊進入決賽，角逐逾 1.2 萬美元獎金與六大產業命題。",
          ),
          l(
            "Translated one closed-door expert roundtable (June) and two industry roundtables (July) into the six challenge tracks — carbon footprint and DPP data-flow control, suspicious activity detection under payment privacy constraints, cross-sector health insurance data collaboration, fragmented government service credentials, migrant worker digital trust and financial inclusion, and RBA supply chain compliance credentials.",
            "將 6 月一場閉門專家座談與 7 月兩場產業座談，轉化為六大命題——碳足跡與 DPP 資料流控管、支付隱私限制下的可疑交易偵測、跨業健康保險資料協作、分散的政府服務憑證、移工數位信任與普惠金融，以及 RBA 供應鏈合規憑證。",
          ),
          l(
            "Coordinated two pre-event workshops (Aug 15 online technical, Aug 22 on-site industry), team matchmaking, the participant handbook, and submission and judging rules for a panel of nine judges scoring on industry fit (35%), technical feasibility (25%), demo (25%) and insight (15%).",
            "統籌兩場賽前工作坊（8/15 線上技術場、8/22 實體產業場）、組隊媒合、參賽手冊，以及九位評審的提交與評分規則（產業契合 35%、技術可行性 25%、Demo 25%、洞察 15%）。",
          ),
          l("Built and shipped the official event website.", "建置並上線活動官網。"),
          l(
            "Outcome: Human ID took first place (USD 5,000). Selected work will be presented at the 11th Blockchain Enthusiasts Annual Conference in November and included in the annual policy white paper.",
            "成果：Human ID 奪冠（USD 5,000）。精選作品將於 11 月第 11 屆區塊鏈愛好者年會發表，並收錄於年度政策白皮書。",
          ),
        ],
        links: [
          { href: "https://hackathon.chain.tw/", label: l("hackathon.chain.tw", "hackathon.chain.tw") },
          {
            href: "https://abmedia.io/https-abmedia-io-trustworthy-ai-hackathon-winners",
            label: l("Coverage — ABMedia", "報導 — 鏈新聞"),
          },
        ],
        photo: {
          src: "/photos/trustworthy-ai-hackathon-2026.webp",
          alt: l(
            "Zuemen Chu wearing a staff lanyard in front of the Trustworthy AI Hackathon 2026 backdrop",
            "朱廷翊配戴工作人員識別證，站在 2026 可信 AI 黑客松背板前",
          ),
          width: 900,
          height: 1599,
        },
      },
    ],
  },
  {
    id: "nccu-ftl",
    company: l("NCCU FinTech Club", "政大金融科技社"),
    role: l("Inaugural Officer", "第一屆幹部"),
    period: l("Jun 2026 – Present", "2026/06 – 至今"),
    location: l("Taipei", "台北"),
  },
];
