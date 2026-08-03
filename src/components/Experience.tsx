"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import styles from "./Experience.module.css";

interface ExpDetail {
  name: string;
  details?: string[];
  /** Public page a reader can verify the work against. */
  link?: { href: string; label: string };
}

interface ExpEntry {
  company: string;
  companyZh?: string;
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
    // TABEI is the association's own English name; "Taiwan Blockchain
    // Enthusiasts Association" is a back-translation of the Chinese and is not
    // what the organisation publishes under. The hackathon below is a TABEI
    // event (主辦單位), so it belongs inside this entry rather than standing
    // alone as a separate employer.
    company: "Taiwan Association for Blockchain Ecosystem Innovation (TABEI)",
    companyZh: "臺灣區塊鏈愛好者協會",
    role: "Intern",
    period: "2026",
    location: "Taipei",
    projects: [
      {
        name: "Trustworthy AI Hackathon 2026 — Organizing Team",
        details: [
          "Led planning and operations for the three-day event (Aug 29–31, 2026) at N24 Taipei Ark, with a USD 12,000+ prize pool across six industry challenge tracks.",
          "Built and shipped the official event website.",
        ],
        link: { href: "https://hackathon.chain.tw/", label: "hackathon.chain.tw" },
      },
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className={styles.experience}>
      <div className="section-container">
        <SectionHeading
          eyebrow="Where I've worked"
          title="Professional Experience"
          as="h1"
        />

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
                    <h2 className={styles.company}>
                      {exp.company}
                      {exp.companyZh && (
                        <span className={styles.companyZh} lang="zh-Hant">
                          {exp.companyZh}
                        </span>
                      )}
                    </h2>
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
                        <h3 className={styles.projectName}>
                          <ChevronRight size={16} /> {proj.name}
                        </h3>
                        {proj.details && proj.details.length > 0 && (
                          <ul className={styles.details}>
                            {proj.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        )}
                        {proj.link && (
                          <a
                            href={proj.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.projectLink}
                          >
                            {proj.link.label}
                            <ExternalLink size={12} />
                          </a>
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
