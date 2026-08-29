import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

const localeByLanguage: Record<string, Locale> = {
  ko: "ko", en: "en", ja: "ja", zh: "zh", de: "de", fr: "fr", es: "es",
};

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("oneday_locale")?.value;
  if (saved && isLocale(saved)) return saved;
  const header = request.headers.get("accept-language") ?? "";
  const languages = header.split(",").map((part) => ({
    tag: part.trim().split(";")[0].toLowerCase(),
    quality: Number(part.match(/q=([0-9.]+)/)?.[1] ?? "1"),
  })).filter((item) => item.tag).sort((a, b) => b.quality - a.quality);
  for (const language of languages) {
    const base = language.tag.split("-")[0];
    if (localeByLanguage[language.tag]) return localeByLanguage[language.tag];
    if (localeByLanguage[base]) return localeByLanguage[base];
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-oneday-locale", isLocale(firstSegment) ? firstSegment : "ko");
  if (pathname !== "/" && pathname !== "/jpg-to-png") return NextResponse.next({ request: { headers: requestHeaders } });
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";
  if (/bot|crawler|spider|slurp|google|bing|yandex|baidu/.test(userAgent)) return NextResponse.next({ request: { headers: requestHeaders } });
  const locale = preferredLocale(request);
  if (locale === defaultLocale) return NextResponse.next({ request: { headers: requestHeaders } });
  const destination = new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url);
  const response = NextResponse.redirect(destination, 307);
  response.cookies.set("oneday_locale", locale, { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax" });
  return response;
}

export const config = { matcher: ["/", "/jpg-to-png"] };
