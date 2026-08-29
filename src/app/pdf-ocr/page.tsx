import type { Metadata } from "next";
import { ScanText } from "lucide-react";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
export const metadata: Metadata = { title: "PDF OCR | 스캔 PDF 문자 인식", description: "스캔 PDF의 문자 인식 도구를 준비하고 있습니다.", alternates: { canonical: "/pdf-ocr" }, robots: { index: false, follow: true } };
export default function Page() { return <ToolPageFrame title="PDF OCR" description="한글·영문 스캔 문서 인식 엔진을 준비하고 있습니다."><div className="tool-coming-panel"><span><ScanText size={34} /></span><strong>OCR 품질 검증 중</strong><p>검색 가능한 PDF 출력과 페이지 원형 보존을 함께 지원할 예정입니다.</p></div></ToolPageFrame>; }
