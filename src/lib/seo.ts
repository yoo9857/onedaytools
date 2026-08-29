import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type ToolMetadata = {
  title: string;
  description: string;
  path: `/${string}`;
  keywords: string[];
};

export function buildToolMetadata({ title, description, path, keywords }: ToolMetadata): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: path,
      images: [{ url: "/logo.png", width: 512, height: 512, alt: `${siteConfig.name} 로고` }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}
