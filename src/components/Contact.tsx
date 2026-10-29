"use client";

import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { LINKEDIN_URL } from "@/data/site";
import styles from "./Contact.module.css";

interface ContactLink {
  name: string;
  url: string;
  label: string;
  /** Set when the label isn't English, so screen readers switch voice. */
  labelLang?: string;
}

const contactLinks: ContactLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/zuemen",
    label: "@zuemen",
  },
  {
    name: "LinkedIn",
    url: LINKEDIN_URL,
    label: "Ting-Yi Chu",
  },
  {
    name: "Email",
    url: "mailto:112306007@g.nccu.edu.tw",
    label: "112306007@g.nccu.edu.tw",
  },
];

const Contact = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="contact" className={styles.contact}>
      <div className="section-container">
        <SectionHeading
          title={t(dict.sections.getInTouch)}
          subtitle={t(dict.sections.contactSubtitle)}
        />

        <ul className={styles.list}>
          {contactLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target={link.url.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.url.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={styles.contactItem}
                aria-label={`${link.name}: ${link.label}`}
              >
                <span className={styles.name}>{link.name}</span>
                <span className={styles.label} lang={link.labelLang}>
                  {link.label}
                </span>
                <ArrowUpRight
                  className={styles.arrow}
                  size={16}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Contact;
