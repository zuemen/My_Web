"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import styles from "./Experience.module.css";

interface ExpDetail {
  name: string;
  details?: string[];
}

interface ExpEntry {
  company: string;
  division?: string;
  role?: string;
  period: string;
  location?: string;
  advisor?: { name: string; nameZh?: string };
  projects?: ExpDetail[];
  notes?: string[];
}

const expData: ExpEntry[] = [
  {
    // Confidentiality: list the unit, project name and period only.
    // Do not add scope, architecture or any internal detail to this entry.
    company: "Cathay Financial Holdings",
    division:
      "Blockchain Technology Development Division, Digital Architecture Development Department",
    role: "Blockchain Intern",
    period: "Sep 2026 – Jun 2027",
    location: "Taipei",
    projects: [{ name: "Hot Wallet Research Project" }],
  },
  {
    company: "National Chengchi University, MIS",
    role: "Research Assistant",
    period: "May 2025 – Feb 2026",
    advisor: { name: "Prof. Feng-Yuan Chuang", nameZh: "莊豐源" },
    projects: [
      { name: "Smart Contract Security and Auditing Mechanism Research" },
      { name: "AI + Quantum Computing (AI+QC) Research and Development Program" },
    ],
    notes: [
      "Literature review, research analysis, system development, technical documentation",
    ],
  },
  {
    company: "Taiwan Blockchain Enthusiasts Association",
    role: "Intern",
    period: "2026",
    location: "Taipei",
  },
  {
    company: "Hackathon Organizer",
    division: "USD 12,000 prize pool",
    period: "Aug 29–31, 2026",
    notes: ["Led planning and operations"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Professional Experience</h2>
          <div className={styles.line} />
        </motion.div>

        <div className={styles.expList}>
          {expData.map((exp) => {
            const meta = [exp.role, exp.period, exp.location]
              .filter(Boolean)
              .join(" · ");

            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                className={styles.expCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardHeader}>
                  <Briefcase className={styles.icon} size={24} />
                  <div>
                    <h3 className={styles.company}>{exp.company}</h3>
                    {exp.division && (
                      <p className={styles.division}>{exp.division}</p>
                    )}
                    <p className={styles.roleTitle}>{meta}</p>
                    {exp.advisor && (
                      <p className={styles.advisor}>
                        Advisor: {exp.advisor.name}
                        {exp.advisor.nameZh && (
                          <>
                            {" ("}
                            <span lang="zh-Hant">{exp.advisor.nameZh}</span>
                            {")"}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {exp.projects && exp.projects.length > 0 && (
                  <div className={styles.projectList}>
                    {exp.projects.map((proj) => (
                      <div key={proj.name} className={styles.projectItem}>
                        <h4 className={styles.projectName}>
                          <ChevronRight size={16} /> {proj.name}
                        </h4>
                        {proj.details && proj.details.length > 0 && (
                          <ul className={styles.details}>
                            {proj.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {exp.notes && exp.notes.length > 0 && (
                  <ul className={`${styles.details} ${styles.notes}`}>
                    {exp.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
