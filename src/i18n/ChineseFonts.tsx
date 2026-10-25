"use client";

import { useEffect } from "react";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";

// Newsreader and Plex have no CJK glyphs, so Chinese text used to fall back
// to whatever serif or sans the visitor's OS had. These two sit second in the
// Chinese font stacks (globals.css): Latin keeps its faces, Chinese gets a
// matched pair. Not preloaded — they are split by unicode-range and only the
// characters a page actually uses are fetched.
//
// They live in their own module, loaded by LanguageProvider only in Chinese
// mode: each family's @font-face list is ~200 KB of CSS (75 KB gzipped), and
// declared in the layout it was render-blocking on every English page too.
const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "500"],
  variable: "--font-noto-serif-tc",
  display: "swap",
  preload: false,
});

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500"],
  variable: "--font-noto-sans-tc",
  display: "swap",
  preload: false,
});

/** Puts the two font variables on <html>, where the Chinese stacks read them. */
const ChineseFonts = () => {
  useEffect(() => {
    document.documentElement.classList.add(notoSerifTC.variable, notoSansTC.variable);
  }, []);
  return null;
};

export default ChineseFonts;
