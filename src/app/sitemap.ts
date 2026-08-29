import type { MetadataRoute } from "next";
import { categories } from "@/config/tool-catalog";
import { guides } from "@/content/guides";
import { locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/jpg-to-png`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/pdf-merge`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...["pdf-compress", "pdf-converter", "pdf-to-image", "pdf-to-jpg", "image-to-pdf", "jpg-to-pdf"].map((slug) => ({
      url: `${siteConfig.url}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteConfig.url}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    //  가이드는 목록이 아니라 컨텐츠 모듈에서 뽑는다 — 글을 추가하면 사이트맵이 자동으로 따라온다.
    //  lastModified는 글의 updated를 쓴다(배포 시각으로 덮으면 신선도 신호가 거짓이 된다).
    ...guides.map((guide) => ({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      lastModified: new Date(`${guide.updated}T00:00:00+09:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${siteConfig.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${siteConfig.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  return [
    ...staticPages,
    ...locales.filter((locale) => locale !== "ko").flatMap((locale) => [
      { url: `${siteConfig.url}/${locale}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
      { url: `${siteConfig.url}/${locale}/jpg-to-png`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    ]),
    ...categories.map((category) => ({
      url: `${siteConfig.url}/category/${category.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
