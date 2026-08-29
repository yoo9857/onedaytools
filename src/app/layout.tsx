import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { AdScripts } from "@/components/AdScripts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site";
import { homeCopy } from "@/lib/i18n-content";
import { isLocale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "OneDay Tools | 빠르고 안전한 무료 온라인 도구",
    template: "%s | OneDay Tools",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["All in One Tool", "online file tools", "image converter", "JPG to PNG", "PDF tools"],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "OneDay Tools | All in One 온라인 파일 도구",
    description: "이미지·PDF·오디오 파일 작업을 한곳에서 처리하는 OneDay Tools All in One 온라인 도구",
    images: [{ url: "/marketing/main_first.png", width: 1448, height: 1086, alt: "OneDay Tools All in One 파일 도구" }],
  },
  twitter: {
    card: "summary",
    title: "OneDay Tools",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    other: {
      // 네이버 서치어드바이저 소유확인. 공개 메타로 나가는 값이라 비밀이 아니고, 확인 후 지우면
      // 소유권이 풀리므로 계속 둔다. Daum은 메타가 아니라 robots.txt 인증키 방식이라 별도(app/robots.txt).
      "naver-site-verification": "1b5a4fd995f3be936e24de0324f7a02b02e63a6c",
      ...(process.env.NEXT_PUBLIC_ADSENSE_CLIENT
        ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT }
        : {}),
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d4aff",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-oneday-locale") ?? "ko";
  //  ⚠️ 예전엔 inLanguage·description·alternateName이 한국어로 고정이라, /en·/de 페이지의
  //  WebSite 스키마가 "이 페이지는 한국어"라고 선언하고 있었다. 로케일에 맞춰 바꾼다.
  const isKo = locale === "ko";
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    ...(isKo ? { alternateName: "원데이 툴즈" } : {}),
    url: isKo ? siteConfig.url : `${siteConfig.url}/${locale}`,
    description: isKo ? siteConfig.description : homeCopy[isLocale(locale) ? locale : "ko"].description,
    inLanguage: isKo ? "ko-KR" : locale,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.mainSiteUrl,
      logo: `${siteConfig.url}/logo.png`,
    },
  };

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <AdScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
