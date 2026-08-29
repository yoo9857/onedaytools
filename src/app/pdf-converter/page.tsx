import { ArrowRight, FileImage, FileOutput, ScanText } from "lucide-react";
import Link from "next/link";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import { buildToolMetadata } from "@/lib/seo";

const description = "PDF를 JPG·PNG 이미지로 변환하거나 JPG·PNG 이미지를 PDF로 만드는 무료 온라인 PDF Converter 도구 모음입니다.";
export const metadata = buildToolMetadata({ title: "무료 PDF Converter - PDF·JPG·PNG 온라인 변환", description, path: "/pdf-converter", keywords: ["PDF Converter", "PDF 변환기", "PDF JPG 변환", "PDF 이미지 변환", "Image to PDF"] });
const converters = [
  ["/pdf-to-image", "PDF to Image", "PDF 페이지를 PNG 이미지로", FileImage, "사용 가능"],
  ["/pdf-to-jpg", "PDF to JPG", "PDF 페이지를 JPG 이미지로", FileImage, "사용 가능"],
  ["/image-to-pdf", "Image to PDF", "JPG·PNG 이미지를 PDF로", FileOutput, "사용 가능"],
  ["/jpg-to-pdf", "JPG to PDF", "여러 JPG를 하나의 PDF로", FileOutput, "사용 가능"],
  ["/pdf-ocr", "PDF OCR", "스캔 문서의 글자를 인식", ScanText, "개발 중"],
  ["/pdf-to-pdfa", "PDF to PDF/A", "장기 보관 표준으로 변환", FileOutput, "준비 중"],
] as const;
export default function Page() { return <ToolPageFrame slug="pdf-converter" title="PDF Converter" description="PDF와 이미지 사이에서 필요한 변환 방향을 선택하세요."><div className="converter-link-grid">{converters.map(([href,title,description,Icon,status]) => <Link href={href} key={href}><span><Icon size={24} /></span><div><strong>{title}</strong><small>{description}</small></div><em>{status}</em><ArrowRight size={17} /></Link>)}</div><ToolSeoContent name="무료 PDF Converter" path="/pdf-converter" description={description} features={["PDF 페이지를 JPG 또는 PNG로 변환", "JPG·PNG 이미지를 PDF로 변환", "여러 이미지를 하나의 PDF로 병합", "설치와 회원가입 없이 사용"]} steps={[{title:"변환 방향 선택",description:"PDF를 이미지로 또는 이미지를 PDF로 변환할지 선택합니다."},{title:"파일과 옵션 설정",description:"파일을 고른 뒤 품질, 페이지 또는 용지 옵션을 확인합니다."},{title:"변환 결과 저장",description:"브라우저에서 생성된 결과 파일을 내려받습니다."}]} faqs={[{question:"어떤 PDF 변환을 지원하나요?",answer:"현재 PDF를 JPG·PNG로 변환하고 JPG·PNG 이미지를 PDF로 만드는 기능을 지원합니다."},{question:"PDF OCR과 PDF/A 변환도 가능한가요?",answer:"두 기능은 현재 준비 중이며 아직 실제 변환은 제공하지 않습니다."},{question:"프로그램 설치가 필요한가요?",answer:"아니요. 최신 웹 브라우저에서 바로 사용할 수 있습니다."}]} /></ToolPageFrame>; }
