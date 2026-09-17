"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick } from "@/i18n/config";
import styles from "./Hero.module.css";

const Hero = () => {
  const { lang } = useLang();
  const t = (v: { en: string; zh: string }) => pick(v, lang);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.role}>{t(dict.hero.role)}</p>
          <h1 className={styles.name}>
            <span>Zuemen Chu</span>
            <span className={styles.nameChinese} lang="zh-Hant">
              朱廷翊
            </span>
          </h1>
          <p className={styles.intro}>{t(dict.hero.intro)}</p>
          <div className={styles.tags} aria-label={t(dict.sections.researchAreas)}>
            {dict.hero.tags.map((tag) => (
              <span key={tag.en} className={styles.tag}>
                {t(tag)}
              </span>
            ))}
          </div>
          <div className={styles.ctaGroup}>
            <Link href="/research" className={styles.primaryBtn}>
              {t(dict.hero.seeResearch)}
            </Link>
            <Link href="/#contact" className={styles.secondaryBtn}>
              {t(dict.hero.contact)}
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.profileWrapper}>
            <Image
              src="/zuemen.jpg"
              alt={t(dict.hero.photoAlt)}
              width={300}
              height={450}
              priority
              sizes="(max-width: 640px) 250px, 300px"
              className={styles.profileImage}
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
