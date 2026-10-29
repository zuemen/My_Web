"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import { researchAreas } from "@/data/researchAreas";
import styles from "./Skills.module.css";

const Skills = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  // Phones only: descriptions start folded so the four areas fit on about
  // one screen. On wider screens every description is always shown.
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="skills" className={styles.skills}>
      <div className="section-container">
        <SectionHeading title={t(dict.sections.researchAreas)} />

        <ol className={styles.list}>
          {researchAreas.map((area) => {
            const isOpen = open === area.title.en;
            const descId = `area-${area.title.en.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <li key={area.title.en} className={styles.item} data-open={isOpen}>
                <div className={styles.body}>
                  <h3 className={styles.title}>
                    <button
                      type="button"
                      className={styles.toggle}
                      aria-expanded={isOpen}
                      aria-controls={descId}
                      onClick={() => setOpen(isOpen ? null : area.title.en)}
                    >
                      {t(area.title)}
                      <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
                    </button>
                  </h3>
                  <p id={descId} className={styles.desc}>
                    {t(area.summary)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Skills;
