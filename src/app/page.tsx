import { ArrowRight, Check, LockKeyhole, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { CategoryStrip } from "@/components/catalog/CategoryStrip";
import { ToolCatalog } from "@/components/catalog/ToolCatalog";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="shell hero-inner">
          <div className="eyebrow"><Sparkles size={14} /> 매일 쓰는 도구를 한곳에</div>
          <h1>파일 작업은 더 가볍게,<br /><span>결과는 더 빠르게.</span></h1>
          <p className="hero-description">
            이미지부터 오디오·영상, PDF, 금융 계산까지.<br className="desktop-break" /> 설치 없이 필요한 작업을 브라우저에서 바로 처리하세요.
          </p>
          <div className="hero-actions">
            <Link className="primary-button primary-button--large" href="/jpg-to-png">
              첫 번째 도구 사용하기 <ArrowRight size={18} />
            </Link>
            <a className="text-link" href="#tools">모든 도구 보기</a>
          </div>
          <ul className="trust-list" aria-label="서비스 특징">
            <li><Check size={15} /> 무료 사용</li>
            <li><Check size={15} /> 파일 업로드 없음</li>
            <li><Check size={15} /> 모바일 지원</li>
          </ul>
        </div>
      </section>

      <section className="category-section" aria-label="도구 카테고리">
        <div className="shell"><CategoryStrip /></div>
      </section>

      <section className="tools-section" id="tools">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-kicker">POPULAR TOOLS</p>
              <h2>도구 찾아보기</h2>
            </div>
            <p>검색하거나 카테고리를 선택하세요.</p>
          </div>
          <ToolCatalog />
        </div>
      </section>

      <section className="benefits-section">
        <div className="shell benefits-grid">
          <article className="benefit-card">
            <span><Zap size={22} /></span>
            <h3>빠른 브라우저 처리</h3>
            <p>불필요한 대기 없이 기기에서 바로 파일을 처리합니다.</p>
          </article>
          <article className="benefit-card">
            <span><LockKeyhole size={22} /></span>
            <h3>안심할 수 있는 개인정보</h3>
            <p>지원되는 도구는 파일을 서버에 올리지 않고 브라우저 내부에서 작동합니다.</p>
          </article>
          <article className="benefit-card">
            <span><Sparkles size={22} /></span>
            <h3>단순하고 깨끗한 화면</h3>
            <p>필요한 기능만 남겨 누구나 망설임 없이 사용할 수 있습니다.</p>
          </article>
        </div>
      </section>
    </>
  );
}
