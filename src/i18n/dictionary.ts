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
    role: l(
      "Research Assistant · National Chengchi University MIS",
      "研究助理 · 國立政治大學資訊管理學系",
    ),
    intro: l(
      "I work on the infrastructure that lets a credential be trusted without trusting whoever hands it to you — self-sovereign identity, and the contract security underneath it.",
      "我做的是讓憑證本身可被信任的基礎建設 —— 不必信任遞出憑證的那個人。自主權身分，以及支撐它的合約安全。",
    ),
    web3: l(
      "That line now runs into what an autonomous agent is allowed to do with money: verifiable agent identity, session-bounded trading permissions, and an x402 payment-gated signal API that settles in USDC and splits its revenue on-chain — deployed to the Base Sepolia testnet.",
      "這條線現在延伸到自主 agent 能對資金做什麼：可驗證的 agent 身分、以 session 為界的交易授權，以及一支 x402 付費訊號 API —— 以 USDC 結算、收入在鏈上分潤，部署於 Base Sepolia 測試網。",
    ),
    tags: [
      l("Self-Sovereign Identity", "自主權身分"),
      l("Smart Contract Security", "智慧合約安全"),
      l("Agent Payments (x402)", "代理支付 x402"),
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
    lastUpdated: l("Last updated", "最後更新"),
    sourceOnGitHub: l("Source on GitHub", "GitHub 原始碼"),
    notes: l("Notes", "筆記"),
    email: l("Email", "電子郵件"),
    backToProjects: l("Back to Projects", "回到作品列表"),
  },

  cv: {
    summary: l("Professional Summary", "專業摘要"),
    education: l("Education", "學歷"),
    experience: l("Experience", "工作經歷"),
    awards: l("Leadership & Awards", "領導與獲獎"),
    skills: l("Technical Skills", "專業技能"),
  },
} as const;
