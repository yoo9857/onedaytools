import type { Metadata } from "next";
import { Archive } from "lucide-react";
import { ToolPageFrame } from "@/components/tools/ToolPageFrame";
export const metadata: Metadata = { title: "PDF to PDF/A | 보관용 PDF 변환", description: "PDF/A 표준 변환 도구를 준비하고 있습니다.", alternates: { canonical: "/pdf-to-pdfa" }, robots: { index: false, follow: true } };
export default function Page() { return <ToolPageFrame title="PDF to PDF/A" description="장기 보관 표준을 정확히 준수하는 변환 엔진을 준비하고 있습니다."><div className="tool-coming-panel"><span><Archive size={34} /></span><strong>PDF/A 적합성 검증 준비 중</strong><p>글꼴 포함, 색상 프로필과 메타데이터 요건을 검증한 뒤 제공합니다.</p></div></ToolPageFrame>; }
