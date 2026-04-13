"use client";

import { motion } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import styles from './Experience.module.css';

const expData = [
  {
    company: "National Chengchi University (NCCU)",
    role: "Research Assistant",
    period: "Sep 2023 - Present",
    projects: [
      {
        name: "Smart Contract Security and Auditing Mechanism Research",
        details: [
          "Conducting comprehensive literature reviews on smart contract security and auditing frameworks.",
          "Assisting with administrative support and research coordination for the research initiative."
        ]
      },
      {
        name: "AI + Quantum Computing (AI+QC) Research and Development Program",
        details: [
          "Assisting with literature review and research support for quantum-classical hybrid systems.",
          "Supporting system development and documentation for the research initiative."
        ]
      }
    ]
  }
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
          <h2 className="glow-text">PROFESSIONAL EXPERIENCE</h2>
          <div className={styles.line}></div>
        </motion.div>

        <div className={styles.expList}>
          {expData.map((exp, idx) => (
            <motion.div 
              key={idx}
              className={styles.expCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.cardHeader}>
                <Briefcase className={styles.icon} size={24} />
                <div>
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.roleTitle}>{exp.role} <span className={styles.period}>| {exp.period}</span></p>
                </div>
              </div>
              
              <div className={styles.projectList}>
                {exp.projects.map((proj, pIdx) => (
                  <div key={pIdx} className={styles.projectItem}>
                    <h4 className={styles.projectName}>
                      <ChevronRight size={16} /> {proj.name}
                    </h4>
                    <ul className={styles.details}>
                      {proj.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
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
