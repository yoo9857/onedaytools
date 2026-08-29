import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleHelp } from "lucide-react";
import { RelatedTools } from "@/components/tool/RelatedTools";
import { getGuide, guides } from "@/content/guides";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const path = `/guides/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: siteConfig.name,
      title: guide.title,
      description: guide.description,
      publishedTime: guide.published,
      modifiedTime: guide.updated,
      images: [{ url: "/logo.png", width: 512, height: 512, alt: siteConfig.name }],
    },
    twitter: { card: "summary", title: guide.title, description: guide.description },
  };
}

/** 사람이 읽는 날짜. 서버가 어떤 시간대에 있든 한국 기준으로 찍는다. */
function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00+09:00`).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = `${siteConfig.url}/guides/${guide.slug}`;
  //  Article에 발행일·수정일을 담는다. 검색 결과에 날짜가 함께 노출되는 근거가 되는 값이라
  //  실제로 글을 고칠 때만 updated를 올린다(가짜 신선도 금지).
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.headline,
    description: guide.description,
    url,
    mainEntityOfPage: url,
    inLanguage: "ko-KR",
    datePublished: guide.published,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "OneDay Tools", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "가이드", item: `${siteConfig.url}/guides` },
      { "@type": "ListItem", position: 3, name: guide.headline, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <article className="guide-page">
        <div className="shell guide-shell">
          <nav className="guide-crumb" aria-label="현재 위치">
            <Link href="/">홈</Link> <span>/</span> <Link href="/guides">가이드</Link>
          </nav>
          <h1>{guide.headline}</h1>
          <p className="guide-meta">
            <time dateTime={guide.published}>{formatDate(guide.published)}</time>
            {guide.updated !== guide.published ? <span> · {formatDate(guide.updated)} 수정</span> : null}
          </p>
          <p className="guide-intro">{guide.intro}</p>

          {guide.sections.map((section) => (
            <section key={section.heading} className="guide-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list ? <ol className="guide-list">{section.list.map((item) => <li key={item}>{item}</li>)}</ol> : null}
            </section>
          ))}

          <aside className="guide-cta">
            <div>
              <p>글을 읽는 김에 바로 처리하세요</p>
              <h2>{guide.toolName}</h2>
              <span>회원가입 없이, 파일을 올리지 않고 브라우저에서 끝납니다.</span>
            </div>
            <Link className="primary-button primary-button--large" href={`/${guide.toolSlug}`}>
              {guide.toolCta} <ArrowRight size={18} />
            </Link>
          </aside>

          <section className="guide-section">
            <h2>자주 묻는 질문</h2>
            <div className="faq-list">
              {guide.faqs.map(({ question, answer }) => (
                <details key={question}><summary><CircleHelp size={18} /> {question}</summary><p>{answer}</p></details>
              ))}
            </div>
          </section>

          <RelatedTools currentSlug={guide.toolSlug} />
        </div>
      </article>
      {[articleSchema, breadcrumbSchema, faqSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
