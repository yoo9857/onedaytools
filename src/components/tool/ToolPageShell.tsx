import { ChevronRight, Files, LockKeyhole } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { getCategory } from "@/config/tool-catalog";
import type { ToolDefinition } from "@/types/tool";

export function ToolPageShell({ tool, children }: { tool: ToolDefinition; children: ReactNode }) {
  const category = getCategory(tool.category);
  return (
    <section className="tool-hero">
      <div className="shell tool-page-shell">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/">홈</Link><ChevronRight size={13} />
          <Link href={`/category/${tool.category}`}>{category?.name}</Link><ChevronRight size={13} />
          <span>{tool.shortName}</span>
        </nav>
        <div className="tool-title">
          <span className="eyebrow">{category?.name.toUpperCase()}</span>
          <h1>{tool.name}기</h1>
          <p>{tool.description}</p>
          <div className="tool-trust-chips">
            {tool.localProcessing ? <span><LockKeyhole size={14} /> 서버 업로드 없음</span> : null}
            <span><Files size={14} /> 최대 10개 파일</span>
            {tool.maxFileSizeMb ? <span>파일당 {tool.maxFileSizeMb}MB</span> : null}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
