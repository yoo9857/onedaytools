import { ImageToPdfTool } from "@/components/tools/ImageToPdfTool";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";

const description = "JPG와 PNG 이미지를 원하는 순서로 정렬하고 회전해 하나의 PDF로 변환하세요. A3·A4·Letter 등 용지, 방향과 여백을 선택할 수 있습니다.";
export const metadata = buildToolMetadata({ title: "이미지 PDF 변환 - JPG·PNG를 PDF로 무료 변환", description, path: "/image-to-pdf", keywords: ["이미지 PDF 변환", "Image to PDF", "사진 PDF 만들기", "PNG PDF 변환", "JPG PDF 변환"] });
export default function Page() { return <ToolPageFrame slug="image-to-pdf" wide title="이미지를 PDF로" description="이미지를 정렬하고 회전한 뒤 원하는 용지 설정으로 PDF를 만드세요."><ImageToPdfTool /><ToolSeoContent name="이미지 PDF 변환기" path="/image-to-pdf" description={description} features={["JPG·PNG 이미지 여러 장 지원", "이미지 순서 변경과 90도 회전", "A3·A4·A5·B5·Letter 등 용지 선택", "세로·가로 방향과 4단계 여백", "통합 PDF 또는 개별 PDF ZIP 출력", "생성 전 예상 출력 용량 확인"]} steps={[{title:"이미지 추가",description:"PDF에 넣을 JPG 또는 PNG 이미지를 선택합니다."},{title:"페이지 설정",description:"순서, 회전, 용지 크기, 방향과 여백을 조정합니다."},{title:"PDF 생성",description:"미리보기를 확인하고 하나의 PDF 또는 ZIP으로 저장합니다."}]} faqs={[{question:"여러 이미지를 PDF 하나로 합칠 수 있나요?",answer:"네. ‘모든 이미지를 하나의 PDF로 병합’ 옵션을 켜면 선택한 순서대로 하나의 문서가 생성됩니다."},{question:"사진을 회전할 수 있나요?",answer:"네. 미리보기 또는 파일 목록의 회전 버튼으로 각 이미지를 90도씩 회전할 수 있으며 결과 PDF에도 반영됩니다."},{question:"지원하는 용지 크기는 무엇인가요?",answer:"A3, A4, A5, B5, US Letter, US Legal, Tabloid, Executive와 이미지 맞춤을 지원합니다."}]} /></ToolPageFrame>; }
