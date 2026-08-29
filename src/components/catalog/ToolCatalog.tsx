"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ToolCard } from "@/components/catalog/ToolCard";
import { categories, tools } from "@/config/tool-catalog";
import type { ToolCategoryId } from "@/types/tool";

type CategoryFilter = "all" | ToolCategoryId;

export function ToolCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatches = category === "all" || tool.category === category;
      const queryMatches = !normalizedQuery || [tool.name, tool.description, ...tool.keywords]
        .join(" ")
        .toLocaleLowerCase("ko-KR")
        .includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, normalizedQuery]);

  return (
    <div className="catalog">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={18} />
          <span className="visually-hidden">도구 검색</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="필요한 도구를 검색하세요. 예: JPG, MP3, PDF"
          />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="검색어 지우기"><X size={16} /></button> : null}
        </label>
        <div className="category-filters" role="group" aria-label="도구 카테고리 필터">
          <button className={category === "all" ? "is-active" : ""} type="button" onClick={() => setCategory("all")}>전체</button>
          {categories.map((item) => (
            <button
              key={item.id}
              className={category === item.id ? "is-active" : ""}
              type="button"
              onClick={() => setCategory(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {filteredTools.length ? (
        <div className="tool-grid">
          {filteredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      ) : (
        <div className="catalog-empty">
          <Search size={24} />
          <strong>일치하는 도구가 없습니다.</strong>
          <p>다른 검색어를 입력하거나 전체 카테고리를 확인해 보세요.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>검색 초기화</button>
        </div>
      )}
    </div>
  );
}
