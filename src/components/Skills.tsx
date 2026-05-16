"use client";

import { motion } from "framer-motion";
import { Atom, Shield, Brain, Award } from "lucide-react";
import styles from "./Skills.module.css";

interface SkillCard {
  title: string;
  icon: React.ReactNode;
  description: string;
  accentColor: string;
}

const skillData: SkillCard[] = [
  {
    title: "Quantum Finance & QML",
    icon: <Atom />,
    description:
      "Implemented QML simulations using Qiskit, exploring VQE and QAOA for financial optimization. Focused on quantum speedup potential for ML tasks in the finance domain.",
    accentColor: "var(--color-accent)",
  },
  {
    title: "Blockchain & RWA",
    icon: <Shield />,
    description:
      "Developed RWA tokenization contracts in Solidity, integrating ERC-3643 for identity-gated ownership. Researched smart contract auditing with Slither and manual review.",
    accentColor: "#7c4dff",
  },
  {
    title: "Agentic AI",
    icon: <Brain />,
    description:
      "Completed AI interdisciplinary micro-program at NCCU. Researching multi-agent system architectures and their applications in financial intelligence workflows.",
    accentColor: "#3ecf8e",
  },
  {
    title: "Digital Innovation",
    icon: <Award />,
    description:
      "Merit Award winner at the Digital Credential Innovation Challenge 2025, hosted by the Ministry of Digital Affairs, Taiwan. Architected an SSI + FHIR medical data framework.",
    accentColor: "#f5a623",
  },
];

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.heading}>Research Areas</h2>
          <div className={styles.line} />
        </motion.div>

        <div className={styles.grid}>
          {skillData.map((skill, index) => (
            <motion.div
              key={skill.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div
                className={styles.iconWrapper}
                style={{ color: skill.accentColor }}
              >
                {skill.icon}
              </div>
              <h3 className={styles.cardTitle}>{skill.title}</h3>
              <p className={styles.cardDesc}>{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
