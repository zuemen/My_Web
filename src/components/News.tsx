"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  BookOpen,
  Briefcase,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import styles from "./News.module.css";

interface NewsItem {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * A running log of milestones. Awards and competitive selections deliberately
 * live in data/awards.ts and render in the Awards section on /experience —
 * keeping them out of here stops the same five items appearing twice on the
 * site, which reads as padding.
 */
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
    title: "Completed IBM Qiskit Global Summer School 2026",
    description:
      "Finished the full core curriculum and lab exercises of IBM's Qiskit Global Summer School, covering quantum algorithms and hands-on implementation in Qiskit.",
    icon: <GraduationCap size={18} />,
  },
  {
    date: "2026.01",
    title: "Added AI + Quantum Computing (AI+QC) as a Second Research Track",
    description:
      "Took on Quantum Finance and Quantum Machine Learning as an additional research direction within the existing Research Assistant post at NCCU MIS, alongside the smart contract security work.",
    icon: <Zap size={18} />,
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

        <Link href="/experience#awards" className={styles.moreLink}>
          Awards &amp; competitions
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default News;
