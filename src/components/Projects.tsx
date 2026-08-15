"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, Award, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "@/data/projects";
import styles from "./Projects.module.css";

const Projects = () => {
  return (
    <section id="projects" className={styles.projects}>
      <div className="section-container">
        <SectionHeading
          eyebrow="Selected work"
          title="Research & Projects"
          subtitle="Bridging emerging technologies with institutional needs."
          as="h1"
        />

        <div className={styles.list}>
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              className={styles.projectItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {project.image && (
                <div className={styles.projectImageWrapper}>
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={480}
                    height={270}
                    sizes="(max-width: 768px) 100vw, 480px"
                    className={styles.projectImage}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className={styles.projectInfo}>
                <span className={styles.category}>{project.category}</span>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.outcome}>
                  <span className={styles.outcomeLabel}>Outcome</span>
                  <p className={styles.outcomeText}>{project.outcome}</p>
                </div>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.links}>
                  {project.caseStudyUrl && (
                    <Link
                      href={project.caseStudyUrl}
                      className={styles.caseStudyLink}
                    >
                      Read case study <ArrowRight size={14} />
                    </Link>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className={styles.linkIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <Code size={20} />
                    </a>
                  )}
                  {project.certificateUrl && (
                    <a
                      href={project.certificateUrl}
                      className={styles.linkIcon}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Award Certificate (PDF)"
                    >
                      <Award size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
