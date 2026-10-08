"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L } from "@/i18n/config";
import { projects, caseStudyHref, type Project } from "@/data/projects";
import { trackById } from "@/data/tracks";
import ProjectDemo from "./ProjectDemo";
import styles from "./DemoTheater.module.css";

const ORDER: NonNullable<Project["demo"]>[] = ["agent-passport", "chainlens", "mandate-layer", "carbon-lei"];

/**
 * The homepage's centrepiece: four replays behind one set of tabs, so a
 * visitor can watch a refusal happen before reading a word about it. Only the
 * selected replay is mounted, so only one is ever animating.
 */
const DemoTheater = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = ORDER.map((id) => projects.find((p) => p.demo === id) as Project);
  const current = items[active] as Project;
  const href = caseStudyHref(current);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={styles.theater}>
      <div className={styles.tabs} role="tablist" aria-label={t(l("Demo replays", "Demo 重播"))} onKeyDown={onKeyDown}>
        {items.map((p, i) => (
          <button
            key={p.slug}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`demo-tab-${p.slug}`}
            aria-selected={i === active}
            aria-controls="demo-panel"
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            <span className={styles.tabTrack}>{t(trackById(p.track).label)}</span>
            <span className={styles.tabName}>{t(p.shortTitle)}</span>
          </button>
        ))}
      </div>

      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${current.slug}`}>
        <ProjectDemo key={current.slug} id={current.demo as NonNullable<Project["demo"]>} />
      </div>

      <div className={styles.after}>
        <p className={styles.summary}>{t(current.summary)}</p>
        {href && (
          <Link href={href} className={styles.caseLink}>
            {t(l("Read the case study", "閱讀完整案例"))}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default DemoTheater;
