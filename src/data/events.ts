import { l, type L } from "@/i18n/config";
import type { Photo } from "@/data/experience";

/**
 * Events: talks, teaching, organizing, staffing and conferences attended,
 * rendered by /events. Newest first. Anything event-shaped goes here — a
 * one-off talk, a conference he attended, a course he taught.
 *
 * `date` is YYYY-MM-DD, or YYYY-MM when only the month is known; `end` the
 * last day of a multi-day event. Upcoming vs past is worked out on the page
 * from today's date, so an entry needs no edit when its day passes — only its
 * wording does, if it was written in the future tense.
 *
 * Photos: anyone other than Zuemen must be blurred (the owner's blurred
 * copies). Never use an unblurred original of a crowd.
 */

export type EventKind = "speaking" | "teaching" | "organizing" | "staff" | "attending";

export interface EventLink {
  href: string;
  label: L;
}

export interface EventEntry {
  id: string;
  date: string;
  end?: string;
  kind: EventKind;
  title: L;
  role: L;
  place: L;
  summary: L;
  /** Internal page with the full write-up, e.g. a course. */
  page?: string;
  links?: EventLink[];
  photo?: Photo;
}

/** The date the page treats as "today" before the browser supplies its own. */
export const EVENTS_AS_OF = "2026-11-20";

export const events: EventEntry[] = [
  {
    // 預告：11/23 之後若要補當天內容或照片，改寫 summary 即可（上下方分區會自動換）。
    id: "tabei-annual-2026",
    date: "2026-11-23",
    kind: "speaking",
    title: l(
      "11th Taiwan Blockchain Annual Conference — Trust Day",
      "第 11 屆臺灣區塊鏈年會「信任日」",
    ),
    role: l(
      "Opening remarks — “Who Vouches for Your AI?” forum",
      "「誰在替你的 AI 背書？」論壇引言人",
    ),
    place: l("Taipei · TABEI", "台北 · TABEI"),
    summary: l(
      "The forum, chaired by FIDO Alliance Taiwan, takes up digital identity and cross-organization authorization for AI agents, alongside the launch of the Trustworthy AI Economy policy white paper with GLEIF and the FIDO Alliance.",
      "論壇由 FIDO 聯盟臺灣分會主持，探討 AI Agent 的數位身分與跨組織授權；當天並與 GLEIF、FIDO 聯盟發表《可信任 AI 經濟政策白皮書》。",
    ),
    links: [
      {
        href: "https://www.cryptocity.tw/news/ai-agent-identity-and-authorization",
        label: l("Coverage — CryptoCity", "報導 — 動區動趨"),
      },
    ],
  },
  {
    // Photo: the other booth staffer's face and passers-by are pixelated.
    id: "meet-taipei-2026",
    date: "2026-11-19",
    kind: "staff",
    title: l("Meet Taipei Startup Festival 2026", "2026 Meet Taipei 創新創業嘉年華"),
    role: l(
      "Booth staff — Digital Assets Development Research Center (DADRC)",
      "數位資產發展研究中心（DADRC）攤位人員",
    ),
    place: l("Taipei Expo Park · Booth F3-02", "台北圓山花博 · F3-02 攤位"),
    summary: l(
      "Staffed the DADRC booth at Taipei's innovation and startup festival, held across seven exhibition zones at the Taipei Expo Park.",
      "在台北圓山花博七大展區的創新創業展會上顧數位資產發展研究中心的攤位。",
    ),
    photo: {
      src: "/photos/meet-taipei-2026-booth.webp",
      alt: l(
        "Zuemen in a cap at the Digital Assets Development Research Center booth, Meet Taipei 2026; other people's faces are pixelated",
        "朱廷翊（戴帽者）在 Meet Taipei 2026 數位資產發展研究中心攤位，其他人臉部已模糊處理",
      ),
      width: 853,
      height: 1280,
    },
  },
  {
    // Speaker: Teagan Buckley (劉子濰 is the same person). Role kept to "support",
    // as the owner put it on 2026-11-20.
    id: "canton-nccu-2026",
    date: "2026-10-21",
    kind: "staff",
    title: l(
      "Canton Network: Institutional-Grade Blockchain on Wall Street — Talk & Workshop",
      "接軌華爾街機構級區塊鏈：Canton Network 專題講座與分組工作坊",
    ),
    role: l("Event support (NCCU FTL)", "活動支援（政大 FTL）"),
    place: l("NCCU College of Law · NCCU FTL", "政大法學院富邦法學講堂 · 政大 FTL"),
    summary: l(
      "A talk by Teagan Buckley, Head of Institutional Partnerships APAC at the Canton Foundation, followed by a group workshop where students pitched Canton use cases for Taiwan — fund settlement, carbon credit tokenization, SME supply-chain finance and cross-border medical claims.",
      "由 Canton Foundation 亞太區機構合作負責人 Teagan Buckley 主講，後半段分組工作坊由學生提出 Canton 在臺灣的應用提案：基金申購交割、碳權代幣化、中小企業供應鏈融資與跨境醫療理賠。",
    ),
    links: [
      {
        href: "https://www.nccu.edu.tw/p/405-1000-24260.php?Lang=zh-tw",
        label: l("Coverage — NCCU News", "報導 — 政大新聞"),
      },
    ],
  },
  {
    id: "web3-course-2026",
    date: "2026-10-19",
    end: "2026-11-13",
    kind: "teaching",
    title: l(
      "Web3 Cross-Domain Talent Certification Course",
      "Web3 跨域實戰人才認證課程",
    ),
    role: l("Lead Instructor", "主講人"),
    place: l("NCCU · NCCU FTL × TABEI", "政大 · 政大 FTL × TABEI"),
    summary: l(
      "Four public evening sessions on cryptography, stablecoins, digital identity and RWA tokenization, each with a hands-on lab. Registration passes and completion certificates went to the national Digital Credential Wallet — a first at NCCU.",
      "四堂對外公益課程，涵蓋密碼學、穩定幣、數位身分與 RWA 代幣化，每堂都有上機實作；報名憑證與結業證書直接發到數位憑證皮夾，為政大首例。",
    ),
    page: "/events/web3-course",
    links: [
      {
        href: "https://www.nccu.edu.tw/p/405-1000-24515.php?Lang=zh-tw",
        label: l("Coverage — NCCU News", "報導 — 政大新聞"),
      },
    ],
    photo: {
      src: "/photos/web3-course-class.webp",
      alt: l(
        "Zuemen with the class in session 1; attendees' faces are blurred",
        "朱廷翊與第 1 堂學員合影，學員臉部已模糊處理",
      ),
      width: 1600,
      height: 900,
    },
  },
  {
    id: "ethtaipei-2026",
    date: "2026-09-13",
    end: "2026-09-14",
    kind: "staff",
    title: l("ETHTaipei 2026", "ETHTaipei 2026"),
    role: l("Event Staff (TABEI)", "活動工作人員（TABEI）"),
    place: l("Taipei", "台北"),
    summary: l(
      "Worked the conference on behalf of TABEI — the first edition to add a Financial Institution Day.",
      "以 TABEI 身分擔任工作人員；本屆首度增設金融機構日。",
    ),
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
    id: "trustworthy-ai-hackathon-2026",
    date: "2026-08-29",
    end: "2026-08-31",
    kind: "organizing",
    title: l("Trustworthy AI Hackathon 2026", "2026 可信 AI 黑客松"),
    role: l("Organizing Team (TABEI)", "籌辦團隊（TABEI）"),
    place: l("N24 Taipei Ark", "N24 台北方舟"),
    summary: l(
      "Planned and ran the three-day hackathon and Demo Day under the guidance of the National Development Council: 50 teams applied, 20 reached the finals, six industry challenge tracks. Human ID took first place.",
      "在國家發展委員會指導下，規劃並執行三天黑客松與 Demo Day：50 隊報名、20 隊進入決賽、六大產業命題，由 Human ID 奪冠。",
    ),
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
];
