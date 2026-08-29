import { PdfRasterTool } from "@/components/tools/PdfRasterTool";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";

const description = "PDF의 모든 페이지를 선명한 PNG 이미지로 무료 변환하세요. 여러 결과는 ZIP으로 저장되며 파일은 브라우저에서 처리됩니다.";
export const metadata = buildToolMetadata({ title: "PDF 이미지 변환 - PDF를 PNG로 무료 변환", description, path: "/pdf-to-image", keywords: ["PDF 이미지 변환", "PDF PNG 변환", "PDF to Image", "PDF to PNG", "PDF 페이지 이미지 저장"] });
export default function Page() { return <ToolPageFrame slug="pdf-to-image" title="PDF를 이미지로" description="모든 페이지를 선명한 PNG 이미지로 저장하세요."><PdfRasterTool format="png" /><ToolSeoContent name="PDF PNG 이미지 변환기" path="/pdf-to-image" description={description} features={["모든 PDF 페이지를 PNG로 변환", "여러 결과 ZIP 다운로드", "투명도를 지원하는 PNG 출력", "서버 업로드 없는 로컬 처리"]} steps={[{title:"PDF 선택",description:"이미지로 저장할 PDF를 선택합니다."},{title:"PNG 변환",description:"각 페이지를 선명한 PNG 이미지로 렌더링합니다."},{title:"다운로드",description:"한 장은 PNG로, 여러 장은 ZIP으로 저장합니다."}]} faqs={[{question:"PDF 한 페이지만 변환할 수 있나요?",answer:"현재는 문서의 모든 페이지를 변환합니다. 한 페이지만 필요하면 내려받은 ZIP에서 해당 이미지를 사용하세요."},{question:"JPG와 PNG 중 무엇을 선택해야 하나요?",answer:"문자와 선의 선명도가 중요하면 PNG가 적합하고, 사진 위주이며 작은 용량이 중요하면 PDF JPG 변환기를 권장합니다."},{question:"PDF가 외부 서버에 저장되나요?",answer:"아니요. 변환은 현재 브라우저 안에서 수행됩니다."}]} /></ToolPageFrame>; }
