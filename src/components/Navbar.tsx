"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className="glow-text">ZUEMEN</span>.CHU
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#skills">Skills</Link></li>
          <li><Link href="#projects">Projects</Link></li>
          <li><Link href="#contact" className={styles.contactBtn}>Contact</Link></li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
