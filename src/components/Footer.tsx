import Link from "next/link";
import styles from "./Footer.module.css";

const externalLinks = [
  { href: "https://github.com/zuemen", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/%E5%BB%B7%E7%BF%8A-%E6%9C%B1-95838538a/",
    label: "LinkedIn",
  },
  { href: "mailto:112306007@g.nccu.edu.tw", label: "Email" },
];

// Evaluated at build time (server component), so each deploy refreshes the date.
// en-CA gives YYYY-MM-DD; the explicit timeZone keeps a late-night build from
// rolling back a day on a UTC build machine.
const buildDate = new Date();
const lastUpdated = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Taipei",
}).format(buildDate);
const copyrightYear = lastUpdated.slice(0, 4);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          {externalLinks.map((link) => (
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
          <Link href="/notes" className={styles.link}>
            Notes
          </Link>
        </div>
        <p className={styles.copy}>
          © {copyrightYear} Zuemen Chu 朱廷翊 &mdash; Last updated:{" "}
          <time dateTime={lastUpdated}>{lastUpdated}</time>
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
