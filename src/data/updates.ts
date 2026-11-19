import { l, type L } from "@/i18n/config";
import { awards, awardBadge } from "@/data/awards";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";

/** Icon shown beside an update; mapped to a lucide icon in News.tsx. */
export type UpdateIcon =
  | "zap"
  | "book"
  | "briefcase"
  | "graduation"
  | "trophy"
  | "users"
  | "calendar";

/** Points an update at a record kept elsewhere, instead of retyping it. */
export interface UpdateRef {
  type: "award" | "publication" | "experience";
  /** awards: slug · publications: id · experience: id */
  id: string;
}

export interface UpdateEntry {
  /** YYYY-MM. Shown as "YYYY.MM". */
  date: string;
  icon: UpdateIcon;
  /**
   * Written out for a plain update. With `ref`, either may be left out and is
   * then taken from the referenced record.
   */
  title?: L;
  description?: L;
  ref?: UpdateRef;
  /** Public coverage of this update; the outlet name links to the article. */
  press?: Press;
}

/** A news article that names Zuemen; shown as "Featured in <outlet>". */
export interface Press {
  outlet: L;
  url: string;
}

export interface Update {
  date: string;
  icon: UpdateIcon;
  title: L;
  description: L;
  ref?: UpdateRef;
  press?: Press;
}

/**
 * Recent Updates on the homepage, newest first. A running log of milestones.
 * Awards and competitive selections live in data/awards.ts and render in the
 * Awards section on /experience; an update that is about one of them uses
 * `ref`, and takes from the award whatever it does not write out itself.
 */
const entries: UpdateEntry[] = [
  {
    // 預告：11/23 活動後改成過去式（「Gave the opening remarks…」）。
    date: "2026-11",
    icon: "calendar",
    title: l(
      "Opening Remarks — \u201cWho Vouches for Your AI?\u201d Forum, TABEI Annual Conference",
      "TABEI 年會「誰在替你的 AI 背書？」論壇引言人",
    ),
    description: l(
      "Giving the opening remarks on Nov 23 at Trust Day, the first day of TABEI's 11th Taiwan Blockchain Annual Conference. The forum, chaired by FIDO Alliance Taiwan, covers digital identity and cross-organization authorization for AI agents, alongside the launch of the Trustworthy AI Economy policy white paper.",
      "11/23 於 TABEI 第 11 屆臺灣區塊鏈年會首日「信任日」擔任論壇引言人。論壇由 FIDO 聯盟臺灣分會主持，探討 AI Agent 的數位身分與跨組織授權，當天並發表《可信任 AI 經濟政策白皮書》。",
    ),
    press: {
      outlet: l("CryptoCity", "動區動趨"),
      url: "https://www.cryptocity.tw/news/ai-agent-identity-and-authorization",
    },
  },
  {
    date: "2026-11",
    icon: "book",
    title: l(
      "Lead Instructor — Web3 Cross-Domain Talent Certification Course (NCCU FTL × TABEI)",
      "擔任「Web3 跨域實戰人才認證課程」主講人（政大 FTL × TABEI）",
    ),
    description: l(
      "Taught the four-week public course (Oct 19 – Nov 13) on cryptography, stablecoins, DID and zero-knowledge proofs, and RWA tokenization. Built its course platform, course.zuemen.net, the first at NCCU to send registration passes and completion certificates to the Ministry of Digital Affairs' Digital Credential Wallet.",
      "主講為期四週的公益課程（10/19–11/13），涵蓋密碼學、穩定幣、DID 與零知識證明、RWA 代幣化。並自建課程平臺 course.zuemen.net，在政大首度以數位發展部「數位憑證皮夾」發送報名憑證與結業證書。",
    ),
    press: {
      outlet: l("NCCU News", "政大新聞"),
      url: "https://www.nccu.edu.tw/p/405-1000-24515.php?Lang=zh-tw",
    },
  },
  {
    // TODO: FinTech Taipei 展示已延期（日期未定）；辦完後再補展示敘述（使用者確認後）
    date: "2026-10",
    icon: "trophy",
    ref: { type: "award", id: "fintech-taipei-2026" },
    title: l(
      "Won the FinTech Taipei Awards 2026 (Campus Division)",
      "獲 2026 台北金融科技獎校園組優勝",
    ),
    description: l(
      "ChainLens took the Financial Innovation Award, Campus Division.",
      "鏈鏡 ChainLens 獲金融創新獎－校園組優勝。",
    ),
  },
  {
    // Description comes from the award's detail.
    date: "2026-10",
    icon: "trophy",
    ref: { type: "award", id: "chunghwa-telecom-2026" },
    title: l(
      "Finalist — Chunghwa Telecom Smart Innovation Application Competition 2026",
      "入圍 2026 中華電信智慧創新應用大賽決賽",
    ),
  },
  {
    date: "2026-09",
    icon: "briefcase",
    title: l(
      "Joined Cathay Financial Holdings as a Project Management Intern",
      "加入國泰金控擔任專案管理實習生",
    ),
    description: l(
      "Digital Data & Technology Development Center — Digital Architecture Development Department / Blockchain Technology Development Section (Sep 2026 – Jun 2027).",
      "數位數據暨科技發展中心 數位架構發展部／區塊鏈技術發展科（2026/09 – 2027/06）。",
    ),
  },
  {
    date: "2026-09",
    icon: "calendar",
    title: l("ETHTaipei 2026 — Event Staff", "ETHTaipei 2026 活動工作人員"),
    description: l(
      "Worked the conference on behalf of TABEI, Sep 13–14 in Taipei — the first edition to add a Financial Institution Day.",
      "9/13–14 以 TABEI 身分於台北擔任活動工作人員；本屆首度增設金融機構日。",
    ),
  },
  {
    date: "2026-09",
    icon: "trophy",
    title: l(
      "Trustworthy AI Hackathon 2026 Concluded",
      "2026 可信 AI 黑客松圓滿落幕",
    ),
    description: l(
      "Closed out the three-day hackathon and Demo Day at N24 Taipei Ark as part of the TABEI organizing team — 50 teams applied, 20 reached the finals, and Human ID took first place. Selected work continues to a policy white paper in November.",
      "以 TABEI 籌辦團隊身分完成於 N24 台北方舟舉行的三天黑客松與 Demo Day——50 隊報名、20 隊進入決賽，由 Human ID 奪冠。精選作品將收錄於 11 月的政策白皮書。",
    ),
  },
  {
    date: "2026-07",
    icon: "graduation",
    title: l(
      "Joined IBM Qiskit Global Summer School 2026",
      "參加 IBM Qiskit Global Summer School 2026",
    ),
    description: l(
      "Took part in IBM's Qiskit Global Summer School, a program on quantum algorithms and hands-on implementation in Qiskit.",
      "參加 IBM Qiskit 全球暑期學校，課程涵蓋量子演算法與 Qiskit 實作。",
    ),
  },
  {
    date: "2026-06",
    icon: "users",
    title: l(
      "Joined TABEI and the NCCU FinTech Club",
      "加入 TABEI 與政大金融科技社",
    ),
    description: l(
      "Started as an intern at the Taiwan Association for Blockchain Ecosystem Innovation, and was selected as an inaugural officer of the NCCU FinTech Club.",
      "於臺灣區塊鏈愛好者協會開始實習，並獲選為政大金融科技社第一屆幹部。",
    ),
  },
  {
    date: "2026-01",
    icon: "zap",
    title: l(
      "Joined the AI+QC Research and Development Program at NCCU MIS",
      "加入政大資管「AI+QC研發推動計畫」",
    ),
    description: l(
      "Appointed as a research assistant in the AI+QC program led by Prof. Rua-Huan Tsaih (Jan–Dec 2026) — a separate appointment from the smart contract security research advised by Prof. Feng-Yuan Chuang.",
      "獲聘為蔡瑞煌教授主持之「AI+QC研發推動計畫」研究助理（2026/01–2026/12），與莊豐源助理教授指導的智慧合約安全研究為不同聘任。",
    ),
  },
  {
    date: "2025-09",
    icon: "book",
    title: l(
      "Completed the Interdisciplinary Artificial Intelligence Micro Program",
      "修畢人工智慧跨域微學程",
    ),
    description: l(
      "Certified by the Interdisciplinary Artificial Intelligence Center, NCCU.",
      "由政大人工智慧跨域研究中心核發修業證明。",
    ),
  },
];

/** Text an update takes from the record it points at. */
const fromRef = (ref: UpdateRef): { title: L; description: L } | undefined => {
  switch (ref.type) {
    case "award": {
      const award = awards.find((a) => a.slug === ref.id);
      return award && { title: awardBadge(award), description: award.detail ?? award.issuer };
    }
    case "publication": {
      const pub = publications.find((p) => p.id === ref.id);
      return pub && { title: pub.title, description: pub.venue };
    }
    case "experience": {
      const exp = experience.find((e) => e.id === ref.id);
      return (
        exp && {
          title: exp.role
            ? l(`${exp.company.en} — ${exp.role.en}`, `${exp.company.zh} — ${exp.role.zh}`)
            : exp.company,
          description: exp.division ?? exp.period,
        }
      );
    }
  }
};

/** Fails the build on a dangling ref or an update with no text. */
export const updates: Update[] = entries.map((entry) => {
  const linked = entry.ref && fromRef(entry.ref);
  if (entry.ref && !linked) {
    throw new Error(`Update ${entry.date}: no ${entry.ref.type} "${entry.ref.id}"`);
  }
  const title = entry.title ?? linked?.title;
  const description = entry.description ?? linked?.description;
  if (!title || !description) {
    throw new Error(`Update ${entry.date}: needs a title and description, or a ref`);
  }
  return {
    date: entry.date,
    icon: entry.icon,
    title,
    description,
    ref: entry.ref,
    press: entry.press,
  };
});

/** "2026-09" -> "2026.09", the format Recent Updates has always shown. */
export const formatUpdateDate = (date: string) => date.replace("-", ".");
