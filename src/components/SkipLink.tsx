"use client";

import { useLang } from "@/i18n/LanguageProvider";
import { dict } from "@/i18n/dictionary";
import { pick } from "@/i18n/config";

/**
 * Its own component so the label can follow the language toggle — the layout
 * that renders it is a server component and cannot read the context.
 */
const SkipLink = () => {
  const { lang } = useLang();
  return (
    <a href="#main-content" className="skip-link">
      {pick(dict.nav.skip, lang)}
    </a>
  );
};

export default SkipLink;
