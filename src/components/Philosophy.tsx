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
              I am a <strong>Management Information Systems</strong> student at National Chengchi University (NCCU) with a passion for 
              <strong> Artificial Intelligence</strong>, <strong>Secure Digital Identity</strong>, and <strong>Quantum Computing</strong>.
            </p>
            <p>
              Experienced in backend development and system integration, I focus on bridging the gap between 
              social institutional needs and hard tech. My current research explores 
              <strong> Smart Contract Security</strong>, <strong>Quantum-Classical Hybrid Systems</strong>, 
              and the legal compliance of <strong>ERC-3643</strong> in RWA tokenization.
            </p>
            <p>
              My journey is driven by a simple question: 
              <em>"How can we continuously learn and apply new technologies to build digital trust in real-world systems?"</em>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
