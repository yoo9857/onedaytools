import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { categories, getToolsByCategory } from "@/config/tool-catalog";
import { categoryTagline, chromeCopy, toolLabel, toolStatusCopy } from "@/lib/i18n-content";
import { hasLocalizedTool, isLocale, localePath } from "@/lib/i18n";

//  ⚠️ 헤더 문구는 chromeCopy에서만 가져온다. 카테고리명을 카탈로그(한국어)에서 직접 쓰면
//  /en·/de·/ja 페이지에 한국어 내비게이션이 그대로 노출된다(실측으로 확인된 회귀).
export function Header({ locale = "ko" }: { locale?: string }) {
  const key = isLocale(locale) ? locale : "ko";
  const copy = chromeCopy[key];
  const statusCopy = toolStatusCopy[key];
  const tagline = categoryTagline[key];
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={key === "ko" ? "/" : `/${key}`} aria-label="OneDay Tools">
          <span className="brand-mark brand-mark--logo" aria-hidden="true"><Image src="/logo.png" alt="" width={34} height={34} priority /></span>
          <span>OneDay <strong>Tools</strong></span>
        </Link>
        <nav className="desktop-nav" aria-label={copy.searchTools}>
          {categories.map((category) => {
            const categoryTools = getToolsByCategory(category.id);
            return (
              <div className="nav-menu" key={category.id}>
                <Link className="nav-trigger" href={key === "ko" ? `/category/${category.id}` : `/${key}`}>
                  {copy.categories[category.id]}<ChevronDown size={14} aria-hidden="true" />
                </Link>
                <div className="nav-dropdown">
                  <div className="nav-dropdown-heading">
                    <span className={`tool-icon tool-icon--${category.accent}`}><category.icon size={18} /></span>
                    <div><strong>{copy.categories[category.id]}</strong><small>{tagline[category.id]}</small></div>
                  </div>
                  <div className="nav-tool-list">
                    {categoryTools.map((tool) => (
                      // 이 로케일에 실제 페이지가 있는 도구만 링크한다(없으면 준비 중 표기).
                      hasLocalizedTool(key, tool.slug) ? (
                      <Link href={localePath(key, `/${tool.slug}`)} key={tool.slug}>
                        <span>{toolLabel(key, tool.slug, tool.name)}</span>
                        <small>{statusCopy.live}</small>
                      </Link>
                      ) : (
                      <span className="nav-tool-disabled" key={tool.slug}>
                        <span>{toolLabel(key, tool.slug, tool.name)}</span>
                        <small>{statusCopy.soon}</small>
                      </span>
                      )
                    ))}
                  </div>
                  <Link className="nav-view-all" href={key === "ko" ? `/category/${category.id}` : `/${key}`}>{copy.categories[category.id]} {copy.viewAll} →</Link>
                </div>
              </div>
            );
          })}
          {/*  가이드는 카테고리가 아니라 별도 축이라 드롭다운 밖에 둔다. 전 페이지 헤더에 있어야
              크롤러가 어느 페이지에서 들어와도 가이드 섹션에 닿는다. */}
          {key === "ko" ? <Link className="nav-trigger" href="/guides">{copy.guides}</Link> : null}
        </nav>
        <Link className="header-search-link" href={key === "ko" ? "/#tools" : `/${key}`} aria-label={copy.searchTools}>
          <Search size={17} /> <span>{copy.searchTools}</span>
        </Link>
      </div>
    </header>
  );
}
