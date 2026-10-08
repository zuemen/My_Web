"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { l, pick, type L } from "@/i18n/config";
import { caseStudies, chains, type Project } from "@/data/projects";
import { trackById } from "@/data/tracks";
import Badge from "./Badge";
import ProjectDemo from "./demos/ProjectDemo";
import styles from "./CaseStudy.module.css";

const copy = {
  back: l("All work", "所有作品"),
  role: l("Role", "角色"),
  chain: l("Deployed on", "部署於"),
  track: l("Thesis", "命題"),
  replay: l("Replay", "重播"),
  problem: l("Problem", "問題"),
  customers: l("Who would pay", "誰會付錢"),
  how: l("How it works", "運作方式"),
  produced: l("What it produced", "成果"),
  deployment: l("On-chain", "鏈上部署"),
  limits: l("Limits, as the project states them", "限制（照專案自述）"),
  stack: l("Stack", "技術"),
  links: l("Links", "連結"),
  next: l("Next case study", "下一個案例"),
  contract: l("Contract", "合約"),
  address: l("Address", "地址"),
};

const short = (address: string) => `${address.slice(0, 6)}…${address.slice(-4)}`;

/**
 * One template for every case study: claim, replay, then the sections an
 * investor reads in order — problem, buyer, mechanism, evidence, chain,
 * limits. A section without data is left out rather than padded.
 */
const CaseStudy = ({ slug }: { slug: string }) => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const index = caseStudies.findIndex((p) => p.slug === slug);
  const project = caseStudies[index] as Project;
  const next = caseStudies[(index + 1) % caseStudies.length] as Project;
  const track = trackById(project.track);
  const explorer = project.deployment ? chains[project.deployment.chain].explorer : "";

  return (
    <article className={styles.page}>
      <div className={styles.container}>
        <Link href="/projects" className={styles.back}>
          <ArrowLeft size={14} />
          {t(copy.back)}
        </Link>

        <header className={styles.header}>
          <div className={styles.kicker}>
            {project.badge && <Badge tone={project.badge.tone}>{t(project.badge.label)}</Badge>}
            <span className={styles.category}>{t(project.category)}</span>
          </div>
          <h1 className={styles.title}>{t(project.title)}</h1>
          <p className={styles.lead}>{t(project.summary)}</p>

          <dl className={styles.facts}>
            <div>
              <dt>{t(copy.track)}</dt>
              <dd>
                <Link href={`/projects#${track.id}`} className={styles.inline}>
                  {t(track.label)}
                </Link>
              </dd>
            </div>
            {project.role && (
              <div>
                <dt>{t(copy.role)}</dt>
                <dd>{t(project.role)}</dd>
              </div>
            )}
            {project.deployment && (
              <div>
                <dt>{t(copy.chain)}</dt>
                <dd>{chains[project.deployment.chain].name}</dd>
              </div>
            )}
          </dl>

          <div className={styles.actions}>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.primary}>
                {t(dict.labels.liveDemo)}
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                {t(dict.labels.sourceOnGitHub)}
                <ArrowUpRight size={14} />
              </a>
            )}
            {project.videos?.map((v) => (
              <a key={v.href} href={v.href} target="_blank" rel="noopener noreferrer" className={styles.secondary}>
                <Play size={12} />
                {t(v.label)}
              </a>
            ))}
          </div>
        </header>
      </div>

      {project.demo && (
        <div className={styles.demoWrap}>
          <ProjectDemo id={project.demo} />
        </div>
      )}

      <div className={styles.container}>
        {project.problem && (
          <section className={styles.block}>
            <h2 className={styles.label}>{t(copy.problem)}</h2>
            <p className={styles.prose}>{t(project.problem)}</p>
          </section>
        )}

        {project.customers && (
          <section className={styles.block}>
            <h2 className={styles.label}>{t(copy.customers)}</h2>
            <p className={styles.prose}>{t(project.customers)}</p>
          </section>
        )}

        {project.steps && (
          <section className={styles.block}>
            <h2 className={styles.label}>{t(copy.how)}</h2>
            <div>
              <p className={styles.prose}>{t(project.description)}</p>
              <ol className={styles.steps}>
                {project.steps.map((step, i) => (
                  <li key={step.en} className={styles.step}>
                    <span className={styles.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{t(step)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className={styles.block}>
          <h2 className={styles.label}>{t(copy.produced)}</h2>
          <div>
            <p className={styles.prose}>{t(project.outcome)}</p>
            {project.proof && (
              <dl className={styles.proof}>
                {project.proof.map((p) => (
                  <div key={p.value + p.label.en} className={styles.proofItem}>
                    <dt className={styles.proofValue}>{p.value}</dt>
                    <dd className={styles.proofLabel}>{t(p.label)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {project.deployment && (
          <section className={styles.block}>
            <h2 className={styles.label}>{t(copy.deployment)}</h2>
            <div>
              <p className={styles.meta}>
                {chains[project.deployment.chain].name} · {t(project.deployment.verified)}
              </p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">{t(copy.contract)}</th>
                    <th scope="col">{t(copy.address)}</th>
                  </tr>
                </thead>
                <tbody>
                  {project.deployment.contracts.map((c) => (
                    <tr key={c.address}>
                      <td>{c.name}</td>
                      <td>
                        <a
                          href={`${explorer}/address/${c.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.address}
                          title={c.address}
                        >
                          <span className={styles.addrFull}>{c.address}</span>
                          <span className={styles.addrShort}>{short(c.address)}</span>
                          <ArrowUpRight size={12} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {project.caveats && (
          <section className={styles.block}>
            <h2 className={styles.label}>{t(copy.limits)}</h2>
            <ul className={styles.caveats}>
              {project.caveats.map((c) => (
                <li key={c.en}>{t(c)}</li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.block}>
          <h2 className={styles.label}>{t(copy.stack)}</h2>
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        </section>

        <Link href={`/projects/${next.slug}`} className={styles.next}>
          <span className={styles.nextLabel}>{t(copy.next)}</span>
          <span className={styles.nextTitle}>
            {t(next.shortTitle)}
            <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </article>
  );
};

export default CaseStudy;
