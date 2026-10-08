import type { BadgeTone } from "@/data/projects";
import styles from "./Badge.module.css";

/**
 * A small status label. "award" is the only tone allowed a colour that isn't
 * grey, and it borrows the pass green — an award is a verdict too.
 */
const Badge = ({ tone = "neutral", children }: { tone?: BadgeTone; children: React.ReactNode }) => (
  <span className={styles.badge} data-tone={tone}>
    {children}
  </span>
);

export default Badge;
