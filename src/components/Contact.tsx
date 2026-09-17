"use client";

import { Mail, GitFork, LinkIcon, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import styles from "./Contact.module.css";

interface ContactLink {
  name: string;
  icon: React.ReactNode;
  url: string;
  label: string;
  /** Set when the label isn't English, so screen readers switch voice. */
  labelLang?: string;
}

const contactLinks: ContactLink[] = [
  {
    name: "GitHub",
    icon: <GitFork size={24} />,
    url: "https://github.com/zuemen",
    label: "@zuemen",
  },
  {
    name: "LinkedIn",
    icon: <LinkIcon size={24} />,
    url: "https://www.linkedin.com/in/%E5%BB%B7%E7%BF%8A-%E6%9C%B1-95838538a/",
    label: "廷翊 朱",
    labelLang: "zh-Hant",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
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
          eyebrow={t(dict.sections.contactEyebrow)}
          title={t(dict.sections.getInTouch)}
          subtitle={t(dict.sections.contactSubtitle)}
        />

        <div className={styles.grid}>
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.url.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={styles.contactItem}
              aria-label={`Contact via ${link.name}: ${link.label}`}
            >
              <span className={styles.iconWrapper}>{link.icon}</span>
              <span className={styles.name}>{link.name}</span>
              <span className={styles.label} lang={link.labelLang}>
                {link.label}
              </span>
              <ArrowUpRight className={styles.arrow} size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
