import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OneDay Tools",
    short_name: "OneDay Tools",
    description: "빠르고 안전한 무료 온라인 도구",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7fc",
    theme_color: "#6d4aff",
    lang: "ko",
  };
}
