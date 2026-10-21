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
}

export interface Update {
  date: string;
  icon: UpdateIcon;
  title: L;
  description: L;
  ref?: UpdateRef;
}

/**
 * Recent Updates on the homepage, newest first. A running log of milestones.
 * Awards and competitive selections live in data/awards.ts and render in the
 * Awards section on /experience; an update that is about one of them uses
 * `ref`, and takes from the award whatever it does not write out itself.
 */
const entries: UpdateEntry[] = [
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
    // TODO: 11/2 結果公布後更新
    // Description comes from the award's detail.
    date: "2026-10",
    icon: "trophy",
    ref: { type: "award", id: "chunghwa-telecom-2026" },
    title: l(
      "Grand finalist — Chunghwa Telecom Smart Innovation Application Competition 2026",
      "進入 2026 中華電信智慧創新應用大賽總決賽",
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
  return { date: entry.date, icon: entry.icon, title, description, ref: entry.ref };
});

/** "2026-09" -> "2026.09", the format Recent Updates has always shown. */
export const formatUpdateDate = (date: string) => date.replace("-", ".");
