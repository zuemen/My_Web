"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import styles from "./Contact.module.css";

const EMAIL = "112306007@g.nccu.edu.tw";

const links = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ting-yi-chu-95838538a/", label: "Ting-Yi (Zuemen) Chu" },
  { name: "GitHub", url: "https://github.com/zuemen", label: "@zuemen" },
];

/**
 * Closes the page with one clear ask and one primary action. The email is
 * shown in full as well as linked, so it can be copied by someone whose mail
 * client isn't wired to mailto:.
 */
const Contact = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="contact" className={styles.contact}>
      <div className="section-wide">
        <div className={styles.panel}>
          <p className={styles.eyebrow}>{t(dict.sections.contactEyebrow)}</p>
          <h2 className={styles.title}>{t(dict.sections.contactTitle)}</h2>
          <p className={styles.subtitle}>{t(dict.sections.contactSubtitle)}</p>

          <div className={styles.actions}>
            <a href={`mailto:${EMAIL}`} className={styles.primary}>
              <Mail size={16} />
              {t(dict.sections.emailMe)}
            </a>
            <span className={styles.email}>{EMAIL}</span>
          </div>

          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <span className={styles.linkName}>{link.name}</span>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <ArrowUpRight size={14} className={styles.arrow} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
