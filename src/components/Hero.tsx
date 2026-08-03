"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

const researchTags = [
  "Self-Sovereign Identity",
  "Smart Contract Security",
  "Blockchain & Fintech",
];

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.backgroundEffect} aria-hidden="true" />
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className={styles.role}>
            Research Assistant · National Chengchi University MIS
          </p>
          <h1 className={styles.name}>
            <span className="glow-text">Zuemen Chu</span>
            <span className={styles.nameChinese} lang="zh-Hant">
              朱廷翊
            </span>
          </h1>
          <div className={styles.tags} aria-label="Research areas">
            {researchTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.ctaGroup}>
            <Link href="/research" className={styles.primaryBtn}>
              See Research
            </Link>
            <Link href="/#contact" className={styles.secondaryBtn}>
              Contact
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className={styles.profileWrapper}>
            <Image
              src="/zuemen.jpg"
              alt="Profile photo of Zuemen Chu (朱廷翊)"
              width={300}
              height={450}
              priority
              sizes="(max-width: 640px) 250px, 300px"
              className={styles.profileImage}
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
            <div className={styles.orbit} aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
