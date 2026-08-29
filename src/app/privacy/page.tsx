import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "OneDay Tools의 개인정보 및 파일 처리 방식을 안내합니다.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="legal-page">
      <div className="shell prose-shell">
        <p className="section-kicker">PRIVACY</p>
        <h1>개인정보처리방침</h1>
        <p className="policy-date">시행일: 2026년 8월 29일</p>
        <p className="lead">OneDay Tools는 이용자의 개인정보와 파일을 안전하게 다루는 것을 중요하게 생각합니다.</p>

        <h2>1. 이미지 파일 처리</h2>
        <p>JPG → PNG 변환 기능은 이용자의 브라우저 내부에서 실행됩니다. 선택한 이미지 파일과 변환된 결과물은 OneDay Tools 서버로 전송되거나 저장되지 않습니다.</p>

        <h2>2. 자동으로 수집될 수 있는 정보</h2>
        <p>서비스 안정성 및 이용 통계 확인을 위해 접속 시간, 브라우저 종류, 기기 유형, 방문 페이지 등의 비식별 정보가 수집될 수 있습니다.</p>

        <h2>3. 쿠키 및 외부 서비스</h2>
        <p>서비스는 Google Analytics와 Google AdSense를 사용할 수 있습니다. 해당 서비스는 이용 통계 측정 및 맞춤형 광고 제공을 위해 쿠키나 유사 기술을 사용할 수 있습니다. 실제 운영 환경에서 관련 환경 변수가 설정된 경우에만 스크립트가 로드됩니다.</p>

        <h2>4. 개인정보의 제3자 제공</h2>
        <p>법령에 따른 요청이 있는 경우를 제외하고 이용자의 개인정보를 임의로 판매하거나 제3자에게 제공하지 않습니다.</p>

        <h2>5. 문의</h2>
        <p>개인정보 처리와 관련된 문의는 <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>으로 연락해 주세요.</p>
      </div>
    </section>
  );
}
