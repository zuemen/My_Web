# 網站更新決策紀錄 — 2026-09

## 事實來源
- 職稱、日期、獎項以信件為準（2026-09-17 唯讀掃描），不以口述或 update pack 為準。
- demo 連結上線前必須 curl 回 200。
- README 與 repo description 衝突時以 README 為準（ChainLens 的 GNN 只是離線基準）。

## 已定案
| 項目 | 決定 | 依據 |
|---|---|---|
| 國泰職稱 | Project Management Intern, TBA Program；區塊鏈技術發展科 | 7/22 面試結果、7/30 人資錄取信；技術實習生另一職缺未錄取 |
| 國泰內容 | 只寫單位／職稱／專案名／期間 | 保密 |
| TABEI | Intern，2026/06 起 | 6/17 報到 |
| ETHTaipei 2026 | Event Staff，9/13–14 | 官網標題；本人口述身分 |
| 政大金科實驗室 | 第一屆幹部，2026/06 起 | 6/28 錄取信 |
| 台北金融科技獎 | 金融創新獎校園組 入圍決審（ChainLens） | 9/17 入圍通知；10/7 公告結果後更新 `awards.ts` |
| 新增作品 | ChainLens、PepeFi On-Chain CFD | 可驗證（demo 200、公開 repo） |
| 暫不加入 | ChainTrust（前端掛）、E1/2LQNN（需教授同意）、Qiskit J1-J2（無公開成果）、Global TrustDrive（深度較淺） | |
| 照片 | ETHTaipei、黑客松單人照、SWIFT 通知截圖 | 皆無第三方入鏡；EXIF 已清除 |
| 資料單一來源 | `src/data/{experience,awards,projects}.ts`；CV 頁讀同一份 | 曾發生兩頁不同步 |
| i18n | 字典 + `useSyncExternalStore` 讀 localStorage；SSR 固定英文 | 爬蟲與無 JS 訪客拿到英文 |
| 設計 | IBM Plex Sans 取代 Inter；accent #e0a253；圓角 2–4px | 去模板感 |

## 待決（不可自行處理）
### 可信 AI 黑客松：主辦與參賽的利益衝突
信件證實本人同時是 TABEI 實習生（參與比賽辦法修訂、握有他隊報名附件存取權）與參賽者（季軍 USD 1,000 + GLEIF 感謝狀），信中無迴避聲明。
- 網站目前仍寫「Ran the intake and selection pipeline」「judging rules」，且未列季軍。
- 在本人決定揭露方式前：不加入季軍／GLEIF 獎項、不加入 Evidence at Source 作品、不改寫既有籌辦文字。

## 本機明文金鑰（僅回報，未處理）
- `C:\Users\sanketsu\Global_TrustDriv\.env`：VAULTSAGE_API_KEY、DEPLOYER_PRIVATE_KEY（已 gitignore，未上 GitHub）
