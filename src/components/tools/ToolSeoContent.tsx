import Link from "next/link";
import { ArrowRight, CircleHelp, LockKeyhole, ShieldCheck, UserRoundCheck } from "lucide-react";
import { getGuidesForTool } from "@/content/guides";
import { siteConfig } from "@/lib/site";

/*  전 도구 공통 사실. 카탈로그의 16개 도구가 모두 localProcessing이고 서버 API 라우트가 하나도
 *  없으므로, 아래 세 문장은 도구별로 검증하지 않아도 항상 참이다. 서버 처리를 도입하는 날
 *  이 블록부터 고쳐야 한다(그래서 도구별 카피가 아니라 공용 컴포넌트에 둔다). */
const PRIVACY_POINTS = [
  { icon: LockKeyhole, title: "파일을 서버에 올리지 않습니다", body: "변환과 편집이 브라우저 안에서 끝납니다. 문서가 기기를 떠나지 않으니 업로드를 기다릴 일도, 남의 서버에 원본이 남을 일도 없습니다." },
  { icon: UserRoundCheck, title: "회원가입도 설치도 없습니다", body: "계정을 만들거나 프로그램을 내려받지 않아도 됩니다. 페이지를 열고 파일을 올려놓으면 바로 쓸 수 있습니다." },
  { icon: ShieldCheck, title: "워터마크를 남기지 않습니다", body: "결과물에 로고나 워터마크를 넣지 않습니다. 내려받은 파일을 그대로 업무에 쓸 수 있습니다." },
];

export type ToolFaq = { question: string; answer: string };
type Step = { title: string; description: string };

export function ToolSeoContent({
  name,
  path,
  description,
  features,
  steps,
  faqs,
}: {
  name: string;
  path: `/${string}`;
  description: string;
  features: string[];
  steps: Step[];
  faqs: ToolFaq[];
}) {
  const url = `${siteConfig.url}${path}`;
  //  도구 ↔ 가이드는 양방향으로 건다. 가이드에서만 도구로 보내면 도구 페이지가 여전히 잎으로 남는다.
  const relatedGuides = getGuidesForTool(path.slice(1));
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "JavaScript를 지원하는 최신 웹 브라우저",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    featureList: features,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "OneDay Tools", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <section className="tool-seo-content" aria-label={`${name} 사용 안내`}>
        <article>
          <h2>{name} 사용 방법</h2>
          <ol className="tool-seo-steps">
            {steps.map((step, index) => <li key={step.title}><span>{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}
          </ol>
        </article>
        <article>
          <h2>{name} 주요 기능</h2>
          <ul className="tool-feature-list">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </article>
        {relatedGuides.length ? (
          <article>
            <h2>더 자세한 사용법</h2>
            <div className="tool-guide-links">
              {relatedGuides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                  {guide.headline} <ArrowRight size={15} />
                </Link>
              ))}
            </div>
          </article>
        ) : null}
        <article>
          <h2>{name}, 안심하고 써도 되나요</h2>
          <div className="tool-privacy-grid">
            {PRIVACY_POINTS.map(({ icon: Icon, title, body }) => (
              <article key={title}>
                <span><Icon size={19} strokeWidth={1.9} /></span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </article>
        <article>
          <h2>자주 묻는 질문</h2>
          <div className="faq-list">
            {faqs.map(({ question, answer }) => <details key={question}><summary><CircleHelp size={18} /> {question}</summary><p>{answer}</p></details>)}
          </div>
        </article>
      </section>
      {[softwareSchema, breadcrumbSchema, faqSchema].map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
