import { Clock3, Construction, Radio } from "lucide-react";
import type { ToolStatus } from "@/types/tool";

const labels = {
  live: "사용 가능",
  building: "개발 중",
  planned: "준비 중",
};

export function ToolStatusBadge({ status }: { status: ToolStatus }) {
  const Icon = status === "live" ? Radio : status === "building" ? Construction : Clock3;
  return <span className={`status-badge status-badge--${status}`}><Icon size={12} /> {labels[status]}</span>;
}
