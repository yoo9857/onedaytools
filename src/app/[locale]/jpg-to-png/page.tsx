import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JpgToPngConverter } from "@/features/image/jpg-to-png/JpgToPngConverter";
import { isLocale, locales } from "@/lib/i18n";
import { homeCopy } from "@/lib/i18n-content";

type Props = { params: Promise<{ locale: string }> };
export function generateStaticParams() { return locales.filter((locale) => locale !== "ko").map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { locale: value } = await params; if (!isLocale(value) || value === "ko") return {}; const copy = homeCopy[value]; return { title: copy.cta, description: copy.description, alternates: { canonical: `/${value}/jpg-to-png` } }; }
export default async function LocalizedJpgToPng({ params }: Props) { const { locale: value } = await params; if (!isLocale(value) || value === "ko") notFound(); const copy = homeCopy[value]; return <section className="tool-hero"><div className="shell tool-page-shell"><div className="tool-title"><div className="eyebrow">{copy.eyebrow}</div><h1>{copy.cta}</h1><p>{copy.description}</p></div><JpgToPngConverter /></div></section>; }
