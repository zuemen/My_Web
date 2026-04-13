"use client";

import { motion } from 'framer-motion';
import { Cpu, Zap, Link, Binary } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundEffect}></div>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.greeting}>QUANTUM & BLOCKCHAIN RESEARCHER</h2>
          <h1 className={styles.name}>
            <span className="glow-text">朱廷翊</span> zuemen
          </h1>
          <p className={styles.tagline}>
            <strong>National Chengchi University | MIS & AI Interdisciplinary Micro-Program</strong><br/>
            Researching Smart Contract Security, Quantum Computing (AI+QC), and Self-Sovereign Identity (SSI/DID).
          </p>
          
          <div className={styles.ctaGroup}>
            <a href="#projects" className={styles.primaryBtn}>Research Archives</a>
            <a href="#about" className={styles.secondaryBtn}>Core Philosophy</a>
          </div>
        </motion.div>

        <motion.div 
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.profileWrapper}>
            <img src="/zuemen.jpg" alt="zuemen" className={styles.profileImage} />
            <div className={styles.orbit}></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
