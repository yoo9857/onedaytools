import type { Metadata } from "next";
import { ArrowRight, Check, LockKeyhole, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { CategoryStrip } from "@/components/catalog/CategoryStrip";
import { ToolCard } from "@/components/catalog/ToolCard";
import { ToolCatalog } from "@/components/catalog/ToolCatalog";
import { getToolsByCategory } from "@/config/tool-catalog";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All in One Tool | 이미지·PDF·파일 작업을 한곳에서",
  description: "OneDay Tools는 JPG·PNG 변환, 이미지 압축과 크기 조절, PDF·오디오 작업을 제공하는 All in One 온라인 파일 도구입니다.",
  keywords: ["온라인 이미지 도구", "JPG PNG 변환", "이미지 압축", "파일 변환", "All in One Tool"],
  alternates: {
    canonical: "/",
    languages: Object.fromEntries(locales.map((locale) => [locale === "ko" ? "ko-KR" : locale, locale === "ko" ? siteConfig.url : `${siteConfig.url}/${locale}`])),
  },
};

export default function Home() {
  const imageTools = getToolsByCategory("image");
  return (
    <>
      <section className="hero">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="shell hero-inner">
          <div className="eyebrow"><Sparkles size={14} /> OneDay Tools · All in One Tool</div>
          <h1>파일 작업을 한곳에서,<br /><span>더 간단하게.</span></h1>
          <p className="hero-description">
            이미지·PDF·오디오 도구를 설치 없이 브라우저에서 바로 처리하세요.<br className="desktop-break" /> 필요한 파일 작업을 한곳에서 빠르고 안전하게 끝낼 수 있습니다.
          </p>
          <div className="hero-actions">
            <Link className="primary-button primary-button--large" href="/jpg-to-png">
              첫 번째 도구 사용하기 <ArrowRight size={18} />
            </Link>
            <a className="text-link" href="#tools">모든 도구 보기</a>
          </div>
          <ul className="trust-list" aria-label="서비스 특징">
            <li><Check size={15} /> 무료 사용</li>
            <li><Check size={15} /> 파일 업로드 없음</li>
            <li><Check size={15} /> 모바일 지원</li>
          </ul>
          <div className="hero-visual">
            {/* Product vision artwork supplied for the OneDay Tools homepage. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marketing/main_first.png" alt="OneDay Tools All in One 문서 작업 화면" width="1440" height="1080" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className="image-first-section" aria-labelledby="image-first-title">
        <div className="shell">
          <div className="section-heading">
            <div><p className="section-kicker">IMAGE FIRST</p><h2 id="image-first-title">이미지 도구부터 시작하세요</h2></div>
            <p>변환·압축·크기 조절을 한곳에서.</p>
          </div>
          <div className="tool-grid image-first-grid">
            {imageTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        </div>
      </section>

      <section className="story-section" aria-label="OneDay Tools 사용 경험">
        <div className="shell">
          <div className="story-intro"><p className="section-kicker">ONE DAY, ONE WORKSPACE</p><h2>복잡한 파일 작업을<br /><span>하나의 흐름으로.</span></h2><p>찾고, 바꾸고, 정리하고, 완성하는 순간까지.<br />OneDay Tools는 필요한 도구를 한곳에 연결합니다.</p></div>
          <div className="story-list">
            {[
              ["first.png", "필요한 도구를 바로 찾고", "검색 한 번으로 이미지 변환부터 문서 작업까지 필요한 기능을 빠르게 시작하세요."],
              ["first_2.png", "브라우저에서 바로 편집하고", "별도 프로그램을 설치하지 않아도 익숙한 화면에서 파일을 다듬을 수 있습니다."],
              ["first_3.png", "어디서든 파일을 이어서 보고", "데스크톱과 모바일에 맞춘 경험으로 장소와 기기에 구애받지 않고 작업하세요."],
              ["first_4.png", "완성된 결과를 안전하게 저장하세요", "변환이 끝난 파일을 원하는 형식으로 내려받고 다음 작업으로 자연스럽게 이어갑니다."],
            ].map(([image, title, description], index) => <article className={`story-row${index % 2 ? " story-row--reverse" : ""}`} key={image}><div className="story-copy"><span className="story-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></div><div className="story-image"><img src={`/marketing/${image}`} alt={title} loading="lazy" width="1280" height="1280" /></div></article>)}
          </div>
        </div>
      </section>

      <section className="category-section" aria-label="도구 카테고리">
        <div className="shell"><CategoryStrip /></div>
      </section>

      <section className="product-vision-section" aria-labelledby="product-vision-title">
        <div className="shell">
          <div className="section-heading"><div><p className="section-kicker">ONE WORKSPACE</p><h2 id="product-vision-title">변환부터 편집까지, 하나의 작업 공간</h2></div><p>OneDay Tools가 만들어갈 All in One 경험.</p></div>
          <div className="vision-grid">
            {["first.png", "first_2.png", "first_3.png", "first_4.png"].map((image, index) => <figure key={image} className="vision-card"><img src={`/marketing/${image}`} alt={["문서와 도구를 한곳에서 찾는 작업 화면", "이미지와 문서를 편집하는 작업 화면", "파일을 정리하고 모바일에서 확인하는 화면", "문서를 다양한 형식으로 변환하는 화면"][index]} loading="lazy" width="1280" height="1280" /><figcaption>{["모든 도구를 한곳에서", "직관적인 편집", "데스크톱과 모바일", "빠른 파일 변환"][index]}</figcaption></figure>)}
          </div>
        </div>
      </section>

      <section className="tools-section" id="tools">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">POPULAR TOOLS</p>
              <h2>도구 찾아보기</h2>
            </div>
            <p>검색하거나 카테고리를 선택하세요.</p>
          </div>
          <ToolCatalog />
        </div>
      </section>

      <section className="benefits-section">
        <div className="shell benefits-grid">
          <article className="benefit-card">
            <span><Zap size={22} /></span>
            <h3>빠른 브라우저 처리</h3>
            <p>불필요한 대기 없이 기기에서 바로 파일을 처리합니다.</p>
          </article>
          <article className="benefit-card">
            <span><LockKeyhole size={22} /></span>
            <h3>안심할 수 있는 개인정보</h3>
            <p>지원되는 도구는 파일을 서버에 올리지 않고 브라우저 내부에서 작동합니다.</p>
          </article>
          <article className="benefit-card">
            <span><Sparkles size={22} /></span>
            <h3>단순하고 깨끗한 화면</h3>
            <p>필요한 기능만 남겨 누구나 망설임 없이 사용할 수 있습니다.</p>
          </article>
        </div>
      </section>
    </>
  );
}
