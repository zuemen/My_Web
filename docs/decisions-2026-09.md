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

## 2026-09-29 — 政大研究經歷拆成兩筆（指導教授寫錯的修正）

**錯誤**：網站把 AI+QC 與智慧合約研究合成一筆，只掛莊豐源一位老師，等於把 AI+QC 寫到錯的教授底下。

**依據**（逐份讀過「申學用」資料夾 40 個檔案；GRE 題本除外）：
- `進用.png`（政大研究計畫人員進用證明單，2026/03/22 列印）：計畫「AI+QC研發推動計畫」，主持人蔡瑞煌，聘期 2026/01/01–2026/12/31。同一張單也嵌在 `量子計畫初版.docx` 附圖二。
- 蔡瑞煌英文拼法 Rua-Huan Tsaih，依政大資管系英文師資頁。
- 智慧合約研究：指導教授莊豐源，期間 May 2025 – Dec 2026，依本人 9/23 版履歷；莊豐源職稱「助理教授」依 `證明.pdf`（國科會大專生計畫申請書）。

**改動**：
- `experience.ts` 拆成兩筆：AI+QC（計畫主持人蔡瑞煌，2026/01–2026/12）與智慧合約（指導教授莊豐源，2025/05–2026/12）。新增 `pi` 欄位與「計畫主持人」標籤。
- 職稱中英文都寫「研究助理 / Research Assistant」——本人指定，雖然進用單上寫的是「研究獎助生」。
- AI+QC 中文計畫名改為進用單原文「AI+QC研發推動計畫」。
- 2026.01 動態原本寫「在既有研究助理職位下新增研究方向」，改為獨立聘任。Philosophy 的「my lab's AI+QC program」改為寫明蔡瑞煌教授主持。
- 微學程英文依修業證明改為 Interdisciplinary Artificial Intelligence Micro Program。
- 數位發展部獎項英文補上 Student Division（獎狀原文「學生組優選」）。
- 進用單上的計畫編號、津貼等欄位不寫進 repo（本人對外版本已遮蔽）。

## 2026-10-08 — 改寫給投資人／新創讀者：主張先行、實際重播、三條主線

**讀者**：本人指定主要讀者改為區塊鏈領域的投資與新創角色。

**定位**：首頁從「學生研究者」改為「替會動用資金的 AI agent 打造信任基礎設施」。Hero 先放主張、再放名字；下方證據列四項數字皆可由 `src/data/projects.ts` 加總：
- 31 支原始碼驗證合約 = Agent Passport 12（Monad Sourcify）＋ Mandate Layer 17（Blockscout／Sourcify）＋ CarbonLEI 2（Etherscan）。
- 2,800+ 測試 = 147 ＋ 773 ＋ 717 ＋ 592 ＋ 572（各 README 自述，不含前端測試）。
- 7 次鏈上拒絕 = 重播中有交易連結、且在鏈上 revert 的步驟（AP 4、ML 2、CarbonLEI 1）。

**作品依三條主線分組**（`src/data/tracks.ts`）：Agent 授權（Agent Passport、Mandate Layer、PepeFi）、組織身分（CarbonLEI、Evidence at Source、mcp-vlei、PepeLab、ChainTrust）、可解釋風控（ChainLens、SME Lens）；RWA 與 QML 移到「早期作品」。

**動畫重播**（`src/components/demos/`）：不是錄影，而是依 repo 內的執行紀錄逐步重播——金額、上限、revert 原因與交易雜湊皆直接取自：
- `agent-passport/demo/public/runs/latest.json`
- `mandate-layer/demo/RUN.md`
- `carbon-lei/README.md`（Live run 表）
- `mcp-vlei` Trust Console 場景（本機，無交易）
- `ChainLens/web/src/api/screening-snapshot.json`（MIT，同作者；排版演算法移植自 `replayLayout.ts`）

每段重播都必附說明文字（測試網、合成資料、虛構身分等但書），減少動態偏好者不自動播放。

**競賽擺放**：獎項掛在作品卡上（badge）；首頁「由評審決定的結果」只放有評審結果的四項；另列「正在參賽」（Colosseum 10/12 截止、IEEE ClimateChain 11/20 公布）——結果公布後要更新 `Recognition.tsx` 的 `PENDING` 與對應專案的 badge。

**其他**：導覽改為 Work／Experience／About／CV；新增 `/projects/[slug]` 案例頁模板（6 個）；footer 與內容對齊、移除空的 Notes 連結；Notes 頁移除已過期的「2026 Q3」；黑客松總獎金依官網更正為 USD 14,000+（含特別獎）。

**刻意不放**：PepeFi 僅列為輔助（repo 有匿名審查護欄、授權待律師審閱，待本人確認）；qc_gemini 的「量子加速」圖（未實際執行古典蒙地卡羅）；2LQNN（需教授同意）；私人 repo。
