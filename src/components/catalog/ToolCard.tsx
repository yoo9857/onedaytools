import { ArrowUpRight, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { ToolStatusBadge } from "@/components/catalog/ToolStatusBadge";
import type { ToolDefinition } from "@/types/tool";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon;
  const content = (
    <>
      <div className="tool-card-topline">
        <span className={`tool-icon tool-icon--${tool.accent}`}>
          <Icon size={24} strokeWidth={1.9} />
        </span>
        <ToolStatusBadge status={tool.status} />
      </div>
      <span className="tool-card-copy">
        <strong>{tool.name}</strong>
        <span>{tool.description}</span>
      </span>
      <span className="tool-card-meta">
        {tool.localProcessing ? <><LockKeyhole size={13} /> 브라우저 처리</> : "보안 서버 처리"}
      </span>
      {tool.status === "live" ? <ArrowUpRight className="tool-arrow" size={19} /> : null}
    </>
  );

  return tool.status === "live" ? (
    <Link className="tool-card" href={`/${tool.slug}`}>{content}</Link>
  ) : (
    <article className="tool-card tool-card--disabled" aria-label={`${tool.name}, ${tool.status === "building" ? "개발 중" : "준비 중"}`}>
      {content}
    </article>
  );
}
