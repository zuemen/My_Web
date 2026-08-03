"use client";

import { motion } from "framer-motion";
import { Award, Zap, BookOpen, Briefcase, Trophy, BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import styles from "./News.module.css";

interface NewsItem {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const newsData: NewsItem[] = [
  {
    date: "2026.07",
    title: "Selected for Cathay Financial Holdings Internship",
    description:
      "Joining the Blockchain Technology Development Division, Digital Architecture Development Department — Hot Wallet Research Project (Sep 2026 – Jun 2027).",
    icon: <Briefcase size={18} />,
  },
  {
    date: "2026.07",
    title: "SWIFT Hackathon 2026 — Proposal Shortlisted",
    description:
      "Proposal selected by the judging panel to advance to the full solution phase.",
    icon: <Trophy size={18} />,
  },
  {
    date: "2026.05",
    title: "Nurie AI 2026 Cross-Platform Innovation Awards",
    description:
      "Certified for engineering a cross-platform application using the VaultSage server-side API.",
    icon: <BadgeCheck size={18} />,
  },
  {
    date: "2026.01",
    title: "Joined AI + Quantum Computing (AI+QC) Program",
    description:
      "Appointed as a Research Assistant focusing on Quantum Finance and Quantum Machine Learning.",
    icon: <Zap size={18} />,
  },
  {
    date: "2025.11",
    title: "Merit Award @ Digital Credential Innovation Challenge",
    description:
      "Led the team to victory in the national competition hosted by the Ministry of Digital Affairs, Taiwan.",
    icon: <Award size={18} />,
  },
  {
    date: "2025.09",
    title: "Completed AI Interdisciplinary Micro-Program",
    description:
      "Certified by the Interdisciplinary Artificial Intelligence Center, NCCU.",
    icon: <BookOpen size={18} />,
  },
];

const News = () => {
  return (
    <section className={styles.news}>
      <div className="section-container">
        <SectionHeading eyebrow="Latest" title="Recent Updates" />

        <div className={styles.timeline}>
          {newsData.map((item) => (
            <motion.div
              key={`${item.date}-${item.title}`}
              className={styles.newsItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.dateIcon}>
                <div className={styles.iconWrapper}>{item.icon}</div>
                <span className={styles.date}>{item.date}</span>
              </div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
