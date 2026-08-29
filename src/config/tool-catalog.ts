import {
  Calculator,
  FileArchive,
  FileImage,
  FileOutput,
  Film,
  ImageDown,
  Maximize2,
  Music2,
  Scissors,
} from "lucide-react";
import type { ToolCategory, ToolCategoryId, ToolDefinition } from "@/types/tool";

export const categories: ToolCategory[] = [
  {
    id: "image",
    name: "이미지 도구",
    shortDescription: "변환·압축·크기 조절",
    icon: FileImage,
    accent: "violet",
  },
  {
    id: "media",
    name: "오디오·영상",
    shortDescription: "음원·영상 변환과 편집",
    icon: Film,
    accent: "rose",
  },
  {
    id: "document",
    name: "문서·PDF",
    shortDescription: "PDF 변환·병합·분할",
    icon: FileArchive,
    accent: "orange",
  },
  {
    id: "finance",
    name: "금융 계산기",
    shortDescription: "수익률·평균단가 계산",
    icon: Calculator,
    accent: "mint",
  },
];

export const tools: ToolDefinition[] = [
  {
    slug: "jpg-to-png",
    name: "JPG → PNG 변환",
    shortName: "JPG PNG 변환",
    description: "여러 JPG 이미지를 선명한 PNG 파일로 한 번에 변환합니다.",
    category: "image",
    status: "live",
    icon: FileOutput,
    accent: "violet",
    keywords: ["jpg", "jpeg", "png", "이미지 변환", "사진 변환"],
    localProcessing: true,
    maxFileSizeMb: 30,
  },
  {
    slug: "image-compress",
    name: "이미지 용량 줄이기",
    shortName: "이미지 압축",
    description: "화질을 조절해 JPG·PNG·WebP 파일 크기를 줄입니다.",
    category: "image",
    status: "building",
    icon: ImageDown,
    accent: "blue",
    keywords: ["이미지 압축", "사진 용량", "100kb", "200kb"],
    localProcessing: true,
  },
  {
    slug: "image-resize",
    name: "이미지 크기 변경",
    shortName: "이미지 리사이즈",
    description: "사진의 가로·세로 픽셀과 비율을 간편하게 바꿉니다.",
    category: "image",
    status: "planned",
    icon: Maximize2,
    accent: "mint",
    keywords: ["사진 크기", "해상도", "픽셀", "리사이즈"],
    localProcessing: true,
  },
  {
    slug: "webp-to-jpg",
    name: "WebP → JPG 변환",
    shortName: "WebP JPG 변환",
    description: "WebP 이미지를 호환성이 높은 JPG 파일로 변환합니다.",
    category: "image",
    status: "planned",
    icon: FileImage,
    accent: "orange",
    keywords: ["webp", "jpg", "이미지 포맷"],
    localProcessing: true,
  },
  {
    slug: "mp3-to-mp4",
    name: "MP3 → MP4 변환",
    shortName: "MP3 MP4 변환",
    description: "음원과 커버 이미지를 영상 파일로 만들어 공유합니다.",
    category: "media",
    status: "planned",
    icon: Music2,
    accent: "rose",
    keywords: ["mp3", "mp4", "음원 영상", "오디오 변환"],
    localProcessing: true,
  },
  {
    slug: "audio-trim",
    name: "오디오 자르기",
    shortName: "MP3 자르기",
    description: "오디오의 필요한 구간만 선택해 새 파일로 저장합니다.",
    category: "media",
    status: "planned",
    icon: Scissors,
    accent: "blue",
    keywords: ["mp3 자르기", "오디오 편집", "음원 자르기"],
    localProcessing: true,
  },
  {
    slug: "pdf-merge",
    name: "PDF 합치기",
    shortName: "PDF 병합",
    description: "여러 PDF 문서를 원하는 순서로 하나로 합칩니다.",
    category: "document",
    status: "live",
    icon: FileArchive,
    accent: "orange",
    keywords: ["pdf", "pdf 합치기", "문서 병합"],
    localProcessing: true,
  },
  {
    slug: "pdf-compress",
    name: "PDF 압축",
    shortName: "PDF 압축",
    description: "PDF 페이지를 최적화해 파일 용량을 줄입니다.",
    category: "document",
    status: "live",
    icon: ImageDown,
    accent: "orange",
    keywords: ["compress pdf", "pdf 압축", "pdf 용량 줄이기"],
    localProcessing: true,
  },
  {
    slug: "pdf-converter",
    name: "PDF 변환기",
    shortName: "PDF Converter",
    description: "PDF와 이미지 사이에서 필요한 변환 도구를 선택합니다.",
    category: "document",
    status: "live",
    icon: FileOutput,
    accent: "violet",
    keywords: ["pdf converter", "pdf 변환", "파일 변환"],
    localProcessing: true,
  },
  {
    slug: "pdf-ocr",
    name: "PDF OCR",
    shortName: "PDF OCR",
    description: "스캔 PDF에서 검색 가능한 텍스트를 인식합니다.",
    category: "document",
    status: "building",
    icon: FileArchive,
    accent: "blue",
    keywords: ["pdf ocr", "문자 인식", "스캔 pdf"],
    localProcessing: true,
  },
  {
    slug: "pdf-to-pdfa",
    name: "PDF → PDF/A",
    shortName: "PDF to PDF/A",
    description: "장기 보관용 PDF/A 형식으로 변환합니다.",
    category: "document",
    status: "planned",
    icon: FileArchive,
    accent: "mint",
    keywords: ["pdfa", "pdf a 변환", "장기 보관 pdf"],
    localProcessing: true,
  },
  {
    slug: "pdf-to-image",
    name: "PDF → 이미지",
    shortName: "PDF to Image",
    description: "PDF의 모든 페이지를 고화질 PNG 이미지로 변환합니다.",
    category: "document",
    status: "live",
    icon: FileImage,
    accent: "blue",
    keywords: ["pdf image", "pdf png", "pdf 이미지 변환"],
    localProcessing: true,
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF → JPG",
    shortName: "PDF to JPG",
    description: "PDF 페이지를 공유하기 쉬운 JPG 이미지로 변환합니다.",
    category: "document",
    status: "live",
    icon: FileImage,
    accent: "orange",
    keywords: ["pdf jpg", "pdf jpeg", "pdf 사진 변환"],
    localProcessing: true,
  },
  {
    slug: "image-to-pdf",
    name: "이미지 → PDF",
    shortName: "Image to PDF",
    description: "JPG·PNG 이미지를 한 개의 PDF 문서로 만듭니다.",
    category: "document",
    status: "live",
    icon: FileOutput,
    accent: "violet",
    keywords: ["image pdf", "이미지 pdf 변환", "png pdf"],
    localProcessing: true,
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG → PDF",
    shortName: "JPG to PDF",
    description: "여러 JPG 사진을 순서대로 하나의 PDF로 변환합니다.",
    category: "document",
    status: "live",
    icon: FileOutput,
    accent: "rose",
    keywords: ["jpg pdf", "jpeg pdf", "사진 pdf 변환"],
    localProcessing: true,
  },
  {
    slug: "stock-average-calculator",
    name: "주식 평균단가 계산기",
    shortName: "물타기 계산기",
    description: "추가 매수 후 평균단가와 필요 금액을 빠르게 계산합니다.",
    category: "finance",
    status: "planned",
    icon: Calculator,
    accent: "mint",
    keywords: ["주식", "평균단가", "물타기", "수익률"],
    localProcessing: true,
  },
];

export function getCategory(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getToolsByCategory(categoryId: ToolCategoryId) {
  return tools.filter((tool) => tool.category === categoryId);
}

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

/**
 *  "함께 쓰면 좋은 도구" — 같은 카테고리 우선, 모자라면 다른 카테고리의 live 도구로 채운다.
 *
 *  ⚠️ live만 고르는 게 핵심이다. ToolCard는 준비 중인 도구를 링크가 아닌 카드로 렌더하므로
 *  (라우트가 없어 404가 되는 걸 막는 장치), 카테고리만 보고 뽑으면 관련 카드가 전부 죽은 카드가 되어
 *  그 페이지의 내부 링크가 0이 된다. 실측: jpg-to-png는 같은 image 카테고리의 나머지 셋이 모두
 *  building/planned라 관련 도구 영역에서 나가는 링크가 하나도 없었다.
 */
export function getRelatedTools(slug: string, limit = 3) {
  const current = getTool(slug);
  if (!current) return [];
  const live = tools.filter((tool) => tool.slug !== slug && tool.status === "live");
  const sameCategory = live.filter((tool) => tool.category === current.category);
  const others = live.filter((tool) => tool.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
