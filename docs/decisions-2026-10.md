# 決策紀錄 2026-10

## 10/12 作品 demo 影片

| 項目 | 決定 | 理由 |
|---|---|---|
| 影片來源 | 全部是真實瀏覽器操作錄影（Playwright＋DevTools screencast），不做合成畫面 | 作品頁要讓人看到作品本身長什麼樣 |
| 旁白 | 英文 TTS（edge-tts `en-US-AndrewNeural`，-10%），第三人稱；中英 WebVTT 字幕，依網站語言預設 | 與 mcp-vlei 示範片同一個聲音；網站預設英文、可切中文 |
| 首頁卡片 | 只播 15 秒無聲預覽（約 0.5 MB），進入畫面才播放、減少動態偏好時不播 | 完整片 7–11 MB，不能讓首頁自動下載 |
| /projects | 完整配音片，`preload="none"`＋封面，點了才載入 | 同上 |
| 檔案位置 | `public/videos/<name>.*`；錄影腳本與原始檔在本機作品資料夾（不進 repo） | 網站只放成品 |
| 收錄作品 | ChainLens、Evidence at Source、PepeFi、Mandate Layer（新增）、Agent Passport（新增） | 有可公開操作的 demo，且勘查可錄 |
| ChainLens 描述 | 改成雙引擎現況：GraphSAGE 第二引擎只能把放行升為加強審查；合成劇本；模型未在真實標註資料驗證 | 舊描述「GNN 不接入即時審查」與線上 demo 矛盾 |
| PepeFi 描述 | 主軸改為參照 RWA 的合成 CFD＋可驗證憑證准入＋agent session；demo 改連 pepelab-rwa-poc；拿掉分潤路由與「唯一上鏈專案」 | rwa-poc 是最新版合約；路由在該部署未執行；其他作品也已上鏈 |
| PepeFi 錄影 | 用全新示範錢包在 Base Sepolia 送真實開倉／平倉；sGOLD 被 `NotKycVerified` 擋的那筆在錄影前直接送進合約，片中以區塊瀏覽器呈現並在旁白說明 | 前端遇到 sGOLD 會先停用下單鈕，UI 送不出 |
| Evidence at Source | 錄影前把示範資料的真實銀行名換成虛構「示範商業銀行」（evidence-at-source b12b975） | 示範不應冒用真實機構 |

## 10/12 晚 改成動畫解說版

| 項目 | 決定 | 理由 |
|---|---|---|
| 影片形式 | 6 支全部換成動畫解說版：動畫解釋、真實錄影片段證明（比照 mcp-vlei 示範動畫） | 使用者覺得純操作錄影「太硬核」 |
| 新增 MedSSI 影片 | 原「PepeLab」卡改名 MedSSI（隊名 PepeLab），網址 /projects/pepelab 不變 | PepeLab 是隊名，作品名是 MedSSI |
| MedSSI 素材 | 2026 本機重跑 2025 程式碼的故事頁＋2025 年數位部沙盒錄影；沙盒片段裁掉 deep link，逐格確認無 token | 原始錄影有 token 明文時段 |
| 誠實標示 | 動畫角落標 Illustration；真實片段標 Real recording，並分 on-chain／simulation (eth_call)／live read | 對抗式審查要求模擬與上鏈分開 |
| 字幕 | 英文模式預設不開字幕（英文旁白，畫面已有標題與說明）；中文模式預設中文字幕 | 避免畫面過擠 |
| 檔案大小 | 6 支各 4–5 MB（原錄影版 7–11 MB） | 動畫畫面壓縮率高 |

## 10/12 夜 排版改版（使用者：「有點太醜」）

依 taste-redesign-skill 的流程（掃描 → 診斷 → 在既有架構上針對性修改），**維持 9/22 的深色決定**（米白版曾被否決）。

| 問題 | 改法 |
|---|---|
| 米白動畫影片放在深色網站上，像貼上去的投影片 | 6 支動畫解說片改用網站自己的配色（`#0a0a0b` 底、`#ecebe6` 字、鋼藍 `#9bb6d8`、通過綠／拒絕橘／警告黃）重新渲染；米白版另存 |
| /projects 左側 240px 標題欄把作品擠成窄條，每個作品又是面板＋成果框＋一排 pill | 標題放上方（section-wide）；每個作品＝標題列 → 全寬影片 → 說明＋右側事實欄（成果／技術／連結）；不用面板與 pill，改用分隔線與留白；有影片就不顯示照片 |
| /research 內容鎖在左側 760px，右半空白 | 寬螢幕改兩欄：左標題、右文字（68ch） |
| /experience 與獎項每筆一個框、框中有框、連結是 pill | 去框，時間軸與分隔線承擔結構；連結改成底線文字連結 |
| MedSSI 案例頁每節一個框，示範圖是投影幕翻拍照 | 去框改分隔線；示範區換成 MedSSI 動畫影片 |
| 首頁作品區右上角帶 AI 味的漸層光暈 | 拿掉 |
| 標題斷行不平均、段落最後一行孤字 | 全站 `text-wrap: balance`（標題）／`pretty`（段落） |
| 首頁作品卡都連到 /projects 頂端 | 改連 `/projects#<slug>` 直達該作品 |
