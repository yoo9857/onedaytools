import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OneDay Tools",
    short_name: "OneDay Tools",
    description: "이미지·PDF·오디오 파일 작업을 한곳에서 처리하는 All in One 온라인 도구",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7fc",
    theme_color: "#6d4aff",
    icons: [
      { src: "/favicons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/favicons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    lang: "ko",
  };
}
