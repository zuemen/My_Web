export const LANGS = ["en", "zh"] as const;
export type Lang = (typeof LANGS)[number];

/** English is what the site serves by default; the audience is English-reading. */
export const DEFAULT_LANG: Lang = "en";

export const STORAGE_KEY = "zuemen-lang";

/** BCP 47 tag for the <html lang> attribute. */
export const HTML_LANG: Record<Lang, string> = {
  en: "en",
  zh: "zh-Hant",
};

/** A string that exists in both languages. */
export type L = { en: string; zh: string };

export const pick = (value: L, lang: Lang) => value[lang];

/** Convenience for data files: builds an L from two positional strings. */
export const l = (en: string, zh: string): L => ({ en, zh });
