import Link from "next/link";
import { headers } from "next/headers";
import { isLocale } from "@/lib/i18n";
import { notFoundCopy } from "@/lib/i18n-content";

//  ⚠️ 문구를 하드코딩하면 /en·/de에서 404를 만난 사용자에게 한국어 안내가 나간다(과거 회귀).
export default async function NotFound() {
  const value = (await headers()).get("x-oneday-locale") ?? "ko";
  const locale = isLocale(value) ? value : "ko";
  const copy = notFoundCopy[locale];
  return (
    <section className="empty-page">
      <div>
        <span>404</span>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <Link className="primary-button" href={locale === "ko" ? "/" : `/${locale}`}>{copy.cta}</Link>
      </div>
    </section>
  );
}
