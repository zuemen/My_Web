"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { DEFAULT_LANG, HTML_LANG, LANGS, STORAGE_KEY, type Lang } from "./config";

interface LanguageContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: DEFAULT_LANG,
  setLang: () => {},
});

const isLang = (value: unknown): value is Lang =>
  typeof value === "string" && (LANGS as readonly string[]).includes(value);

/*
 * The stored preference is external state, so it is read through
 * useSyncExternalStore rather than copied into React state from an effect.
 * getServerSnapshot returns DEFAULT_LANG: the server HTML — what crawlers and
 * scripting-off visitors get — is always English, and React swaps to the
 * stored language right after hydration without a mismatch warning.
 */
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  // Keeps tabs in step when the language is switched in another tab.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
};

const getSnapshot = (): Lang => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    // Private mode or blocked storage — stay on the default.
    return DEFAULT_LANG;
  }
};

const getServerSnapshot = (): Lang => DEFAULT_LANG;

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable: the choice cannot persist, and with no stored
      // value the snapshot stays on the default. Acceptable for private mode.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);

export default LanguageProvider;
