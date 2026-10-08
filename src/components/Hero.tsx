"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick, type L } from "@/i18n/config";
import styles from "./Hero.module.css";

/**
 * Opens on the claim rather than the name: a reader from investment or a
 * startup decides in the first screen whether the direction is interesting,
 * and the name is remembered better once there is something to attach it to.
 * The proof bar under it is the evidence for that claim, in numbers that link
 * back to the projects that produced them.
 */
const Hero = () => {
  const { lang } = useLang();
  const t = (v: L) => pick(v, lang);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{t(dict.hero.eyebrow)}</p>
          <h1 className={styles.headline}>{t(dict.hero.headline)}</h1>
          <p className={styles.lead}>
            {t(dict.hero.leadBefore)}
            <strong className={styles.name}>
              {lang === "zh" ? (
                <>
                  <span lang="zh-Hant">朱廷翊</span>（Zuemen Chu）
                </>
              ) : (
                <>
                  Zuemen Chu <span lang="zh-Hant">朱廷翊</span>
                </>
              )}
            </strong>
            {t(dict.hero.leadAfter)}
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/#demos" className={styles.primaryBtn}>
              {t(dict.hero.watch)}
              <ArrowDown size={15} />
            </Link>
            <Link href="/#contact" className={styles.secondaryBtn}>
              {t(dict.hero.contact)}
            </Link>
          </div>
        </div>

        <figure className={styles.visual}>
          <div className={styles.profileWrapper}>
            <Image
              src="/portrait.jpg"
              alt={t(dict.hero.photoAlt)}
              width={300}
              height={400}
              priority
              sizes="(max-width: 720px) 88px, 260px"
              className={styles.profileImage}
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </div>
          <figcaption className={styles.now}>
            <span className={styles.nowLabel}>{t(dict.hero.nowLabel)}</span>
            {dict.hero.now.map((line) => (
              <span key={line.en} className={styles.nowLine}>
                {t(line)}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>

      <div className={styles.proofWrap}>
        <ul className={styles.proof}>
          {dict.hero.proof.map((item) => (
            <li key={item.href} className={styles.proofItem}>
              <Link href={item.href} className={styles.proofLink}>
                <span className={styles.proofValue}>{t(item.value)}</span>
                <span className={styles.proofLabel}>
                  {t(item.label)}
                  <ArrowUpRight size={12} className={styles.proofArrow} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;
