# 網站更新決策紀錄 — 2026-09

## 事實來源
- 職稱、日期、獎項以信件為準（2026-09-17 唯讀掃描），不以口述或 update pack 為準。
- demo 連結上線前必須 curl 回 200。
- README 與 repo description 衝突時以 README 為準（ChainLens 的 GNN 只是離線基準）。

## 已定案
| 項目 | 決定 | 依據 |
|---|---|---|
| 國泰職稱 | 國泰金控 數位數據暨科技發展中心 數位架構發展部／區塊鏈技術發展科 專案管理實習生（本人指定寫法） | 7/22 面試結果、7/30 人資錄取信；技術實習生另一職缺未錄取 |
| 國泰內容 | 只寫單位／職稱／專案名／期間 | 保密 |
| TABEI | Intern，2026/06 起 | 6/17 報到 |
| ETHTaipei 2026 | Event Staff，9/13–14 | 官網標題；本人口述身分 |
| 政大金融科技社 | NCCU FinTech Club 第一屆幹部，2026/06 起（信件原名「金融科技創新實驗室」，本人指定改稱金融科技社；英文名查無官方寫法） | 6/28 錄取信 |
| 台北金融科技獎 | 金融創新獎校園組 入圍決審（ChainLens） | 9/17 入圍通知；10/7 公告結果後更新 `awards.ts` |
| 新增作品 | ChainLens、PepeFi On-Chain CFD | 可驗證（demo 200、公開 repo） |
| 暫不加入 | ChainTrust（前端掛）、E1/2LQNN（需教授同意）、Qiskit J1-J2（無公開成果）、Global TrustDrive（深度較淺） | |
| 照片 | ETHTaipei、黑客松單人照、SWIFT 通知截圖 | 皆無第三方入鏡；EXIF 已清除 |
| 資料單一來源 | `src/data/{experience,awards,projects}.ts`；CV 頁讀同一份 | 曾發生兩頁不同步 |
| i18n | 字典 + `useSyncExternalStore` 讀 localStorage；SSR 固定英文 | 爬蟲與無 JS 訪客拿到英文 |
| 設計（9/18 改版） | 淺色期刊風：紙色底 #f5f2ea、墨黑字、酒紅 accent #8a2b1d；內文 Newsreader、介面 IBM Plex Sans；區塊左欄標題右欄內容；移除卡片、icon 與捲動淡入 | 深色＋琥珀金讀起來像加密貨幣模板；前幾輪改版未實際截圖驗證，本輪以 Playwright 截圖逐頁確認 |

## 可信 AI 黑客松（本人已決定，2026-09-17）
- 不提名次與主辦／參賽雙重身分。
- 只寫「Evidence at Source 獲 GLEIF 感謝獎」，不連結 GLEIF 證書 PDF（證書內文點名該黑客松）。
- 籌辦條目的成果句移除 GLEIF 字樣，因該獎實際頒給本人專案。

## 本機明文金鑰（僅回報，未處理）
- `C:\Users\sanketsu\Global_TrustDriv\.env`：VAULTSAGE_API_KEY、DEPLOYER_PRIVATE_KEY（已 gitignore，未上 GitHub）

## 學程時間
- 金融科技專長學程只寫「2026 錄取」，不寫學期代碼（本人指定）。

## 2026-09-22 — 回到深色、去 AI 味

- **底色還原為原本的 `#0a0a0b`**（surface `#111114` / `#17171c`、border `#222228`，與最初版本相同）。米白紙＋酒紅版被否決。
- **「AI 味」的來源不是深色本身**，而是深色上常見的附加物：光暈、漸層、飽和霓虹色、所有標籤都塗品牌色。因此：
  - 配色近乎單色：暖白 `#ecebe6` 字、灰階分隔線。
  - 唯一強調色改為去飽和鋼藍 `#9bb6d8`（延續原本的藍色系，但不刺眼），只用在連結、目前頁、focus、成果標記。
  - eyebrow、分類、section 標題改用中性灰 `--color-label`，不再用強調色。
  - 研究領域拿掉 01–04 編號（四個領域沒有先後，編號只是模板習慣）。
- **字體**：內文改 IBM Plex Sans 16px（細襯線在深底小字會糊），Newsreader 只留給標題與 hero 引言。
- 列印樣式維持白底黑字；OG 圖同步改為深色。

## 2026-09-23 — 首頁補上 Web3 / x402 貢獻

- 首頁 hero 加第二段：agent 身分、session 為界的交易授權、x402 付費訊號 API（USDC 結算、收入上鏈分潤、Base Sepolia 測試網）。字級比襯線引言小一級，維持單一最大聲的一行。
- hero 標籤加第四項 Agent Payments (x402)；分隔斜線改成 `::after`，避免換行時行首出現孤立的「/」。
- 研究領域「Agentic AI」改為「Agentic AI & Agent Payments」，寫明 did:pkh agent DID + 授權 VC、session 權限、x402 機器支付；措辭為「對標 ERC-8004 / 8183 草案」而非宣稱合規。
- PepeFi 專案描述補上 x402 的付款路徑：HTTP 上以 USDC 付款 → facilitator 鏈上結算 → 路由合約分潤。
- metadata description / keywords / OG / Twitter 補 x402、Agent Payments。
- 事實來源：`pepelab_onchain_cfd/docs/AGENT_ECONOMY_STANDARDS.md`、`CAPSTONE_DELIVERABLES.md`、`VERIFICATION_REPORT.md`、`DESIGN_x402_AI_AGENT.md`。測試網、非真實資產的但書全數保留。
