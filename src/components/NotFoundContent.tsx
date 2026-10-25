"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import styles from "@/app/not-found.module.css";

const NotFoundContent = () => {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <div className={styles.container}>
      <p className={styles.label}>{"// 404"}</p>
      <h1 className={styles.title}>{en ? "Page not found" : "找不到這個頁面"}</h1>
      <p className={styles.subtitle} lang={en ? "en" : "zh-Hant"}>
        {en
          ? "The link may be old, or the page has moved. The projects and the CV are a click away."
          : "連結可能已經過期，或頁面搬家了。作品與履歷都在下面。"}
      </p>
      <p className={styles.links}>
        <Link href="/" className={styles.link}>
          {en ? "Home" : "首頁"}
        </Link>
        <Link href="/projects" className={styles.link}>
          {en ? "Projects" : "作品"}
        </Link>
        <Link href="/cv" className={styles.link}>
          {en ? "CV" : "履歷"}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundContent;
