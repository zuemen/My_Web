"use client";

import { motion } from "framer-motion";
import { Mail, GitFork, LinkIcon, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
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
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Get in Touch"
          subtitle="Open for research collaborations and technical discussions."
        />

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
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              aria-label={`Contact via ${link.name}: ${link.label}`}
            >
              <span className={styles.iconWrapper}>{link.icon}</span>
              <span className={styles.name}>{link.name}</span>
              <span className={styles.label} lang={link.labelLang}>
                {link.label}
              </span>
              <ArrowUpRight className={styles.arrow} size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
