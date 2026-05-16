"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import styles from "./Experience.module.css";

interface ExpDetail {
  name: string;
  details: string[];
}

interface ExpEntry {
  company: string;
  role: string;
  period: string;
  projects: ExpDetail[];
}

const expData: ExpEntry[] = [
  {
    company: "National Chengchi University (NCCU)",
    role: "Research Assistant",
    period: "2026 – Present",
    projects: [
      {
        name: "Smart Contract Security and Auditing Mechanism Research",
        details: [
          "Maintained research notes and managed reading lists for the smart contract security group, covering auditing techniques including Slither static analysis and manual code review.",
          "Studied Solidity contract architecture and ERC-3643 compliance patterns for identity-gated RWA tokenization systems.",
        ],
      },
      {
        name: "AI + Quantum Computing (AI+QC) Research and Development Program",
        details: [
          "Reviewed literature on quantum finance and QML, focusing on VQE and QAOA algorithms implemented with Qiskit and PennyLane.",
          "Documented quantum-classical hybrid system architectures and assisted with experiment logging for ongoing research programs.",
        ],
      },
    ],
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
          {expData.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              className={styles.expCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.cardHeader}>
                <Briefcase className={styles.icon} size={24} />
                <div>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.roleTitle}>
                    {exp.role}
                    {exp.period && (
                      <span className={styles.period}> · {exp.period}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className={styles.projectList}>
                {exp.projects.map((proj) => (
                  <div key={proj.name} className={styles.projectItem}>
                    <h4 className={styles.projectName}>
                      <ChevronRight size={16} /> {proj.name}
                    </h4>
                    <ul className={styles.details}>
                      {proj.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
