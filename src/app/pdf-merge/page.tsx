import { Check, Files, Layers3, LockKeyhole } from "lucide-react";
import { PdfMergeTool } from "@/components/tools/PdfMergeTool";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";
import { RelatedTools } from "@/components/tool/RelatedTools";

const description = "여러 PDF 파일을 원하는 순서로 정렬하고 하나의 PDF로 무료 병합하세요. 파일은 서버에 업로드되지 않고 브라우저에서 처리됩니다.";
export const metadata = buildToolMetadata({ title: "PDF 합치기 - 여러 PDF 파일 무료 병합", description, path: "/pdf-merge", keywords: ["PDF 합치기", "PDF 병합", "Merge PDF", "PDF 파일 합치기", "무료 PDF 도구"] });

export default function PdfMergePage() {
  return (
    <>
      <section className="pdf-merge-hero">
        <div className="shell pdf-merge-shell">
          <div className="pdf-merge-heading">
            <p><Files size={16} /> OneDay PDF</p>
            <h1>PDF 합치기</h1>
            <h2>여러 PDF를 원하는 순서대로 하나의 문서로.</h2>
            <div className="pdf-merge-benefits">
              <span><Check size={14} /> 무료 사용</span>
              <span><LockKeyhole size={14} /> 업로드 없음</span>
              <span><Layers3 size={14} /> 순서 변경</span>
            </div>
          </div>
          <PdfMergeTool />
        </div>
      </section>
      {/*  "세 단계면 충분합니다" 블록을 제거했다. 바로 아래 ToolSeoContent가 같은 3단계를 거의
          같은 문구로 한 번 더 렌더해 중복 콘텐츠가 되고 있었다(라이브에서 단계 h3가 두 벌로 확인).
          단계 설명의 단일 출처는 ToolSeoContent의 steps다. */}
      <div className="shell"><ToolSeoContent name="PDF 합치기" path="/pdf-merge" description={description} features={["여러 PDF 파일 동시 선택", "파일 순서 자유롭게 변경", "원본 페이지를 하나의 PDF로 병합", "서버 업로드 없는 로컬 처리"]} steps={[{title:"PDF 추가",description:"하나로 합칠 PDF 파일을 모두 선택합니다."},{title:"순서 정리",description:"파일 카드를 드래그하거나 화살표로 순서를 바꿉니다."},{title:"병합 PDF 저장",description:"브라우저에서 병합한 PDF를 기기에 저장합니다."}]} faqs={[{question:"PDF 파일 순서를 바꿀 수 있나요?",answer:"네. 병합 전에 드래그하거나 화살표 버튼으로 문서 순서를 변경할 수 있습니다."},{question:"몇 개의 PDF를 합칠 수 있나요?",answer:"브라우저 메모리가 허용하는 범위에서 여러 파일을 처리할 수 있습니다. 매우 크거나 많은 파일은 나누어 병합하는 것을 권장합니다."},{question:"문서가 서버로 전송되나요?",answer:"아니요. PDF 병합은 현재 브라우저 안에서 수행됩니다."}]} /></div>
      <div className="shell"><RelatedTools currentSlug="pdf-merge" /></div>
    </>
  );
}
