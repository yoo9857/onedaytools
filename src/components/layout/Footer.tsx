import Link from "next/link";
import { categories } from "@/config/tool-catalog";
import { chromeCopy } from "@/lib/i18n-content";
import { isLocale } from "@/lib/i18n";
import { LanguageLinks } from "./LanguageLinks";

//  ⚠️ 푸터 문구는 chromeCopy에서만 가져온다. 하드코딩하면 /en·/de 페이지에 한국어가 샌다.
export function Footer({ locale = "ko" }: { locale?: string }) {
  const key = isLocale(locale) ? locale : "ko";
  const copy = chromeCopy[key];
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-brand">OneDay Tools</p>
          <p className="footer-copy">{copy.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label={copy.searchTools}>
          {categories.map((category) => (
            <Link key={category.id} href={key === "ko" ? `/category/${category.id}` : `/${key}`}>{copy.categories[category.id]}</Link>
          ))}
        </nav>
        <nav className="footer-nav footer-nav--policy" aria-label={copy.about}>
          <Link href="/about">{copy.about}</Link>
          <Link href="/privacy">{copy.privacy}</Link>
          <a href="https://onedaytrading.net" rel="noopener noreferrer">OneDayTrading</a>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} OneDay Tools</p>
        <LanguageLinks />
      </div>
    </footer>
  );
}
