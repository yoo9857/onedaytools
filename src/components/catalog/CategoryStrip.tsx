import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, getToolsByCategory } from "@/config/tool-catalog";

export function CategoryStrip() {
  return (
    <div className="category-strip">
      {categories.map((category) => {
        const Icon = category.icon;
        const liveCount = getToolsByCategory(category.id).filter((tool) => tool.status === "live").length;
        return (
          <Link key={category.id} className="category-tile" href={`/category/${category.id}`}>
            <span className={`tool-icon tool-icon--${category.accent}`}><Icon size={21} /></span>
            <span><strong>{category.name}</strong><small>{category.shortDescription}</small></span>
            <span className="category-count">{liveCount ? `${liveCount}개 사용 가능` : "추가 예정"}</span>
            <ArrowRight size={16} />
          </Link>
        );
      })}
    </div>
  );
}
