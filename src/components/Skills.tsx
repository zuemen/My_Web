"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import styles from "./Skills.module.css";

interface ResearchArea {
  title: string;
  description: string;
}

const skillData: ResearchArea[] = [
  {
    title: "Blockchain & Digital Identity",
    description:
      "Building trust infrastructure on Self-Sovereign Identity standards (W3C DID, Verifiable Credentials), and extending it to identity-gated asset ownership through ERC-3643 RWA tokenization.",
  },
  {
    title: "Smart Contract Security",
    description:
      "Studying auditing methodologies for Solidity contracts — static analysis with Slither, manual review patterns, and formal verification approaches for on-chain financial systems.",
  },
  {
    title: "Quantum Finance & QML",
    description:
      "Implemented QML simulations using Qiskit, exploring VQE and QAOA for financial optimization. Focused on quantum speedup potential for ML tasks in the finance domain.",
  },
  {
    title: "Agentic AI",
    description:
      "Completed AI interdisciplinary micro-program at NCCU. Researching multi-agent system architectures and their applications in financial intelligence workflows.",
  },
];

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className="section-container">
        <SectionHeading eyebrow="What I work on" title="Research Areas" />

        <ol className={styles.list}>
          {skillData.map((area, index) => (
            <motion.li
              key={area.title}
              className={styles.item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.body}>
                <h3 className={styles.title}>{area.title}</h3>
                <p className={styles.desc}>{area.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Skills;
