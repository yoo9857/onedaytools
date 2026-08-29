import { Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { categories } from "@/config/tool-catalog";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="OneDay Tools 홈">
          <span className="brand-mark" aria-hidden="true">
            <Sparkles size={19} strokeWidth={2.4} />
          </span>
          <span>OneDay <strong>Tools</strong></span>
        </Link>
        <nav className="desktop-nav" aria-label="도구 카테고리">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>{category.name}</Link>
          ))}
        </nav>
        <Link className="header-search-link" href="/#tools" aria-label="도구 검색으로 이동">
          <Search size={17} /> <span>도구 검색</span>
        </Link>
      </div>
    </header>
  );
}
