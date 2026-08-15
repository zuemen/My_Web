"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { awards, formatAwardDate } from "@/data/awards";
import SectionHeading from "./SectionHeading";
import styles from "./Awards.module.css";

/**
 * Keeps awards and competitive selections in one place instead of scattered
 * through Recent Updates, which is a running log rather than a record.
 * Data comes from data/awards.ts, shared with the awards block on /cv.
 */
const Awards = () => {
  return (
    <section id="awards" className={styles.awards}>
      <div className="section-container">
        <SectionHeading eyebrow="Recognition" title="Awards & Competitions" />

        <ul className={styles.list}>
          {awards.map((award, index) => (
            <motion.li
              key={award.slug}
              className={styles.item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <span className={styles.date}>{formatAwardDate(award.date)}</span>

              <div className={styles.body}>
                <h3 className={styles.title}>
                  {award.title}
                  {award.result && (
                    <span className={styles.result}>{award.result}</span>
                  )}
                </h3>

                <p className={styles.issuer}>
                  {award.issuer}
                  {award.role && ` · ${award.role}`}
                </p>

                {award.detail && <p className={styles.detail}>{award.detail}</p>}

                {(award.link || award.certificateUrl) && (
                  <div className={styles.links}>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        Event page
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {award.certificateUrl && (
                      <a
                        href={award.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        <FileText size={12} />
                        Certificate
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Awards;
