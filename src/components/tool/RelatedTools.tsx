import { ToolCard } from "@/components/catalog/ToolCard";
import { getRelatedTools } from "@/config/tool-catalog";

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug);
  if (!related.length) return null;
  return (
    <section className="related-tools">
      <div className="section-heading">
        <div><p className="section-kicker">KEEP WORKING</p><h2>함께 쓰면 좋은 도구</h2></div>
      </div>
      <div className="tool-grid">{related.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
    </section>
  );
}
