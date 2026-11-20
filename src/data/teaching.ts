import { l, type L } from "@/i18n/config";
import type { Photo } from "@/data/experience";

/**
 * Courses Zuemen has taught, rendered by /teaching.
 *
 * Facts come from the two NCCU news posts linked under `press`: the call for
 * participants (2026-10-12) for dates, venue and the four session titles, and
 * the wrap-up (2026-11-17) for his title and the Digital Credential Wallet
 * certificates. Do not add attendance or completion numbers; neither post
 * states them.
 *
 * Photos: every attendee's face is blurred (the owner's blurred copies). Never
 * replace one with an unblurred original.
 */

export interface Session {
  /** YYYY-MM-DD */
  date: string;
  theme: L;
  title: L;
  hands: L;
}

export interface Course {
  slug: string;
  title: L;
  role: L;
  organizers: L;
  advisor: L;
  period: L;
  format: L;
  venue: L;
  summary: L;
  highlights: { value: L; label: L }[];
  sessions: Session[];
  platform: { href: string; label: L; note: L };
  photos: Photo[];
  press: { href: string; outlet: L; title: L; date: string }[];
}

export const courses: Course[] = [
  {
    slug: "web3-cross-domain-2026",
    title: l(
      "Web3 Cross-Domain Talent Certification Course",
      "Web3 跨域實戰人才認證課程",
    ),
    role: l("Lead Instructor", "主講人"),
    organizers: l(
      "NCCU FinTech Club (FTL) × Taiwan Association for Blockchain Ecosystem Innovation (TABEI)",
      "政大金融科技創新實驗室（FTL）× 臺灣區塊鏈愛好者協會（TABEI）",
    ),
    advisor: l(
      "Advised by the NCCU FinTech Research Center",
      "指導單位：國立政治大學金融科技研究中心",
    ),
    period: l("Oct 19 – Nov 13, 2026", "2026/10/19 – 11/13"),
    format: l(
      "Four evening sessions · lecture plus hands-on lab · free and open to the public",
      "四堂晚間課程 · 講授＋上機實作 · 全程免費、對外開放",
    ),
    venue: l("NCCU, Taipei", "國立政治大學（台北）"),
    summary: l(
      "A four-week public course taking students, career-changers and working professionals from the cryptography under a blockchain to stablecoins, digital identity and real-world asset tokenization — no programming background required. Every session pairs the concept with something attendees do themselves: a wallet, a testnet transfer, a credential, an on-chain product record.",
      "為期四週的公益課程，帶學生、轉職者與在職人士從區塊鏈底層的密碼學，一路走到穩定幣、數位身分與真實世界資產代幣化，不需要程式背景。每一堂都把觀念對到學員親手做的一件事：一個錢包、一筆測試網轉帳、一張憑證、一份鏈上履歷。",
    ),
    highlights: [
      { value: l("4", "4"), label: l("sessions, each with a hands-on lab", "堂課，每堂都有實作") },
      { value: l("60", "60"), label: l("seats, open to students and the public", "人名額，學生與社會人士皆可報名") },
      {
        value: l("1st", "首度"),
        label: l(
          "at NCCU to issue course certificates to the national Digital Credential Wallet",
          "在政大以數位發展部「數位憑證皮夾」發報名憑證與結業證書",
        ),
      },
    ],
    sessions: [
      {
        date: "2026-10-19",
        theme: l("Cryptography", "密碼學基礎"),
        title: l(
          "The invisible lock: hashes, signatures and the post-quantum era",
          "看不見的鎖：雜湊、簽章與後量子時代",
        ),
        hands: l(
          "Create a wallet, try hashing by hand, and send a testnet transfer.",
          "親手建立錢包、體驗雜湊運算，並完成測試網轉帳。",
        ),
      },
      {
        date: "2026-10-23",
        theme: l("Stablecoins", "穩定幣"),
        title: l(
          "How does a dollar become a line of code?",
          "一塊錢怎麼變成一串程式碼？",
        ),
        hands: l(
          "How stablecoins work and are regulated; testnet transfers and reading an issuer's reserve report.",
          "解析穩定幣運作與監管，實際操作測試網轉帳、查閱發行商準備金報告。",
        ),
      },
      {
        date: "2026-11-09",
        theme: l("Digital Identity", "數位身分"),
        title: l(
          "Your ID is turning into a card on your phone",
          "你的證件正在變成手機裡的一張卡",
        ),
        hands: l(
          "DIDs, verifiable credentials and zero-knowledge proofs; issue, present and verify a credential in the Digital Credential Wallet sandbox.",
          "DID、可驗證憑證與零知識證明；在數位憑證皮夾沙盒體驗發卡、出示與驗證。",
        ),
      },
      {
        date: "2026-11-13",
        theme: l("Real-World Assets", "RWA 資產上鏈"),
        title: l(
          "Assets on-chain: from supply chains to cross-border finance",
          "資產上鏈：從供應鏈到跨境金融",
        ),
        hands: l(
          "Tokenization and consortium chains; teams design and issue an on-chain product record.",
          "資產代幣化與聯盟鏈應用；分組設計並簽發產品的鏈上履歷憑證。",
        ),
      },
    ],
    platform: {
      href: "https://course.zuemen.net",
      label: l("course.zuemen.net", "course.zuemen.net"),
      note: l(
        "I built the course platform myself. Registration sends an entry pass straight to the attendee's Digital Credential Wallet, and the completion certificate arrives the same way — so a future employer or admissions office can verify the signature by scanning it, with only the fields the holder chooses to disclose.",
        "課程平臺由我自己開發。報名完成後，入場憑證會直接送進學員手機的數位憑證皮夾；結業證書也以同樣方式發放，日後雇主或審查單位掃描即可驗證簽章，學員只揭露自己選擇的欄位。",
      ),
    },
    photos: [
      {
        src: "/photos/web3-course-lecture.webp",
        alt: l(
          "Zuemen lecturing at the podium in session 1, beside a slide mapping the four sessions",
          "第 1 堂朱廷翊在講台授課，投影片是四堂課程地圖",
        ),
        width: 1600,
        height: 900,
      },
      {
        src: "/photos/web3-course-class.webp",
        alt: l(
          "Zuemen seated with the class in session 1; attendees' faces are blurred",
          "第 1 堂朱廷翊與全班合影，學員臉部已模糊處理",
        ),
        width: 1600,
        height: 900,
      },
      {
        src: "/photos/web3-course-podium.webp",
        alt: l(
          "Zuemen at the lectern facing a full classroom; attendees' faces are blurred",
          "朱廷翊在講桌前面對滿座教室，學員臉部已模糊處理",
        ),
        width: 1600,
        height: 900,
      },
      {
        src: "/photos/web3-course-group.webp",
        alt: l(
          "Group photo after a session; attendees' faces are blurred",
          "課後團體合照，學員臉部已模糊處理",
        ),
        width: 1600,
        height: 1200,
      },
    ],
    press: [
      {
        href: "https://www.nccu.edu.tw/p/405-1000-24515.php?Lang=zh-tw",
        outlet: l("NCCU News", "政大新聞"),
        title: l(
          "NCCU FTL and TABEI wrap up the first Web3 course built on the Digital Credential Wallet",
          "政大FTL攜手TABEI｜首度結合「數位憑證皮夾」Web3賦能課程圓滿落幕",
        ),
        date: "2026-11-17",
      },
      {
        href: "https://www.nccu.edu.tw/p/405-1000-24091.php?Lang=zh-tw",
        outlet: l("NCCU News", "政大新聞"),
        title: l(
          "Web3 Cross-Domain Talent Certification Course — free public programme",
          "Web3 跨域實戰人才認證課程｜免費公益賦能計畫",
        ),
        date: "2026-10-12",
      },
    ],
  },
];
