export const locales = ["ko", "en", "ja", "zh", "zh-tw", "de", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "简体中文",
  "zh-tw": "繁體中文",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, path = "") {
  const normalized = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return locale === defaultLocale ? normalized || "/" : `/${locale}${normalized}`;
}
