import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-page">
      <div>
        <span>404</span>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>주소가 변경되었거나 아직 준비 중인 도구입니다.</p>
        <Link className="primary-button" href="/">도구 홈으로 이동</Link>
      </div>
    </section>
  );
}
