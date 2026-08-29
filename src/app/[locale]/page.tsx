import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileImage, LockKeyhole } from "lucide-react";
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
  return { title: `${copy.eyebrow} | ${copy.title}`, description: copy.description, alternates: { canonical: `/${value}`, languages: Object.fromEntries(locales.map((locale) => [locale === "ko" ? "ko-KR" : locale, locale === "ko" ? siteConfig.url : `${siteConfig.url}/${locale}`])) } };
}

export default async function LocalizedHome({ params }: Props) {
  const { locale: value } = await params;
  if (!isLocale(value) || value === "ko") notFound();
  const locale = value as Locale;
  const copy = homeCopy[locale];
  return <>
    <section className="hero"><div className="shell hero-inner">
      <div className="eyebrow">{copy.eyebrow}</div>
      <h1>{copy.title}<br /><span>{copy.accent}</span></h1>
      <p className="hero-description">{copy.description}</p>
      <div className="hero-actions"><Link className="primary-button primary-button--large" href={`/${locale}/jpg-to-png`}>{copy.cta} <ArrowRight size={18} /></Link></div>
      <ul className="trust-list"><li><Check size={15} /> Free</li><li><Check size={15} /> Private</li><li><Check size={15} /> Mobile ready</li></ul>
    </div></section>
    <section className="tools-section"><div className="shell"><div className="section-heading"><div><p className="section-kicker">IMAGE TOOLS</p><h2>{copy.tools}</h2></div></div><div className="tool-grid"><Link className="tool-card" href={`/${locale}/jpg-to-png`}><span className="tool-icon tool-icon--violet"><FileImage size={24} /></span><span className="tool-card-copy"><strong>{copy.cta}</strong><span>{copy.description}</span></span><ArrowRight className="tool-arrow" size={19} /></Link></div><p className="privacy-note"><LockKeyhole size={17} /> {copy.privacy}</p></div></section>
  </>;
}
