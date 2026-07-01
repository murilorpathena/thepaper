import { ArticleCard } from "@/components/article/article-card";
import type { Metadata } from "next";

const MOCK_CATEGORY_ARTICLES = Array.from({ length: 6 }, (_, i) => ({
  $id: String(i + 10),
  title: `Notícia sobre ${i + 1} — Categoria`,
  slug: `noticia-${i + 1}`,
  summary: "Resumo da notícia para demonstração da página de categoria.",
  content: "",
  bulletPoints: [],
  category: "Tecnologia",
  tags: [],
  source: "ThePaper",
  sourceUrl: "#",
  viralScore: 75 + i,
  headlineAlternatives: [],
  status: "published" as const,
  isSponsored: false,
  seoMetaDescription: "",
  seoKeywords: [],
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  viewCount: 500,
  readTimeMinutes: 4,
}));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-paper-900 dark:text-paper-50">
        {categoryName}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_CATEGORY_ARTICLES.map((article) => (
          <ArticleCard key={article.$id} article={article} />
        ))}
      </div>
    </div>
  );
}