import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Heading level, so pages keep a sensible h1→h2→h3 order. */
  as?: "h1" | "h2";
  /** Full-width header above its content, instead of the left rail. */
  wide?: boolean;
}

/**
 * One section header for the whole site. News, Skills, Contact and Experience
 * each carried their own copy of a centred title plus a 40px accent bar —
 * four near-identical blocks that made every section read like the same
 * landing-page template. This replaces all of them.
 */
const SectionHeading = ({
  title,
  subtitle,
  as: Tag = "h2",
  wide = false,
}: SectionHeadingProps) => {
  return (
    <header className={`${styles.header} ${wide ? styles.wide : ""}`}>
      <Tag className={styles.title}>{title}</Tag>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default SectionHeading;
