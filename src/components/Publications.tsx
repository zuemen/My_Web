"use client";

import { Fragment } from "react";
import { ExternalLink } from "lucide-react";
import {
  publications,
  STATUS_LABEL,
  type Publication,
} from "@/data/publications";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import pageStyles from "@/app/research/page.module.css";
import styles from "./Publications.module.css";

/** Author list with the site owner's name in bold. */
export const AuthorList = ({ pub }: { pub: Publication }) => (
  <>
    {pub.authors.map((name, i) => (
      <Fragment key={`${name}-${i}`}>
        {i > 0 && ", "}
        {i === pub.selfIndex ? <strong>{name}</strong> : name}
      </Fragment>
    ))}
  </>
);

const LINK_LABELS: { key: keyof NonNullable<Publication["links"]>; label: string }[] = [
  { key: "paper", label: "Paper" },
  { key: "arxiv", label: "arXiv" },
  { key: "openreview", label: "OpenReview" },
  { key: "code", label: "Code" },
];

/**
 * Publications on /research, below Research Focus. Renders nothing while
 * data/publications.ts is empty, so the section appears only once an entry
 * has been confirmed and added.
 */
const Publications = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  if (publications.length === 0) return null;

  return (
    <section id="publications" className={styles.publications}>
      <div className={pageStyles.container}>
        <h2 className={pageStyles.heading}>{t(dict.sections.publications)}</h2>
        <ol className={styles.list}>
          {publications.map((pub) => (
            <li key={pub.id} id={pub.id} className={styles.item}>
              <span className={styles.badge} data-status={pub.status}>
                {t(STATUS_LABEL[pub.status])}
              </span>
              <h3 className={styles.title}>{t(pub.title)}</h3>
              <p className={styles.authors}>
                <AuthorList pub={pub} />
              </p>
              <p className={styles.venue}>
                {t(pub.venue)} · {pub.year}
              </p>
              {pub.links && (
                <div className={styles.links}>
                  {LINK_LABELS.filter(({ key }) => pub.links?.[key]).map(
                    ({ key, label }) => (
                      <a
                        key={key}
                        href={pub.links?.[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                      >
                        {label}
                        <ExternalLink size={12} />
                      </a>
                    ),
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Publications;
