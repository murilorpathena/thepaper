export interface Article {
  $id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  bulletPoints: string[];
  audioUrl?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  source: string;
  sourceUrl: string;
  viralScore: number;
  headlineAlternatives: string[];
  status: "pending" | "approved" | "rejected" | "published";
  isSponsored: boolean;
  sponsoredLabel?: string;
  seoMetaDescription: string;
  seoKeywords: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  viewCount: number;
  readTimeMinutes: number;
}

export type ArticleStatus = Article["status"];

export interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured";
}