import Link from "next/link";
import type { ArticleCardProps } from "@/types/article";

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/artigo/${article.slug}`}
        className="group relative col-span-full overflow-hidden rounded-xl border border-paper-200 bg-white transition-all hover:shadow-lg dark:border-paper-800 dark:bg-paper-900"
      >
        {article.coverImage && (
          <div className="aspect-[21/9] overflow-hidden">
            <img
              src={article.coverImage}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-full bg-accent-100 px-3 py-0.5 text-xs font-medium text-accent-800 dark:bg-accent-900 dark:text-accent-200">
              {article.category}
            </span>
            {article.isSponsored && (
              <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                Patrocinado
              </span>
            )}
            <span className="text-xs text-paper-400">{article.readTimeMinutes} min de leitura</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-paper-900 group-hover:text-accent-600 dark:text-paper-50 sm:text-3xl">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-paper-500 dark:text-paper-400">
            {article.summary}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/artigo/${article.slug}`}
        className="group flex items-start gap-4 border-b border-paper-100 py-4 last:border-0 dark:border-paper-800"
      >
        {article.coverImage && (
          <div className="aspect-square w-20 shrink-0 overflow-hidden rounded-lg">
            <img src={article.coverImage} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-paper-400">
            <span>{article.category}</span>
            <span>&middot;</span>
            <span>{article.readTimeMinutes} min</span>
          </div>
          <h3 className="mt-1 font-semibold leading-snug text-paper-900 group-hover:text-accent-600 dark:text-paper-50">
            {article.title}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/artigo/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-paper-200 bg-white transition-all hover:shadow-md dark:border-paper-800 dark:bg-paper-900"
    >
      {article.coverImage && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.coverImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-accent-100 px-2.5 py-0.5 text-xs font-medium text-accent-800 dark:bg-accent-900 dark:text-accent-200">
            {article.category}
          </span>
          {article.isSponsored && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
              Publi
            </span>
          )}
        </div>
        <h3 className="font-bold leading-snug text-paper-900 group-hover:text-accent-600 dark:text-paper-50">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-paper-500 dark:text-paper-400">
          {article.summary}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-3 text-xs text-paper-400">
          <span>{article.readTimeMinutes} min de leitura</span>
          {article.audioUrl && <span>&middot; Com áudio</span>}
        </div>
      </div>
    </Link>
  );
}