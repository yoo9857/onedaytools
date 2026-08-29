import type { ReactNode } from "react";
import { Check, LockKeyhole } from "lucide-react";
import { RelatedTools } from "@/components/tool/RelatedTools";

/**
 *  slug를 넘기면 본문 아래에 "함께 쓰면 좋은 도구"(내부 링크)가 붙는다.
 *
 *  왜 페이지가 아니라 프레임에 두나: 도구끼리 서로 링크가 없으면 크롤러가 홈·카테고리를 거쳐야만
 *  각 도구에 닿는 고립된 잎 페이지가 된다. 페이지마다 따로 붙이면 새 도구를 만들 때 빠뜨리므로,
 *  공용 프레임에서 한 번만 처리해 새 도구도 자동으로 내부 링크를 얻게 한다.
 */
export function ToolPageFrame({ title, description, children, wide = false, slug }: { title: string; description: string; children: ReactNode; wide?: boolean; slug?: string }) {
  return <section className="browser-tool-page"><div className={`shell browser-tool-shell${wide ? " browser-tool-shell--wide" : ""}`}><div className="browser-tool-heading"><p>ONEDAY PDF TOOLS</p><h1>{title}</h1><h2>{description}</h2><div><span><Check size={14} /> 무료</span><span><Check size={14} /> 회원가입 없음</span><span><LockKeyhole size={14} /> 업로드 없음</span></div></div>{children}{slug ? <RelatedTools currentSlug={slug} /> : null}</div></section>;
}
