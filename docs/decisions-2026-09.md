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
