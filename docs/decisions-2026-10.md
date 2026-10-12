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
