import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { AdScripts } from "@/components/AdScripts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "OneDay Tools | 빠르고 안전한 무료 온라인 도구",
    template: "%s | OneDay Tools",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "OneDay Tools | 빠르고 안전한 무료 온라인 도구",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "OneDay Tools",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    other: process.env.NEXT_PUBLIC_ADSENSE_CLIENT
      ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT }
      : {},
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d4aff",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-oneday-locale") ?? "ko";
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "원데이 툴즈",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "ko-KR",
  };

  return (
    <html lang={locale}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <AdScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
