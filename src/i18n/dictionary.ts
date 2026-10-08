import { l } from "./config";

/**
 * UI copy for the whole site. Page prose that belongs to a data record
 * (projects, awards, experience) lives with that record instead.
 */
export const dict = {
  nav: {
    research: l("Research", "研究"),
    experience: l("Experience", "經歷"),
    projects: l("Projects", "作品"),
    cv: l("CV", "履歷"),
    contact: l("Contact", "聯絡"),
    openMenu: l("Open menu", "開啟選單"),
    closeMenu: l("Close menu", "關閉選單"),
    home: l("Zuemen Chu — Home", "朱廷翊 — 首頁"),
    skip: l("Skip to main content", "跳至主要內容"),
    switchTo: l("切換至中文", "Switch to English"),
  },

  hero: {
    // Rewritten 2026-10-05 from the owner's bio: who he is now (the eyebrow),
    // what the work is about (the standfirst), and where it happens today.
    role: l(
      "MIS, National Chengchi University · Class of 2027",
      "國立政治大學 資訊管理學系 · 2027 屆",
    ),
    intro: l(
      "I work on digital trust — making a credential verifiable without trusting whoever hands it to you, and making the contracts underneath it safe to rely on.",
      "我做的是數位信任——讓一份憑證不必信任遞出它的人也能被驗證，也讓它底下的合約值得依賴。",
    ),
    web3: l(
      "Right now I'm a Project Management Intern in the Blockchain Technology Development Section at Cathay Financial Holdings, research Web3 agent protocols and trustworthy AI at TABEI, and work on two research tracks at NCCU MIS. In my own builds, identity extends to autonomous agents — agent DIDs, session-bounded permissions, and x402 machine payments prototyped on the Base Sepolia testnet.",
      "目前我在國泰金控區塊鏈技術發展科擔任專案管理實習生，在 TABEI 研究 Web3 agent 協定與可信 AI，也在政大資管參與兩條研究線。我自己的專案則把身分延伸到自主 agent：agent DID、以 session 為界的權限，以及在 Base Sepolia 測試網上實作的 x402 機器支付。",
    ),
    tags: [
      l("Self-Sovereign Identity", "自主權身分"),
      l("Smart Contract Security", "智慧合約安全"),
      l("Agent Identity & Payments", "Agent 身分與支付"),
      l("Blockchain & Fintech", "區塊鏈與金融科技"),
    ],
    seeResearch: l("See Research", "查看研究"),
    contact: l("Contact", "聯絡我"),
    photoAlt: l(
      "Profile photo of Zuemen Chu (朱廷翊)",
      "朱廷翊的個人照片",
    ),
  },

  sections: {
    researchAreasEyebrow: l("What I work on", "研究方向"),
    researchAreas: l("Research Areas", "研究領域"),
    selectedWorkEyebrow: l("Selected work", "精選作品"),
    projects: l("Projects", "作品"),
    allProjects: l("All projects", "所有作品"),
    latestEyebrow: l("Latest", "近況"),
    recentUpdates: l("Recent Updates", "近期動態"),
    awardsLink: l("Awards & competitions", "獎項與競賽"),
    contactEyebrow: l("Contact", "聯絡"),
    getInTouch: l("Get in Touch", "聯絡我"),
    contactSubtitle: l(
      "Open for research collaborations and technical discussions.",
      "歡迎研究合作與技術交流。",
    ),
    experienceEyebrow: l("Where I've worked", "工作經歷"),
    experience: l("Professional Experience", "專業經歷"),
    recognitionEyebrow: l("Recognition", "肯定"),
    awards: l("Awards & Competitions", "獎項與競賽"),
    projectsTitle: l("Research & Projects", "研究與作品"),
    projectsSubtitle: l(
      "Bridging emerging technologies with institutional needs.",
      "在新興技術與制度需求之間搭橋。",
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
    notes: l("Notes", "筆記"),
    email: l("Email", "電子郵件"),
    backToProjects: l("Back to Projects", "回到作品列表"),
  },

  // Chrome for the ChainLens replay (components/demos). UI labels only.
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
    replayLabel: l("Replay", "重播"),
  },

  cv: {
    summary: l("Professional Summary", "專業摘要"),
    education: l("Education", "學歷"),
    experience: l("Experience", "工作經歷"),
    awards: l("Leadership & Awards", "領導與獲獎"),
    skills: l("Technical Skills", "專業技能"),
  },
} as const;
