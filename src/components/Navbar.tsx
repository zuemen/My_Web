"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick } from "@/i18n/config";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/research", key: "research" },
  { href: "/experience", key: "experience" },
  { href: "/projects", key: "projects" },
  { href: "/cv", key: "cv" },
] as const;

const Navbar = () => {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const t = (v: { en: string; zh: string }) => pick(v, lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation, otherwise it stays open over the new page.
  // Adjusting during render (rather than in an effect) avoids the extra commit
  // that would briefly paint the new page with the menu still open.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;

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
        <Link href="/" className={styles.logo} aria-label={t(dict.nav.home)}>
          Zuemen Chu<span className={styles.logoAccent} lang="zh-Hant">朱廷翊</span>
        </Link>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${styles.navLink} ${isActive(link.href) ? styles.active : ""}`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {t(dict.nav[link.key])}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className={styles.contactBtn}
            >
              {t(dict.nav.contact)}
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={styles.langToggle}
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              aria-label={t(dict.nav.switchTo)}
            >
              <span className={lang === "en" ? styles.langOn : styles.langOff}>EN</span>
              <span aria-hidden="true">·</span>
              <span className={lang === "zh" ? styles.langOn : styles.langOff} lang="zh-Hant">
                中
              </span>
            </button>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t(dict.nav.closeMenu) : t(dict.nav.openMenu)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ul className={styles.mobileLinks}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ""}`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {t(dict.nav[link.key])}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#contact" className={styles.mobileLink}>
                  {t(dict.nav.contact)}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className={`${styles.mobileLink} ${styles.mobileLangToggle}`}
                  onClick={() => setLang(lang === "en" ? "zh" : "en")}
                >
                  {lang === "en" ? "切換至中文" : "Switch to English"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
