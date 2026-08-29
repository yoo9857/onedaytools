import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileImage, LockKeyhole, Sparkles } from "lucide-react";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { homeCopy } from "@/lib/i18n-content";
import { siteConfig } from "@/lib/site";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() { return locales.filter((locale) => locale !== "ko").map((locale) => ({ locale })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const copy = homeCopy[value];
  //  ⚠️ openGraph를 여기서 안 주면 루트 layout의 한국어 og(제목·설명·og:locale=ko_KR·og:url=루트)가
  //  그대로 상속돼, 영어·독일어 페이지를 공유해도 한국어 카드가 뜨고 og:url이 한국어 홈을 가리켰다.
  //  title도 `eyebrow | title` + layout template이 겹쳐 "OneDay Tools · ... | ... | OneDay Tools"로 나왔다.
  const ogLocale = value === "ko" ? "ko_KR" : value.replace("-", "_");
  return {
    title: { absolute: `${copy.title} | ${siteConfig.name}` },
    description: copy.description,
    alternates: {
      canonical: `/${value}`,
      languages: Object.fromEntries(locales.map((locale) => [locale === "ko" ? "ko-KR" : locale, locale === "ko" ? siteConfig.url : `${siteConfig.url}/${locale}`])),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `/${value}`,
      siteName: siteConfig.name,
      title: `${copy.title} ${copy.accent}`,
      description: copy.description,
      images: [{ url: "/marketing/main_first.png", width: 1448, height: 1086, alt: siteConfig.name }],
    },
    twitter: { card: "summary", title: copy.title, description: copy.description, images: ["/marketing/main_first.png"] },
  };
}

export default async function LocalizedHome({ params }: Props) {
  const { locale: value } = await params;
  if (!isLocale(value) || value === "ko") notFound();
  const locale = value as Locale;
  const copy = homeCopy[locale];
  return <>
    {/*  ⚠️ .hero-inner는 2열 그리드다. 예전엔 .hero-copy 래퍼 없이 요소를 직접 넣어서
        eyebrow·h1·설명·버튼이 두 열에 번갈아 흩어졌다(7개 언어 홈 전부 레이아웃이 깨져 있었다).
        한국어 홈과 같은 구조(.hero-copy + .hero-visual)를 유지할 것. */}
    <section className="hero">
      <div className="hero-orb hero-orb--one" />
      <div className="hero-orb hero-orb--two" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={15} /> {copy.badge}</p>
          <h1>
            <span className="hero-title-line">{copy.title}</span>
            <span className="hero-title-line hero-title-accent">{copy.accent}</span>
          </h1>
          <p className="hero-description">{copy.description}</p>
          <div className="hero-actions"><Link className="primary-button primary-button--large" href={`/${locale}/jpg-to-png`}>{copy.cta} <ArrowRight size={18} /></Link></div>
          <ul className="trust-list">
            {copy.trust.map((item) => <li key={item}><Check size={15} /> {item}</li>)}
          </ul>
        </div>
        <div className="hero-visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marketing/main_first.png" alt={copy.eyebrow} width="1448" height="1086" fetchPriority="high" />
        </div>
      </div>
    </section>
    <section className="tools-section"><div className="shell"><div className="section-heading"><div><p className="section-kicker">IMAGE TOOLS</p><h2>{copy.tools}</h2></div></div><div className="tool-grid"><Link className="tool-card" href={`/${locale}/jpg-to-png`}><span className="tool-icon tool-icon--violet"><FileImage size={24} /></span><span className="tool-card-copy"><strong>{copy.cta}</strong><span>{copy.description}</span></span><ArrowRight className="tool-arrow" size={19} /></Link></div><p className="privacy-note"><LockKeyhole size={17} /> {copy.privacy}</p></div></section>
  </>;
}
