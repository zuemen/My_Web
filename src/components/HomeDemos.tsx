"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { l, pick, type L } from "@/i18n/config";
import SectionHeading from "./SectionHeading";
import DemoTheater from "./demos/DemoTheater";
import styles from "./HomeDemos.module.css";

const HomeDemos = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section id="demos" className={styles.section}>
      <div className="section-wide">
        <SectionHeading
          wide
          eyebrow={t(l("Replays", "實際重播"))}
          title={t(l("Watch it say no.", "看它如何說「不」。"))}
          subtitle={t(
            l(
              "A system that only ever says yes proves nothing. These are replays of real runs, step for step — the limits, the refusals and the reasons — and each step links to the transaction behind it.",
              "只會說「好」的系統什麼也證明不了。以下是實際執行紀錄的逐步重播——上限、拒絕與原因——每一步都連到背後的那筆交易。",
            ),
          )}
        />
        <DemoTheater />
      </div>
    </section>
  );
};

export default HomeDemos;
