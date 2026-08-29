import type { Metadata } from "next";
import { CheckCircle2, CircleHelp } from "lucide-react";
import { RelatedTools } from "@/components/tool/RelatedTools";
import { ToolPageShell } from "@/components/tool/ToolPageShell";
import { getTool } from "@/config/tool-catalog";
import { JpgToPngConverter } from "@/features/image/jpg-to-png/JpgToPngConverter";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "JPG PNG 변환기 - 여러 장 무료 변환",
  description:
    "JPG와 JPEG 이미지를 PNG로 무료 변환하세요. 최대 10개 파일을 한 번에 처리하며 원본 이미지는 서버에 업로드되지 않습니다.",
  alternates: { canonical: "/jpg-to-png" },
  openGraph: {
    title: "JPG PNG 변환기 - 여러 장 무료 변환",
    description: "여러 JPG 이미지를 브라우저에서 안전하고 빠르게 PNG로 변환합니다.",
    url: "/jpg-to-png",
  },
};

const faq = [
  {
    question: "이미지가 서버에 저장되나요?",
    answer: "아니요. JPG → PNG 변환은 사용 중인 브라우저 안에서 처리되며 이미지 파일을 OneDay Tools 서버로 전송하지 않습니다.",
  },
  {
    question: "한 번에 몇 개까지 변환할 수 있나요?",
    answer: "최대 10개 파일을 한 번에 변환할 수 있으며 파일 하나의 최대 크기는 30MB입니다. 여러 결과는 ZIP 파일로 한꺼번에 내려받을 수 있습니다.",
  },
  {
    question: "JPG를 PNG로 바꾸면 화질이 좋아지나요?",
    answer: "파일 형식만 바뀌기 때문에 이미 손실된 JPG 화질이 복원되지는 않습니다. 다만 변환 이후 PNG로 저장하면 추가적인 JPG 압축 손실은 발생하지 않습니다.",
  },
  {
    question: "변환 후 파일 용량이 커지는 이유는 무엇인가요?",
    answer: "PNG는 무손실 압축 방식을 사용하므로 사진처럼 색상이 많은 이미지는 JPG보다 파일 크기가 커지는 것이 일반적입니다.",
  },
];

export default function JpgToPngPage() {
  const tool = getTool("jpg-to-png");
  if (!tool) return null;

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JPG PNG 변환기",
    url: `${siteConfig.url}/jpg-to-png`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "JavaScript 지원 브라우저",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    featureList: ["최대 10개 일괄 변환", "서버 업로드 없는 브라우저 처리", "ZIP 일괄 다운로드"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <ToolPageShell tool={tool}><JpgToPngConverter /></ToolPageShell>

      <section className="content-section">
        <div className="shell article-shell">
          <article>
            <h2>JPG를 PNG로 변환하는 방법</h2>
            <ol className="step-list">
              <li><span>1</span><div><strong>JPG 파일 선택</strong><p>변환할 JPG 또는 JPEG 이미지를 최대 10개까지 선택하거나 영역에 끌어 놓습니다.</p></div></li>
              <li><span>2</span><div><strong>브라우저에서 자동 변환</strong><p>이미지는 외부 서버로 전송되지 않고 현재 기기에서 차례로 PNG로 변환됩니다.</p></div></li>
              <li><span>3</span><div><strong>개별 또는 ZIP 다운로드</strong><p>각 결과를 따로 저장하거나 여러 파일을 ZIP 하나로 내려받습니다.</p></div></li>
            </ol>
          </article>

          <article className="format-guide">
            <h2>JPG와 PNG, 언제 사용하면 좋을까요?</h2>
            <div className="comparison-grid">
              <div><strong>JPG</strong><p>사진처럼 색상이 많고 작은 파일 용량이 중요할 때 적합합니다.</p><span><CheckCircle2 size={15} /> 사진·웹 게시물</span></div>
              <div><strong>PNG</strong><p>글자와 선이 선명해야 하거나 반복 편집이 필요한 이미지에 적합합니다.</p><span><CheckCircle2 size={15} /> 로고·스크린샷·그래픽</span></div>
            </div>
          </article>

          <article>
            <h2>자주 묻는 질문</h2>
            <div className="faq-list">
              {faq.map((item) => (
                <details key={item.question}>
                  <summary><CircleHelp size={18} /> {item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </article>

          <RelatedTools currentSlug="jpg-to-png" />
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
