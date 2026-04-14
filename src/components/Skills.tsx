"use client";

import { motion } from 'framer-motion';
import { Atom, Shield, Brain, Award } from 'lucide-react';
import styles from './Skills.module.css';

const skillData = [
  {
    title: "Quantum Finance & QML",
    icon: <Atom />,
    description: "Actively exploring Qiskit & PennyLane. Focusing on Quantum Finance and Quantum Machine Learning (QML) applications.",
    color: "var(--accent-cyan)"
  },
  {
    title: "Blockchain & RWA",
    icon: <Shield />,
    description: "Researching Real World Asset (RWA) tokenization and smart contract ecosystems for modern financial systems.",
    color: "var(--accent-purple)"
  },
  {
    title: "Agentic AI",
    icon: <Brain />,
    description: "Completed advanced coursework in AI applications. Passionate about researching OpenClaw and its impact on financial intelligence.",
    color: "var(--accent-blue)"
  },
  {
    title: "Digital Innovation",
    icon: <Award />,
    description: "Merit Award winner in the competition hosted by the Ministry of Digital Affairs, Taiwan. Exploring SSI and VC standards.",
    color: "#ffcc00"
  }
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
          <h2 className="glow-text">RESEARCH MATRIX</h2>
          <div className={styles.line}></div>
        </motion.div>

        <div className={styles.grid}>
          {skillData.map((skill, index) => (
            <motion.div 
              key={index}
              className={`${styles.card} glass-card`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, borderColor: skill.color }}
            >
              <div className={styles.iconWrapper} style={{ color: skill.color }}>
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
