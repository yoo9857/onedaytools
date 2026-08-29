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
    status: "planned",
    icon: FileArchive,
    accent: "orange",
    keywords: ["pdf", "pdf 합치기", "문서 병합"],
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

export function getRelatedTools(slug: string, limit = 3) {
  const current = getTool(slug);
  if (!current) return [];
  return tools
    .filter((tool) => tool.slug !== slug && tool.category === current.category)
    .slice(0, limit);
}
