"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Zuemen Chu — Home">
          <span className={styles.logoAccent}>ZUEMEN</span>.CHU
        </Link>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className={styles.contactBtn}
              aria-label="Jump to Contact section"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
