"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, ChevronRight, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { experience } from "@/data/experience";
import styles from "./Experience.module.css";

const Experience = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  // The other language's name sits under the heading as a secondary line.
  const other = lang === "en" ? "zh" : "en";

  return (
    <section id="experience" className={styles.experience}>
      <div className="section-container">
        <SectionHeading
          eyebrow={t(dict.sections.experienceEyebrow)}
          title={t(dict.sections.experience)}
          as="h1"
        />

        <div className={styles.expList}>
          {experience.map((exp) => {
            const meta = [exp.role, exp.period, exp.location]
              .filter((v): v is L => Boolean(v))
              .map(t)
              .join(" · ");

            return (
              <motion.div
                key={exp.id}
                className={styles.expCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardHeader}>
                  <Briefcase className={styles.icon} size={24} />
                  <div>
                    <h2 className={styles.company}>
                      {t(exp.company)}
                      <span
                        className={styles.companyZh}
                        lang={other === "zh" ? "zh-Hant" : "en"}
                      >
                        {exp.company[other]}
                      </span>
                    </h2>
                    {exp.division && (
                      <p className={styles.division}>{t(exp.division)}</p>
                    )}
                    <p className={styles.roleTitle}>{meta}</p>
                    {exp.advisor && (
                      <p className={styles.advisor}>
                        {t(dict.labels.advisor)}: {t(exp.advisor)}
                      </p>
                    )}
                  </div>
                </div>

                {exp.projects && exp.projects.length > 0 && (
                  <div className={styles.projectList}>
                    {exp.projects.map((proj) => (
                      <div
                        key={proj.name.en}
                        className={`${styles.projectItem} ${proj.photo ? styles.withPhoto : ""}`}
                      >
                        <div className={styles.projectBody}>
                          <h3 className={styles.projectName}>
                            <ChevronRight size={16} /> {t(proj.name)}
                          </h3>
                          {proj.details && proj.details.length > 0 && (
                            <ul className={styles.details}>
                              {proj.details.map((detail) => (
                                <li key={detail.en}>{t(detail)}</li>
                              ))}
                            </ul>
                          )}
                          {proj.links && proj.links.length > 0 && (
                            <div className={styles.projectLinks}>
                              {proj.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles.projectLink}
                                >
                                  {t(link.label)}
                                  <ExternalLink size={12} />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        {proj.photo && (
                          <figure className={styles.photo}>
                            <Image
                              src={proj.photo.src}
                              alt={t(proj.photo.alt)}
                              width={proj.photo.width}
                              height={proj.photo.height}
                              sizes="(max-width: 768px) 100vw, 280px"
                              className={styles.photoImg}
                            />
                          </figure>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {exp.notes && exp.notes.length > 0 && (
                  <ul className={`${styles.details} ${styles.notes}`}>
                    {exp.notes.map((note) => (
                      <li key={note.en}>{t(note)}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
