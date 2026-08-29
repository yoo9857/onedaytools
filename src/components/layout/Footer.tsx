import Link from "next/link";
import { categories } from "@/config/tool-catalog";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <p className="footer-brand">OneDay Tools</p>
          <p className="footer-copy">일상에 필요한 파일 작업을 더 간단하게.</p>
        </div>
        <nav className="footer-nav" aria-label="도구 카테고리">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>{category.name}</Link>
          ))}
        </nav>
        <nav className="footer-nav footer-nav--policy" aria-label="서비스 정보">
          <Link href="/about">서비스 소개</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <a href="https://onedaytrading.net" rel="noopener noreferrer">OneDayTrading</a>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} OneDay Tools</p>
      </div>
    </footer>
  );
}
