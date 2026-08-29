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

/**
 *  로케일별로 실제 존재하는 도구 라우트.
 *
 *  ⚠️ 네비는 이 목록만 링크한다. 예전에는 /en 헤더가 /pdf-merge 같은 **한국어 페이지**로 그대로
 *  보내서, 영어 사용자가 한국어 도구 화면에 떨어졌다. 영어 도구 페이지를 만들면 여기에 추가한다.
 */
const LOCALIZED_TOOL_SLUGS: Record<string, readonly string[]> = {
  ko: ["jpg-to-png", "pdf-merge", "pdf-compress", "pdf-converter", "pdf-to-image", "pdf-to-jpg", "image-to-pdf", "jpg-to-pdf"],
};
const DEFAULT_LOCALIZED_TOOLS = ["jpg-to-png"] as const;

export function hasLocalizedTool(locale: string, slug: string) {
  return (LOCALIZED_TOOL_SLUGS[locale] ?? DEFAULT_LOCALIZED_TOOLS).includes(slug);
}

/** 로케일에 맞는 경로. ko는 접두사가 없다. */
export function localePath(locale: string, path: string) {
  return locale === "ko" ? path : `/${locale}${path}`;
}
