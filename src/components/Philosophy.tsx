"use client";

import { motion } from "framer-motion";
import styles from "./Philosophy.module.css";

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
          <h2 className={styles.heading}>About Me &amp; Research Philosophy</h2>
          <div className={styles.textBlock}>
            <p>
              I am a <strong>Management Information Systems</strong> student at
              National Chengchi University (NCCU) working on{" "}
              <strong>blockchain trust infrastructure</strong> &mdash;{" "}
              <strong>Self-Sovereign Identity</strong>,{" "}
              <strong>Smart Contract Security</strong>, and their application
              in fintech.
            </p>
            <p>
              My work bridges the gap between social institutional needs and
              hard tech. Current research spans decentralized identity
              standards (<strong>W3C DID</strong> and{" "}
              <strong>Verifiable Credentials</strong>), auditing methodologies
              for Solidity contracts, and the legal compliance of{" "}
              <strong>ERC-3643</strong> in RWA tokenization. I also keep an
              adjacent interest in <strong>quantum finance and QML</strong>,
              explored through coursework and my lab&rsquo;s AI+QC program.
            </p>
            <p>
              I approach research with the belief that emerging technology
              becomes transformative only when it intersects with real
              institutional constraints &mdash; regulatory frameworks,
              interoperability standards, and human-centered design.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
