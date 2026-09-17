"use client";

import { useLang } from "@/i18n/LanguageProvider";
import styles from "@/app/notes/page.module.css";

const NotesContent = () => {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <div className={styles.container}>
      <p className={styles.label}>{en ? "// coming soon" : "// 即將推出"}</p>
      <h1 className={styles.title}>{en ? "Notes" : "筆記"}</h1>
      <p className={styles.subtitle} lang={en ? "en" : "zh-Hant"}>
        {en
          ? "Reading notes and short essays on Quantum Finance and Smart Contract Security will live here. The first post is planned for 2026 Q3."
          : "這裡會放關於 Quantum Finance 與 Smart Contract Security 的閱讀筆記與短文。第一篇預計 2026-Q3 上線。"}
      </p>
      <p className={styles.rssNote}>
        {en
          ? "RSS feed will be available when the first post publishes."
          : "第一篇文章發布後將提供 RSS 訂閱。"}
      </p>
    </div>
  );
};

export default NotesContent;
