"use client";

import { useLang } from "@/i18n/LanguageProvider";
import styles from "@/app/notes/page.module.css";

const NotesContent = () => {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <div className={styles.container}>
      <p className={styles.label}>{en ? "In progress" : "撰寫中"}</p>
      <h1 className={styles.title}>{en ? "Notes" : "筆記"}</h1>
      <p className={styles.subtitle} lang={en ? "en" : "zh-Hant"}>
        {en
          ? "Short essays on agent payments, verifiable identity and on-chain compliance will live here."
          : "這裡會放關於 agent 支付、可驗證身分與鏈上法遵的短文。"}
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
