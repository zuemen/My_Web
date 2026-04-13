"use client";

import { motion } from 'framer-motion';
import styles from './Philosophy.module.css';

const Philosophy = () => {
  return (
    <section id="about" className={styles.philosophy}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="glow-text">ABOUT ME & RESEARCH PHILOSOPHY</h2>
          <div className={styles.textBlock}>
            <p>
              I am a <strong>Management Information Systems</strong> student at National Chengchi University (NCCU) with a profound interest in 
              <strong> Artificial Intelligence</strong>, <strong>Quantum Computing</strong>, and <strong>Blockchain Technology</strong>.
            </p>
            <p>
              My research and practical interests are focused on specific frontiers: 
              <strong> AI Agents</strong> within the realm of Artificial Intelligence, 
              <strong> Quantum Finance</strong> and <strong>Quantum Machine Learning (QML)</strong> in the quantum domain, 
              and the intersection of <strong>Smart Contracts</strong> and <strong>Real World Assets (RWA)</strong> in blockchain ecosystems.
            </p>
            <p>
              My journey is driven by a simple question: 
              <em>"How can we integrate these emerging technologies to redefine digital trust and efficiency in modern systems?"</em>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
