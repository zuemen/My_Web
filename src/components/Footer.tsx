"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick } from "@/i18n/config";
import styles from "./Footer.module.css";

interface FooterProps {
  /**
   * YYYY-MM-DD, computed by the server layout at build time. It is passed in
   * rather than computed here: this is a client component, and a module-level
   * `new Date()` would run in the visitor's browser and always show today.
   */
  lastUpdated: string;
}

const Footer = ({ lastUpdated }: FooterProps) => {
  const { lang } = useLang();
  const t = (v: { en: string; zh: string }) => pick(v, lang);
  const copyrightYear = lastUpdated.slice(0, 4);

  const externalLinks = [
    { href: "https://github.com/zuemen", label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/%E5%BB%B7%E7%BF%8A-%E6%9C%B1-95838538a/",
      label: "LinkedIn",
    },
    { href: "mailto:112306007@g.nccu.edu.tw", label: t(dict.labels.email) },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
          <Link href="/notes" className={styles.link}>
            {t(dict.labels.notes)}
          </Link>
        </div>
        <p className={styles.copy}>
          © {copyrightYear} Zuemen Chu <span lang="zh-Hant">朱廷翊</span>{" "}
          &mdash; {t(dict.labels.lastUpdated)}:{" "}
          <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
        <p className={styles.source}>
          <Link
            href="https://github.com/zuemen/My_Web"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t(dict.labels.sourceOnGitHub)}
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
