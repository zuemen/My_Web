"use client";

import { motion } from 'framer-motion';
import { Calendar, Award, Zap, BookOpen } from 'lucide-react';
import styles from './News.module.css';

const newsData = [
  {
    date: "2026.04",
    title: "Joined AI + Quantum Computing (AI+QC) Program",
    description: "Appointed as a Research Assistant focusing on Quantum Algorithm implementation.",
    icon: <Zap size={18} />
  },
  {
    date: "2025.11",
    title: "Merit Award @ Digital Credential Innovation Challenge",
    description: "Led the team to victory in the national competition hosted by moda.",
    icon: <Award size={18} />
  },
  {
    date: "2025.09",
    title: "Completed AI Interdisciplinary Micro-Program",
    description: "Certified by the Interdisciplinary Artificial Intelligence Center, NCCU.",
    icon: <BookOpen size={18} />
  }
];

const News = () => {
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="glow-text">RECENT UPDATES</h2>
          <div className={styles.line}></div>
        </motion.div>

        <div className={styles.timeline}>
          {newsData.map((item, index) => (
            <motion.div 
              key={index}
              className={styles.newsItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
