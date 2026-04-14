"use client";

import { motion } from 'framer-motion';
import { Briefcase, ChevronRight } from 'lucide-react';
import styles from './Experience.module.css';

const expData = [
  {
    company: "National Chengchi University (NCCU)",
    role: "Research Assistant",
    period: "",
    projects: [
      {
        name: "Smart Contract Security and Auditing Mechanism Research",
        details: [
          "Assisting with administrative tasks and project coordination within the research group.",
          "Building foundational knowledge in blockchain technology and smart contract principles."
        ]
      },
      {
        name: "AI + Quantum Computing (AI+QC) Research and Development Program",
        details: [
          "Assisting with literature review and research support, with a focus on applications in quantum finance and quantum machine learning.",
          "Supporting the documentation and administrative aspects of quantum-classical hybrid systems research."
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
                  <p className={styles.roleTitle}>{exp.role}</p>
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
