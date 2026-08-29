import { PdfRasterTool } from "@/components/tools/PdfRasterTool";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";

const description = "PDF의 각 페이지를 고화질 JPG 이미지로 무료 변환하고 여러 페이지는 ZIP으로 한 번에 저장하세요. 파일은 서버에 업로드되지 않습니다.";
export const metadata = buildToolMetadata({ title: "PDF JPG 변환기 - PDF를 JPG 이미지로 무료 변환", description, path: "/pdf-to-jpg", keywords: ["PDF JPG 변환", "PDF to JPG", "PDF 이미지 변환", "PDF 사진 변환", "무료 PDF 변환기"] });

export default function Page() {
  return <ToolPageFrame slug="pdf-to-jpg" title="PDF를 JPG로" description="PDF의 모든 페이지를 공유하기 쉬운 JPG 이미지로 변환하세요.">
    <PdfRasterTool format="jpg" />
    <ToolSeoContent name="PDF JPG 변환기" path="/pdf-to-jpg" description={description}
      features={["PDF의 모든 페이지를 JPG로 변환", "여러 페이지 결과를 ZIP으로 일괄 다운로드", "서버 업로드 없이 브라우저에서 로컬 처리", "흰색 배경의 고화질 JPG 출력"]}
      steps={[{ title: "PDF 선택", description: "JPG로 바꿀 PDF 파일을 선택합니다." }, { title: "페이지 변환", description: "변환 버튼을 누르면 각 PDF 페이지가 JPG로 렌더링됩니다." }, { title: "결과 저장", description: "한 페이지는 JPG로, 여러 페이지는 ZIP 파일로 저장합니다." }]}
      faqs={[{ question: "PDF의 모든 페이지가 JPG로 변환되나요?", answer: "네. 선택한 PDF의 각 페이지를 순서대로 별도의 JPG 이미지로 변환합니다." }, { question: "PDF에 포함된 원본 이미지만 추출할 수 있나요?", answer: "현재 버전은 PDF 페이지 전체를 JPG로 변환합니다. PDF 내부에 포함된 원본 이미지만 추출하는 기능은 아직 제공하지 않습니다." }, { question: "파일이 서버로 업로드되나요?", answer: "아니요. PDF 렌더링과 JPG 인코딩은 사용 중인 브라우저에서 처리됩니다." }]}
    />
  </ToolPageFrame>;
}
