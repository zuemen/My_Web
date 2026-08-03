"use client";

import { motion } from "framer-motion";
import { Mail, GitFork, LinkIcon } from "lucide-react";
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
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Get in Touch</h2>
          <div className={styles.line} />
          <p className={styles.subtitle}>
            Open for research collaborations and technical discussions.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.url.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={styles.contactItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              aria-label={`Contact via ${link.name}: ${link.label}`}
            >
              <div className={styles.iconWrapper}>{link.icon}</div>
              <div className={styles.info}>
                <span className={styles.name}>{link.name}</span>
                <span className={styles.label} lang={link.labelLang}>
                  {link.label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
