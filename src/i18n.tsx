import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ar, en, type Content } from "@/data/content";

export type Lang = "ar" | "en";
export const DICT: Record<Lang, Content> = { ar, en };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Content;
  dir: "rtl" | "ltr";
  isAr: boolean;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("teejan-lang");
      return saved === "en" ? "en" : "ar";
    } catch {
      return "ar";
    }
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("teejan-lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
      t: DICT[lang],
      dir,
      isAr: lang === "ar",
    }),
    [lang, dir],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const c = useContext(I18nCtx);
  if (!c) throw new Error("useI18n must be used inside <I18nProvider>");
  return c;
}
