import { ImageToPdfTool } from "@/components/tools/ImageToPdfTool";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";

const description = "여러 JPG 사진을 정렬·회전하고 A4 등 용지 크기와 여백을 설정해 하나의 PDF로 무료 변환하세요.";
export const metadata = buildToolMetadata({ title: "JPG PDF 변환 - 여러 사진을 하나의 PDF로", description, path: "/jpg-to-pdf", keywords: ["JPG PDF 변환", "JPG to PDF", "사진 PDF 변환", "사진 PDF 합치기", "JPEG PDF 변환"] });
export default function Page() { return <ToolPageFrame slug="jpg-to-pdf" wide title="JPG를 PDF로" description="사진을 정렬·회전하고 원하는 페이지 설정으로 PDF를 만드세요."><ImageToPdfTool jpgOnly /><ToolSeoContent name="JPG PDF 변환기" path="/jpg-to-pdf" description={description} features={["여러 JPG·JPEG 일괄 변환", "사진 순서 변경과 회전", "다양한 용지 크기와 방향", "여백 단계 선택", "브라우저 내 로컬 처리"]} steps={[{title:"JPG 선택",description:"PDF로 만들 사진을 여러 장 선택합니다."},{title:"순서와 설정 조정",description:"사진을 정렬하고 회전한 뒤 용지와 여백을 선택합니다."},{title:"PDF 저장",description:"예상 용량을 확인하고 결과 PDF를 내려받습니다."}]} faqs={[{question:"JPG 여러 장을 PDF 하나로 만들 수 있나요?",answer:"네. 병합 옵션을 켜면 선택한 사진이 한 PDF의 여러 페이지로 저장됩니다."},{question:"사진 순서를 바꿀 수 있나요?",answer:"네. 파일 목록에서 위·아래 버튼으로 페이지 순서를 조정할 수 있습니다."},{question:"사진이 서버에 업로드되나요?",answer:"아니요. PDF 생성은 사용 중인 브라우저에서 처리됩니다."}]} /></ToolPageFrame>; }
