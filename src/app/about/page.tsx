import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "서비스 소개",
  description: "OneDay Tools가 만드는 빠르고 안전한 온라인 파일 도구를 소개합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="legal-page">
      <div className="shell prose-shell">
        <p className="section-kicker">ABOUT</p>
        <h1>일상적인 파일 작업을<br />더 간단하게 만듭니다.</h1>
        <p className="lead">OneDay Tools는 설치나 회원가입 없이 사용할 수 있는 가벼운 온라인 도구 모음입니다.</p>
        <h2>우리가 지키는 원칙</h2>
        <ul>
          <li>누구나 설명 없이 사용할 수 있는 단순한 화면을 만듭니다.</li>
          <li>가능한 작업은 서버 업로드 없이 브라우저 안에서 처리합니다.</li>
          <li>도구의 제한과 파일 처리 방식을 숨기지 않고 명확하게 알립니다.</li>
          <li>기능 수보다 각 도구의 안정성과 완성도를 우선합니다.</li>
        </ul>
        <h2>운영 정보</h2>
        <p>OneDay Tools는 OneDayTrading에서 운영합니다. 문의는 <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>으로 보내주세요.</p>
      </div>
    </section>
  );
}
