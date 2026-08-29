import { PdfCompressTool } from "@/components/tools/PdfCompressTool";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";
const description = "PDF 페이지를 브라우저에서 다시 최적화해 파일 용량을 줄이세요. 압축 강도를 선택하고 결과 용량을 확인할 수 있습니다.";
export const metadata = buildToolMetadata({ title: "PDF 압축 - PDF 용량 줄이기 무료", description, path: "/pdf-compress", keywords: ["PDF 압축", "PDF 용량 줄이기", "Compress PDF", "PDF 파일 크기 줄이기", "무료 PDF 압축"] });
export default function Page() { return <ToolPageFrame slug="pdf-compress" title="PDF 압축" description="용도에 맞는 압축 수준을 선택해 PDF 파일을 더 가볍게 만드세요."><PdfCompressTool /><ToolSeoContent name="PDF 압축기" path="/pdf-compress" description={description} features={["압축 수준 선택", "압축 전후 파일 크기 확인", "모든 페이지 일괄 처리", "서버 업로드 없는 브라우저 처리"]} steps={[{title:"PDF 선택",description:"용량을 줄일 PDF 파일을 선택합니다."},{title:"압축 수준 선택",description:"문서 용도와 화질에 맞는 압축 옵션을 고릅니다."},{title:"결과 확인",description:"압축된 파일 크기를 확인하고 PDF를 내려받습니다."}]} faqs={[{question:"PDF가 항상 더 작아지나요?",answer:"아닙니다. 원본이 이미 최적화된 경우 결과가 비슷하거나 더 커질 수 있습니다. 내려받기 전에 표시되는 결과 용량을 확인하세요."},{question:"압축 후 텍스트를 선택할 수 있나요?",answer:"현재 압축 방식은 페이지를 이미지 기반으로 재구성하므로 원본의 텍스트 선택 기능이 사라질 수 있습니다."},{question:"파일이 업로드되나요?",answer:"아니요. 압축 과정은 사용 중인 브라우저에서 수행됩니다."}]} /></ToolPageFrame>; }
