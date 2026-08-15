"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import styles from "./SelectedWork.module.css";

/**
 * The homepage previously went hero → updates → research areas → contact, so a
 * visitor never saw any actual work without first finding the Projects nav
 * item. This surfaces the same three projects as /projects, one line each,
 * reading from data/projects.ts so the two can't drift.
 */
const SelectedWork = () => {
  return (
    <section id="work" className={styles.work}>
      <div className="section-container">
        <SectionHeading eyebrow="Selected work" title="Projects" />

        <ul className={styles.list}>
          {projects.map((project, index) => {
            // Only PepeLab has a case study; the rest land on the list page.
            const href = project.caseStudyUrl ?? "/projects#projects";

            return (
              <motion.li
                key={project.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={href} className={styles.item}>
                  <span className={styles.category}>{project.category}</span>
                  <h3 className={styles.title}>
                    {project.shortTitle}
                    <ArrowUpRight className={styles.arrow} size={18} />
                  </h3>
                  <p className={styles.summary}>{project.summary}</p>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <Link href="/projects" className={styles.moreLink}>
          All projects
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default SelectedWork;
