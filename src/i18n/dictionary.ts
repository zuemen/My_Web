import { l } from "./config";

/**
 * UI copy for the whole site. Page prose that belongs to a data record
 * (projects, awards, experience) lives with that record instead.
 */
export const dict = {
  nav: {
    research: l("About", "關於"),
    experience: l("Experience", "經歷"),
    projects: l("Work", "作品"),
    cv: l("CV", "履歷"),
    contact: l("Contact", "聯絡"),
    openMenu: l("Open menu", "開啟選單"),
    closeMenu: l("Close menu", "關閉選單"),
    home: l("Zuemen Chu — Home", "朱廷翊 — 首頁"),
    skip: l("Skip to main content", "跳至主要內容"),
    switchTo: l("切換至中文", "Switch to English"),
  },

  hero: {
    // 2026-10-08: rewritten for readers from investment and startups. The
    // claim leads; the name follows in the lead; the proof bar carries the
    // evidence. Every figure in `proof` is summed from data/projects.ts.
    eyebrow: l(
      "Builder · agent payments, on-chain identity, explainable risk",
      "Builder · Agent 支付、鏈上身分、可解釋風控",
    ),
    headline: l(
      "Trust infrastructure for AI agents that move money.",
      "替會動用資金的 AI agent，打造信任基礎設施。",
    ),
    leadBefore: l("I'm ", "我是"),
    leadAfter: l(
      ". I build the checks a counterparty runs before it lets an agent act — who is accountable, what was authorised, whether it still holds — and ship them as contracts on public testnets, each with a replay you can verify on a block explorer.",
      "。我做的是對手方放行 agent 之前要跑的那些檢查——誰該負責、授權了什麼、授權是否仍有效——並把它們做成部署在公開測試網上的合約，每一個都附上能在區塊瀏覽器上查證的重播。",
    ),
    watch: l("Watch the replays", "看實際重播"),
    contact: l("Get in touch", "聯絡我"),
    nowLabel: l("Now", "目前"),
    now: [
      l("Project Management Intern, Blockchain Technology Development Section — Cathay Financial Holdings", "國泰金控 區塊鏈技術發展科 專案管理實習生"),
      l("Research Assistant, NCCU MIS · Intern, TABEI", "政大資管 研究助理 · TABEI 實習生"),
    ],
    proof: [
      {
        value: l("31", "31"),
        label: l("source-verified contracts on Base, Monad and Ethereum testnets", "支合約在 Base、Monad、Ethereum 測試網完成原始碼驗證"),
        href: "/projects#mandates",
      },
      {
        value: l("2,800+", "2,800+"),
        label: l("automated tests across five protocol repos", "個自動化測試，橫跨五個協議 repo"),
        href: "/projects#identity",
      },
      {
        value: l("7", "7"),
        label: l("on-chain refusals in the replays, each one a transaction you can open", "次鏈上拒絕出現在重播中，每一次都是可查證的交易"),
        href: "/#demos",
      },
      {
        value: l("Winner", "優勝"),
        label: l("FinTech Taipei Awards 2026, Campus Division — ChainLens", "2026 台北金融科技獎校園組——鏈鏡 ChainLens"),
        href: "/projects/chainlens",
      },
    ],
    photoAlt: l(
      "Profile photo of Zuemen Chu (朱廷翊)",
      "朱廷翊的個人照片",
    ),
  },

  sections: {
    researchAreasEyebrow: l("What I work on", "研究方向"),
    researchAreas: l("Research Areas", "研究領域"),
    selectedWorkEyebrow: l("Work", "作品"),
    projects: l("Projects", "作品"),
    allProjects: l("All projects", "所有作品"),
    latestEyebrow: l("Latest", "近況"),
    recentUpdates: l("Recent Updates", "近期動態"),
    awardsLink: l("Awards & competitions", "獎項與競賽"),
    contactEyebrow: l("Contact", "聯絡"),
    getInTouch: l("Get in Touch", "聯絡我"),
    contactTitle: l(
      "Building in agent payments, on-chain identity or RegTech?",
      "正在做 agent 支付、鏈上身分或 RegTech？",
    ),
    contactSubtitle: l(
      "I'm open to early-team roles, pilots and research collaborations — and happy to walk through any of the replays above in detail. Email is the fastest way to reach me.",
      "我對早期團隊職位、試點合作與研究合作都保持開放，也很樂意逐步講解上面任何一段重播。寫信是最快聯絡到我的方式。",
    ),
    emailMe: l("Email me", "寫信給我"),
    experienceEyebrow: l("Where I've worked", "工作經歷"),
    experience: l("Professional Experience", "專業經歷"),
    recognitionEyebrow: l("Recognition", "肯定"),
    awards: l("Awards & Competitions", "獎項與競賽"),
    projectsTitle: l("Work, by thesis", "作品，依命題分組"),
    projectsSubtitle: l(
      "Every number on this page is quoted from the project's own repository, and every limit that repository states is repeated here.",
      "本頁每一個數字都引自該專案自己的 repository，該 repository 寫明的每一項限制也都照實列出。",
    ),
    researchFocus: l("Research Focus", "研究重點"),
  },

  labels: {
    outcome: l("Outcome", "成果"),
    readCaseStudy: l("Read case study", "閱讀案例"),
    liveDemo: l("Live demo", "線上 Demo"),
    viewSource: l("View source code for", "查看原始碼："),
    certificate: l("Certificate", "證書"),
    certificatePdf: l("Certificate (PDF)", "證書（PDF）"),
    eventPage: l("Event page", "活動頁面"),
    advisor: l("Advisor", "指導教授"),
    pi: l("Principal Investigator", "計畫主持人"),
    lastUpdated: l("Last updated", "最後更新"),
    sourceOnGitHub: l("Source on GitHub", "GitHub 原始碼"),
    source: l("Source", "原始碼"),
    notes: l("Notes", "筆記"),
    email: l("Email", "電子郵件"),
    backToProjects: l("Back to Projects", "回到作品列表"),
  },

  demo: {
    play: l("Play", "播放"),
    pause: l("Pause", "暫停"),
    previous: l("Previous step", "上一步"),
    next: l("Next step", "下一步"),
    step: l("Step", "步驟"),
    runLog: l("Run log", "執行紀錄"),
    tx: l("tx", "交易"),
    noTx: l("off-chain", "鏈下"),
    openLive: l("Open the live demo", "開啟線上 demo"),
    refused: l("Refused", "拒絕"),
    accepted: l("Accepted", "通過"),
    flagged: l("Accepted on-chain · flagged", "鏈上接受 · 驗證不通過"),
    stateUpdate: l("State update — no gate check", "狀態更新，不經閘門檢查"),
    notReached: l("not reached", "未執行"),
    notApplicable: l("n/a", "不適用"),
    replayLabel: l("Replay", "重播"),
    from: l("from", "發起"),
    to: l("to", "對象"),
  },

  cv: {
    summary: l("Professional Summary", "專業摘要"),
    education: l("Education", "學歷"),
    experience: l("Experience", "工作經歷"),
    awards: l("Leadership & Awards", "領導與獲獎"),
    skills: l("Technical Skills", "專業技能"),
  },
} as const;
