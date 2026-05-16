import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
  { href: "https://github.com/zuemen", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/%E5%BB%B7%E7%BF%8A-%E6%9C%B1-95838538a/",
    label: "LinkedIn",
  },
  { href: "mailto:112306007@g.nccu.edu.tw", label: "Email" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className={styles.copy}>
          © 2026 Zuemen Chu 朱廷翊 &mdash; Last updated: 2026-05-16
        </p>
        <p className={styles.source}>
          <Link
            href="https://github.com/zuemen/My_Web"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Source on GitHub
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
