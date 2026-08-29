import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/catalog/ToolCard";
import { categories, getCategory, getToolsByCategory } from "@/config/tool-catalog";

type CategoryPageProps = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) return {};
  return {
    title: `${category.name} - 무료 온라인 도구`,
    description: `${category.shortDescription} 기능을 제공하는 OneDay Tools의 ${category.name} 모음입니다.`,
    alternates: { canonical: `/category/${category.id}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) notFound();
  const categoryTools = getToolsByCategory(category.id);
  const Icon = category.icon;

  return (
    <section className="category-page">
      <div className="shell">
        <div className="category-page-heading">
          <span className={`tool-icon tool-icon--${category.accent}`}><Icon size={27} /></span>
          <p className="section-kicker">TOOL CATEGORY</p>
          <h1>{category.name}</h1>
          <p>{category.shortDescription}에 필요한 도구를 한곳에서 확인하세요.</p>
        </div>
        <div className="tool-grid">
          {categoryTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
        </div>
      </div>
    </section>
  );
}
