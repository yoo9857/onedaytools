import Link from "next/link";
import { localeLabels, locales, localizedPath } from "@/lib/i18n";

export function LanguageLinks({ path = "" }: { path?: string }) {
  return <nav className="language-links" aria-label="Language"><span>Language:</span>{locales.map((locale) => <Link key={locale} href={localizedPath(locale, path)} hrefLang={locale === "ko" ? "ko-KR" : locale}>{localeLabels[locale]}</Link>)}</nav>;
}
