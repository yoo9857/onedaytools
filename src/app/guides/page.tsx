import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guides } from "@/content/guides";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "PDF·이미지 파일 작업 가이드 | 무료 사용법 모음",
  description: "PDF 합치기, 용량 줄이기, JPG 변환처럼 자주 막히는 파일 작업을 단계별로 정리했습니다. 설치나 회원가입 없이 브라우저에서 바로 따라 할 수 있습니다.",
  keywords: ["PDF 사용법", "PDF 합치는 방법", "PDF 용량 줄이기", "PDF JPG 변환", "파일 변환 가이드"],
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  //  가이드 목록 자체를 ItemList로 알려 준다. 글이 늘어날수록 이 목록이 색인 경로가 된다.
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "OneDay Tools 파일 작업 가이드",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.headline,
      url: `${siteConfig.url}/guides/${guide.slug}`,
    })),
  };

  return (
    <>
      <section className="guide-page">
        <div className="shell guide-shell">
          <p className="eyebrow">GUIDES</p>
          <h1>파일 작업 가이드</h1>
          <p className="guide-intro">
            PDF를 합치거나 용량을 줄이는 일은 어렵지 않은데, 막상 하려면 어디서부터 손대야 할지 막힙니다.
            자주 묻는 작업을 단계별로 정리했습니다. 모두 설치나 회원가입 없이 브라우저에서 따라 할 수 있습니다.
          </p>
          <div className="guide-grid">
            {guides.map((guide) => (
              <Link key={guide.slug} className="guide-card" href={`/guides/${guide.slug}`}>
                <h2>{guide.headline}</h2>
                <p>{guide.description}</p>
                <span>가이드 읽기 <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}
